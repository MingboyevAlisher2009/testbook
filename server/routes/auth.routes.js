import { Router } from "express";
import { getMe, signIn, signUp } from "../controllers/auth.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/me", AuthMiddleware, getMe);

export default router;
