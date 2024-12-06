import { useState } from 'react';
import axios from '../api/axios';

function EditTask({ task, onTaskUpdated }) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`/tasks/${task._id}`, { title, description });
            onTaskUpdated(response.data);
        } catch (err) {
            alert('Failed to update task');
        }
    };

    return (
        <div>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            <button onClick={handleUpdate}>Update Task</button>
        </div>
    );
}

export default EditTask;
