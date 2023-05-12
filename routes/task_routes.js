import { Router } from "express";
import { createTask, findTaskByStudentId, findTasksByTeacherId } from "../controllers/task-controllers.js";
import { isTeacher } from "../middleware/isTeacher.js";

const router1 = Router();

router1.post('/createTask/:id',isTeacher, createTask);
router1.get('/findTask/:id',findTasksByTeacherId);
router1.get('/findStudentTask/:id',findTaskByStudentId);



export default router1;