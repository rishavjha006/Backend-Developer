import { body, param, query, validationResult } from 'express-validator';
import AppError from '../utils/AppError.js';

export const createTaskValidator = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').optional().trim(),
];

export const updateTaskValidator = [
  param('id').isUUID().withMessage('Invalid task ID'),
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().trim(),
];

export const taskIdValidator = [
  param('id').isUUID().withMessage('Invalid task ID'),
];

export const paginationValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('search').optional().trim(),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg).join(', ');
    throw new AppError(errorMessages, 400);
  }
  next();
};
