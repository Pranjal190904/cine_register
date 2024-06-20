import { Router } from "express";
import { testController } from "../controllers/test.controller";
import auth from '../middleware/auth.middleware'
const router = Router();

router.post("/login", testController.login);
router.post("/start", auth, testController.start); 

export default router;