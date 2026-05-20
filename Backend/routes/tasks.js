const router = require("express").Router();
const Task = require("../models/Task");

// GET all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});

// CREATE a new task
router.post("/", async (req, res) => {
    try {
        // Validate input
        if (!req.body.title) {
            return res.status(400).json({ error: "Title is required" });
        }

        const task = new Task({
            title: req.body.title,
            description: req.body.description || "",
            completed: false
        });

        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: "Failed to create task" });
    }
});

// UPDATE a task
router.put("/:id", async (req, res) => {
    try {
        const updated = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: "Failed to update task" });
    }
});

// DELETE a task
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Task.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json({ message: "Task Deleted Successfully", task: deleted });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete task" });
    }
});

module.exports = router;