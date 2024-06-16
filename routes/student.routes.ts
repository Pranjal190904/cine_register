import { Router } from "express";
import { registerStudent,verifyStudent } from "../controllers/student.controller";
import { testController } from "../controllers/test.controller";   
const router = Router();

router.post("/register", registerStudent);
router.post("/verify", verifyStudent);
router.post("/login", testController.login);

export default router;