import express from "express";

import {
  CreateTask,
  deleteTask,
  GetAllTask,
  GetSingleTask,
  SearchFilter,
  UpdateTask,
} from "../Controllers/TaskController.js";

const router = express.Router();

router.post("/create", CreateTask);
router.put("/update/:id", UpdateTask);
router.get("/get-single/:id", GetSingleTask);
router.get("/update", UpdateTask);
router.get("/search", SearchFilter);
router.get("/get-all", GetAllTask);
router.delete("/delete/:id", deleteTask);

export default router;
