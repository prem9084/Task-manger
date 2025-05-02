import TaskModel from "../Models/TaskModel.js";

export const CreateTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;

    // validations

    if (!title) {
      return res.send({ message: "Title is required" });
    }
    if (!description) {
      return res.send({ message: "description is required" });
    }
    if (!priority) {
      return res.send({ message: "priority is required" });
    }
    if (!status) {
      return res.send({ message: "status is required" });
    }
    if (!dueDate) {
      return res.send({ message: "dueDate is required" });
    }

    const task = await TaskModel.create({
      title,
      description,
      priority,
      status,
      dueDate,
    });

    res.status(201).send({
      success: true,
      message: "Task Created",
      task,
    });
  } catch (error) {
    console.log(error);
  }
};

// update Task

export const UpdateTask = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;

    const Updatetask = await TaskModel.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true }
    );
    if (!Updatetask) {
      return res.send({
        message: "Task is not found",
      });
    }
    res.status(201).send({
      success: true,
      message: "Task Updated",
      UpdateTask,
    });
  } catch (error) {
    console.log(error);
  }
};

// search and filter

export const SearchFilter = async (req, res) => {
  const { search, status, priority, dueDate } = req.query;

  let filter = {};

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (dueDate) filter.dueDate = { $lte: new Date(dueDate) };

  try {
    const tasks = await TaskModel.find(filter).populate("creator assignee");
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// getAll tasks

export const GetAllTask = async (req, res) => {
  try {
    const tasks = await TaskModel.find({});
    res.status(201).send({
      success: true,
      message: "All Task",
      tasks,
    });
  } catch (error) {
    console.log(error);
  }
};

export const GetSingleTask = async (req, res) => {
  try {
    const tasks = await TaskModel.findById(req.params.id).populate(
      "creator assignee"
    );
    res.status(201).send({
      success: true,
      message: "Single Task",
      tasks,
    });
  } catch (error) {
    console.log(error);
  }
};

// delete task

export const deleteTask = async (req, res) => {
  try {
    const tasks = await TaskModel.findByIdAndDelete(req.params.id);
    if (!tasks) {
      return res.send({ message: "Task not found" });
    }
    res.status(201).send({
      message: "Task Deleted",
      tasks,
    });
  } catch (error) {
    console.log(error);
  }
};
