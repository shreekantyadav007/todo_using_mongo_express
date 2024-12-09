import { useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };
  const searchTasks = async (query) => {
    try {
        const response = await axios.post('/tasks/search', {
            query,
        });
        console.log('Search results:', response.data);
    } catch (error) {
        console.error('Error searching tasks:', error.response ? error.response.data : error.message);
    }
};

  return (
    <div className="container">
      <h1>Create To-Do </h1>
      <AddTask onTaskAdded={handleTaskAdded} />
       <br />
      <h1>Search Todo</h1>
          <input
          type="text"
          placeholder="Search tasks..."
          onChange={(e) => searchTasks(e.target.value)}
          />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
