import asyncHandler from '../utils/asyncHandler.js';
import authService from '../services/authService.js';

export const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: user,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: result,
  });
});
