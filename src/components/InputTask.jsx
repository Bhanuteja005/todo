// AddTask.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/Task/taskSlice.js";
import { v4 as uuidv4 } from "uuid";

function InputTask() {
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    id: uuidv4(),
    title: "",
    deadline: "",
    completed: false,
    important: false,
  });

  const dispatch = useDispatch();

  const handleSaveTask = () => {
    dispatch(addTask(newTask));
    setNewTask({
      id: "",
      title: "",
      description: "",
      deadline: "",
      completed: false,
      important: false,
    });
    setShowModal(false);
  };

  return (
    <div>
      <button
        className="py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
        onClick={() => setShowModal(true)}
      >
        + Add Task
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-xl font-bold mb-4">Add Task</h2>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="border border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
            />
            <textarea
              cols="10"
              rows="5"
              value={newTask.description}
              placeholder="Description"
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="border border-gray-300 rounded-md px-2 py-1 mb-[3px] w-full"
            ></textarea>
            <input
              type="date"
              placeholder="Deadline"
              value={newTask.deadline}
              onChange={(e) =>
                setNewTask({ ...newTask, deadline: e.target.value })
              }
              className="border border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
            />
            <div className="mb-2">
              <input
                type="checkbox"
                checked={newTask.completed}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    completed: e.target.checked,
                  })
                }
                className="mr-2"
              />
              <span>Completed</span>
            </div>
            <div className="mb-4">
              <input
                type="checkbox"
                checked={newTask.important}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    important: e.target.checked,
                  })
                }
                className="mr-2"
              />
              <span>Important</span>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={handleSaveTask}
              >
                Save Task
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InputTask;
