import { Router } from "express";
import { registerStudent,verifyStudent } from "../controllers/student.controller";
const router = Router();

router.post("/register", registerStudent);
router.post("/verify", verifyStudent);

export default router;