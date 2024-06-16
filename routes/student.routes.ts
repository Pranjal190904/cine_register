import { Router } from "express";
import { registerStudent } from "../controllers/student.controller";
const router = Router();

router.post("/register", registerStudent);

export default router;