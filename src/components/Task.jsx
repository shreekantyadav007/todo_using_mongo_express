import { useState } from "react";
import EditTask from "./EditTask";
import axios from "axios";

function Task({ task, onTaskUpdated, onTaskDeleted, onTaskStatus }) {
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

  const updateStatus = async (taskId, status) => {
        try {  
          await onTaskStatus(taskId, status)
        } catch (error) {
            console.error("Error updating status:", error);
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
            <button onClick={() => updateStatus(task._id, !task.completed)}>
                            {task.status ? "Mark Incomplete" : "Mark Complete"}
             </button>
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
