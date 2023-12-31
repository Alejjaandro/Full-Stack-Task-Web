import { createContext, useContext, useState } from "react";
import {
    createTaskRequest,
    getTasksRequest,
    deleteTaskRequest,
    getTaskRequest,
    updateTaskRequest
} from "../api/task";
import { useNavigate } from "react-router-dom";

const TaskContext = createContext();

export const useTasks = () => {

    const context = useContext(TaskContext);

    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider");
    }

    return context;
}

export function TaskProvider({ children }) {

    const [tasks, setTasks] = useState([]);

    // Get Tasks
    const getTasks = async () => {
        try {
            const res = await getTasksRequest();
            setTasks(res.data);

        } catch (error) {
            console.log(error);
        }
    }

    // Get Task
    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id);
            return (res.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Create Task
    const createTask = async (task) => {
        const res = await createTaskRequest(task);
        console.log(res);
    }

    // Update Task
    const updateTask = async (id, task) => {
        try {
            const res = await updateTaskRequest(id, task);

        } catch (error) {
            console.log(error);
        }
    }

    // Delete Task
    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id);

            // This update the tasks array to all tasks with an id != (id).
            if (res.status === 204) { setTasks(tasks.filter(task => task._id !== id)) }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TaskContext.Provider value={{
            tasks,
            createTask,
            getTasks,
            deleteTask,
            getTask,
            updateTask
        }}>
            {children}
        </TaskContext.Provider>
    );
}