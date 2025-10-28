import * as taskService from '../services/taskService.js';

export async function getTasks(req, res, next) {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
}

export async function createTask(req, res, next) {
  const { title, completed } = req.body;
  const task = await taskService.createTask({ title, completed });
  res.status(201).json(task);
}

export async function getTaskById(req, res, next) {
  try {
    const { id } = req.params;

    // Validate that ID is a number, if not return 400
    if (isNaN(id)) {
      return res.status(400).json({
        error: 'Validation failed',
        details: ['ID must be a number']
      });
    }

    // Search for task
    const task = await taskService.getTaskById(Number(id));

    // If task not found, return 404
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Task found successfully
    return res.status(200).json(task);
  } catch (err) {
    next(err);
  }
}
