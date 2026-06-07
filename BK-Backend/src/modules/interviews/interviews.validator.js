import { body, param } from "express-validator";

const VALID_LEVELS = ["Fresher", "Experienced"];
const VALID_RESULTS = ["Selected", "Rejected", "Pending"];

// ── Create interview ───────────────────────────────────────────────────────

const createInterviewRules = [
  body("role").notEmpty().withMessage("role is required").isString().trim(),
  body("company").notEmpty().withMessage("company is required").isString().trim(),
  body("level")
    .notEmpty()
    .withMessage("level is required")
    .isIn(VALID_LEVELS)
    .withMessage(`level must be one of: ${VALID_LEVELS.join(", ")}`),
  body("rounds").notEmpty().withMessage("rounds is required").isString().trim(),
  body("description").notEmpty().withMessage("description is required").isString().trim(),
  body("tags").optional().isArray().withMessage("tags must be an array"),
  body("tags.*").optional().isString().trim(),
  body("result")
    .optional()
    .isIn(VALID_RESULTS)
    .withMessage(`result must be one of: ${VALID_RESULTS.join(", ")}`),
  body("postedAt").optional().isString().trim(),
];

// ── Param-only ─────────────────────────────────────────────────────────────

const idParamRule = [
  param("id").isMongoId().withMessage("Invalid interview id"),
];

export { createInterviewRules, idParamRule };