import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputTask from "../components/InputTask.jsx";
import TaskCard from "../components/TaskCard.jsx";
import UpdateTask from "../components/UpdateTask.jsx";
import { deleteTask, selectToDoTasks } from "../redux/Task/taskSlice.js";

function Todo() {
  const [showModal, setShowModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState({});

  const tasks = useSelector(selectToDoTasks);
  const dispatch = useDispatch();

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleOpenEditModal = (task) => {
    setTaskToUpdate(task);
    setShowModal(true);
  };

  const handleCloseEditModal = () => {
    setTaskToUpdate({});
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between">
        <h1 className="text-xl font-semibold">Todo Tasks</h1>
        <InputTask />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 my-5 gap-3">
        {tasks.map((task, index) => (
          <TaskCard
            key={index}
            task={task}
            handleOpenEditModal={handleOpenEditModal}
            handleDeleteTask={handleDeleteTask}
          />
        ))}
      </div>

      {showModal && (
        <UpdateTask
          taskToUpdate={taskToUpdate}
          handleCloseEditModal={handleCloseEditModal}
        />
      )}
    </div>
  );
}

export default Todo;
