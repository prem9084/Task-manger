import express from "express";
import { Login, Register } from "../Controllers/UserController.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/user-auth", (req, res) => {
  res.status(200).send({ ok: true });
});
export default router;
