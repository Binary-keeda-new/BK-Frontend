
import express from "express";
import { syncUser, getMe } from "./user.controller.js";
import { verifyDescope } from "../../core/middlewares/auth.middleware.js";

const router = express.Router();

router.post("/sync", verifyDescope, syncUser);
router.get("/me", verifyDescope, getMe);

export default router;