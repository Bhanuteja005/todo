import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskCard from "./TaskCard";
import UpdateTask from "./UpdateTask";
import InputTask from "./InputTask";

import { deleteTask } from "../redux/Task/taskSlice";

function TaskList() {
  const [showModal, setShowModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState({});

  const tasks = useSelector((state) => state.tasks);
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
        <h1 className="text-xl font-semibold">All Tasks</h1>
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

export default TaskList;
