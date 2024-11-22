import { useState } from "react";
import EditTask from "./EditTask";

function Task({ task, onTaskUpdated, onTaskDeleted }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdate = (updatedTask) => {
    onTaskUpdated(updatedTask);
    setIsEditing(false); // Exit editing mode after update
  };

  const handleCancel = () => {
    setIsEditing(false); // Exit editing mode without updating
  };

  const handleDelete = async () => {
    try {
      await onTaskDeleted(task._id);
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  return (
    <li>
      {isEditing ? (
        <EditTask
          task={task}
          onTaskUpdated={handleUpdate}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <span className={task.completed ? "task-completed" : ""}>
            {task.title} - {task.completed ? "Completed" : "Incomplete"}
          </span>
          <div className="task-actions">
            <button className="edit" onClick={handleEditClick}>
              Edit
            </button>
            <button className="delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default Task;
