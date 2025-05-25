import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Chip,
  IconButton,
  Toolbar,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { db } from "../utils/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Dashboard = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const snapshot = await getDocs(collection(db, "tasks"));
      const fetchedTasks = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTask.title.trim() || !newTask.deadline.trim()) return;

    const task = {
      projectId: Date.now(),
      title: newTask.title.trim(),
      description: newTask.description.trim(),
      deadline: newTask.deadline.trim(),
      status: "todo",
    };

    const docRef = await addDoc(collection(db, "tasks"), task);
    setTasks([...tasks, { ...task, id: docRef.id }]);
    setNewTask({ title: "", description: "", deadline: "" });
  };

  const updateStatus = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "todo"
        ? "in-progress"
        : currentStatus === "in-progress"
        ? "completed"
        : "completed";

    const taskDoc = doc(db, "tasks", id);
    await updateDoc(taskDoc, { status: newStatus });

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      <Toolbar disableGutters sx={{ mb: 3 }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", color: deepPurple[500], flexGrow: 1 }}
        >
          Dashboard
        </Typography>
        {user && (
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            Welcome, {user.name}
          </Typography>
        )}
      </Toolbar>

      {/* Add Task Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 5, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 2, color: deepPurple[500] }}>
          Add New Task
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Task Title"
              size="small"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Description"
              size="small"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Deadline"
              type="date"
              size="small"
              value={newTask.deadline}
              onChange={(e) =>
                setNewTask({ ...newTask, deadline: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: deepPurple[500],
                "&:hover": { bgcolor: deepPurple[700] },
              }}
              onClick={addTask}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Task List */}
      <Typography
        variant="h5"
        sx={{ mb: 3, fontWeight: "medium", color: deepPurple[500] }}
      >
        Tasks
      </Typography>
      <Grid container spacing={4}>
        {tasks.length === 0 && (
          <Typography sx={{ color: "text.secondary", mx: "auto" }}>
            No tasks added yet.
          </Typography>
        )}
        {tasks.map((task) => (
          <Grid item xs={12} md={6} key={task.id}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                minHeight: 200,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 3,
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 1, color: deepPurple[700] }}
                >
                  {task.title}
                </Typography>
                {task.description && (
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, color: "text.secondary" }}
                  >
                    {task.description}
                  </Typography>
                )}
                <Typography
                  variant="body2"
                  sx={{ mb: 1, color: "text.secondary" }}
                >
                  Deadline: {task.deadline}
                </Typography>
                <Chip
                  label={task.status.toUpperCase()}
                  color={
                    task.status === "todo"
                      ? "default"
                      : task.status === "in-progress"
                      ? "warning"
                      : "success"
                  }
                  sx={{ fontWeight: "bold" }}
                />
              </Box>
              <Box
                mt={3}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                {task.status !== "completed" && (
                  <Button
                    variant="outlined"
                    size="small"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => updateStatus(task.id, task.status)}
                    sx={{
                      borderColor: deepPurple[500],
                      color: deepPurple[500],
                    }}
                  >
                    Next
                  </Button>
                )}
                {task.status === "completed" && (
                  <IconButton
                    onClick={() => deleteTask(task.id)}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
