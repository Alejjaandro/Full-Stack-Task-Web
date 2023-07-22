import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getTasks, getTask, createTask, updateTask, deleteTask } from "../controllers/tasks.controller.js";

// Validators
import { taskValidator } from "../validators/task.validator.js";
import { validator } from "../middlewares/validator.js";

const router = Router();

router.get('/tasks', authRequired, getTasks);
router.get('/tasks/:id', authRequired, getTask);

router.post('/tasks', authRequired, validator(taskValidator), createTask);

router.put('/tasks/:id', authRequired, updateTask);

router.delete('/tasks/:id', authRequired, deleteTask);

export default router;