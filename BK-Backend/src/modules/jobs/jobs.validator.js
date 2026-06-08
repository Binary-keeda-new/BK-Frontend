import { body, param } from 'express-validator';

const VALID_TYPES = ['private', 'government'];
const VALID_STAGE_STATUSES = ['pending', 'released'];

// ── Reusable stage array rule ──────────────────────────────────────────────
const stagesRule = body('stages')
  .optional()
  .custom((stages, { req }) => {
    if (stages !== undefined && stages !== null && !Array.isArray(stages)) {
      throw new Error('stages must be an array');
    }
    // If the job type is private, it shouldn't have valid stages
    // We allow undefined, null, or empty array.
    if (req.body.type === 'private') {
      if (Array.isArray(stages) && stages.length > 0) {
        throw new Error('Private jobs must not include stages');
      }
    }
    return true;
  });

const stageNameRule = body('stages.*.name')
  .notEmpty()
  .withMessage('Each stage must have a name')
  .isString()
  .trim();

const stageStatusRule = body('stages.*.status')
  .optional()
  .isIn(VALID_STAGE_STATUSES)
  .withMessage(`Stage status must be one of: ${VALID_STAGE_STATUSES.join(', ')}`);

const stageLinkRule = body('stages.*.link')
  .optional({ nullable: true, checkFalsy: true })
  .isURL()
  .withMessage('Stage link must be a valid URL');

// ── Create job ─────────────────────────────────────────────────────────────
const createJobRules = [
  body('title').notEmpty().withMessage('title is required').isString().trim(),
  body('company').notEmpty().withMessage('company is required').isString().trim(),
  body('type')
    .notEmpty()
    .withMessage('type is required')
    .isIn(VALID_TYPES)
    .withMessage(`type must be one of: ${VALID_TYPES.join(', ')}`),
  body('description').notEmpty().withMessage('description is required').isString().trim(),
  body('applyLink').notEmpty().withMessage('applyLink is required').isURL().withMessage('applyLink must be a valid URL'),
  
  body('location').optional({ checkFalsy: true }).isString().trim(),
  body('salary').optional({ checkFalsy: true }).isString().trim(),
  body('department').optional({ checkFalsy: true }).isString().trim(),
  body('lastDate').optional({ checkFalsy: true }).isISO8601().toDate(),
  body('tags').optional({ checkFalsy: true }).isArray(),

  body('stages').custom((stages, { req }) => {
    // Government jobs can be created without stages since frontend doesn't send them yet.
    return true;
  }),

  stagesRule,
  stageNameRule,
  stageStatusRule,
  stageLinkRule,
];

// ── Update job ─────────────────────────────────────────────────────────────
const updateJobRules = [
  param('id').isMongoId().withMessage('Invalid job id'),
  body('title').optional().isString().trim().notEmpty(),
  body('company').optional().isString().trim().notEmpty(),
  body('type')
    .optional()
    .isIn(VALID_TYPES)
    .withMessage(`type must be one of: ${VALID_TYPES.join(', ')}`),
  body('description').optional().isString().trim().notEmpty(),
  body('applyLink').optional().isURL().withMessage('applyLink must be a valid URL'),
  
  body('location').optional({ checkFalsy: true }).isString().trim(),
  body('salary').optional({ checkFalsy: true }).isString().trim(),
  body('department').optional({ checkFalsy: true }).isString().trim(),
  body('lastDate').optional({ checkFalsy: true }).isISO8601().toDate(),
  body('tags').optional({ checkFalsy: true }).isArray(),

  stagesRule,
  stageNameRule,
  stageStatusRule,
  stageLinkRule,
];

// ── Param-only ─────────────────────────────────────────────────────────────
const idParamRule = [
  param('id').isMongoId().withMessage('Invalid job id'),
];

// ✅ FIXED EXPORT (ES MODULE)
export { createJobRules, updateJobRules, idParamRule };