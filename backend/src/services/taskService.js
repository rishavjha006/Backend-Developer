import prisma from '../config/database.js';
import AppError from '../utils/AppError.js';

class TaskService {
  async createTask(userId, data) {
    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        userId,
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return task;
  }

  async getTasks(user, { page = 1, limit = 10, search = '' }) {
    const skip = (page - 1) * limit;
    const where = user.role === 'ADMIN' ? {} : { userId: user.id };

    if (search) {
      where.title = { contains: search, mode: 'insensitive' };
    }

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: parseInt(limit),
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.task.count({ where }),
    ]);

    return {
      tasks,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getTaskById(taskId, user) {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    if (user.role !== 'ADMIN' && task.userId !== user.id) {
      throw new AppError('You do not have permission to access this task', 403);
    }

    return task;
  }

  async updateTask(taskId, user, data) {
    const task = await this.getTaskById(taskId, user);

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title: data.title ?? task.title,
        description: data.description ?? task.description,
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return updatedTask;
  }

  async deleteTask(taskId, user) {
    await this.getTaskById(taskId, user);

    await prisma.task.delete({
      where: { id: taskId },
    });
  }
}

export default new TaskService();
