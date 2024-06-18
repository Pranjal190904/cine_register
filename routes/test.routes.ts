import { Router } from "express";
import { testController } from "../controllers/test.controller";
const router = Router();

router.post("/login", testController.login);

export default router;