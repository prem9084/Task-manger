import mongoose from "mongoose";

const TaskScheema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: Date,
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
  status: {
    type: String,
    enum: ["Todo", "In Progress", "Done"],
    default: "Todo",
  },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Tasks", TaskScheema);
