import { useState } from "react";
import axios from "../api/axios";

function EditTask({ task, onTaskUpdated, onCancel }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleUpdate = async () => {
    try {
      const response = await axios.post(`/tasks/update/${task._id}`, {
        title,
        description,
      });
      onTaskUpdated(response.data);
    } catch (err) {
      alert("Failed to update task");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button onClick={handleUpdate}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default EditTask;
