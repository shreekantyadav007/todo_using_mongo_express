import { useState, useEffect } from "react";
import axios from "../api/axios";
import Task from "./Task";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get("/tasks");
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch tasks");
        setLoading(false);
      }
    }
    fetchTasks();
  }, [tasks]);

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  const handleTaskDeleted = async (taskId) => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      alert("Failed to delete task");
    }
  };

 const handleTaskStatus = async (taskId, status) =>{
   try {
      const response =  await axios.post(`/tasks/status`);
       setTasks(tasks.map((task) => (task._id === taskId ? response.data : task)));
    } catch (err) {
      alert("Failed to update status task");
    }
  }
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            onTaskUpdated={handleTaskUpdated}
            onTaskDeleted={handleTaskDeleted}
            onTaskStatus={handleTaskStatus}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
