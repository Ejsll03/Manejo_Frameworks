import express from "express";
import { 
  register, 
  login, 
  logout, 
  checkAuth, 
  resetPassword,
  sessionInfo,
  debugSessions,
  sessionStats
} from "../controllers/authController.js";

const router = express.Router();

// Rutas de autenticación principales
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", checkAuth);
router.post("/reset-password", resetPassword);

// Rutas de información y debug de sesiones
router.get("/session-info", sessionInfo);
router.get("/session-stats", sessionStats);
router.get("/debug-sessions", debugSessions);

export default router;