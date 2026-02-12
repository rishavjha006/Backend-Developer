import asyncHandler from '../utils/asyncHandler.js';
import taskService from '../services/taskService.js';

export const createTask = asyncHandler(async (req, res) => {
  const task = await taskService.createTask(req.user.id, req.body);

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: task,
  });
});

export const getTasks = asyncHandler(async (req, res) => {
  const result = await taskService.getTasks(req.user, req.query);

  res.status(200).json({
    success: true,
    message: 'Tasks retrieved successfully',
    data: result,
  });
});

export const getTaskById = asyncHandler(async (req, res) => {
  const task = await taskService.getTaskById(req.params.id, req.user);

  res.status(200).json({
    success: true,
    message: 'Task retrieved successfully',
    data: task,
  });
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await taskService.updateTask(req.params.id, req.user, req.body);

  res.status(200).json({
    success: true,
    message: 'Task updated successfully',
    data: task,
  });
});

export const deleteTask = asyncHandler(async (req, res) => {
  await taskService.deleteTask(req.params.id, req.user);

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
  });
});
