import { body, param } from 'express-validator';

export const createBlogRules = [
  body('title').notEmpty().withMessage('title is required').isString().trim(),
  body('content').optional().isString().trim(),
  body('blocks').optional().isArray(),
  body('author').optional().isString().trim(),
  body('tags').optional().isArray().withMessage('tags must be an array'),
  body('tags.*').optional().isString().trim(),
  body('coverImage').optional({ nullable: true }).isURL().withMessage('coverImage must be a valid URL'),
  body('published').optional().isBoolean(),
];

export const updateBlogRules = [
  param('id').isMongoId().withMessage('Invalid blog id'),
  body('title').optional().isString().trim().notEmpty(),
  body('content').optional().isString().trim(),
  body('blocks').optional().isArray(),
  body('author').optional().isString().trim(),
  body('tags').optional().isArray(),
  body('tags.*').optional().isString().trim(),
  body('coverImage').optional({ nullable: true }).isURL().withMessage('coverImage must be a valid URL'),
  body('published').optional().isBoolean(),
];

export const idParamRule = [
  param('id').isMongoId().withMessage('Invalid blog id'),
];