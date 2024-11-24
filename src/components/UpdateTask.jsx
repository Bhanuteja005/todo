// import React from 'react'

// const UpdateTask = ({taskToUpdate,setEditTaskId, handleCloseEditModal}) => {
//     const [updatedTask, setUpdatedTask] = useState({
//         title: taskToUpdate.title,
//         deadline: taskToUpdate.deadline,
//         completed: taskToUpdate.completed,
//         important: taskToUpdate.important,
//       });

//   return (
//     <div>
//       <input
//         type="text"
//         value={updatedTask.title}
//         onChange={(e) =>
//           setUpdatedTask({ ...updatedTask, title: e.target.value })
//         }
//         className="border border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
//       />
//       <input
//         type="date"
//         value={updatedTask.deadline}
//         onChange={(e) =>
//           setUpdatedTask({ ...updatedTask, deadline: e.target.value })
//         }
//         className="border border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
//       />
//       <div className="mb-2">
//         <input
//           type="checkbox"
//           checked={updatedTask.completed}
//           onChange={(e) =>
//             setUpdatedTask({ ...updatedTask, completed: e.target.checked })
//           }
//           className="mr-2"
//         />
//         <span>Completed</span>
//       </div>
//       <div className="mb-4">
//         <input
//           type="checkbox"
//           checked={updatedTask.important}
//           onChange={(e) =>
//             setUpdatedTask({ ...updatedTask, important: e.target.checked })
//           }
//           className="mr-2"
//         />
//         <span>Important</span>
//       </div>
//       <div className="flex justify-end">
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
//           onClick={handleSaveChanges}
//         >
//           Save Changes
//         </button>
//         <button
//           className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
//           onClick={() => handleCloseEditModal()}
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   )
// }

// export default UpdateTask

import React, { useState } from "react";
import { updateTask } from "../redux/Task/taskSlice.js";
import { useDispatch } from "react-redux";

const UpdateTask = ({ taskToUpdate, handleCloseEditModal }) => {
  const dispatch = useDispatch();
  const [updatedTask, setUpdatedTask] = useState({
    id: taskToUpdate.id,
    title: taskToUpdate.title,
    description: taskToUpdate.description,
    deadline: taskToUpdate.deadline,
    completed: taskToUpdate.completed,
    important: taskToUpdate.important,
  });

  const handleSaveChanges = () => {
    dispatch(updateTask({ id: updatedTask.id, updatedTask }));
    handleCloseEditModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md">
        <input
          type="text"
          value={updatedTask.title}
          onChange={(e) =>
            setUpdatedTask({ ...updatedTask, title: e.target.value })
          }
          className="border border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
        />
        <input
          type="date"
          value={updatedTask.deadline}
          onChange={(e) =>
            setUpdatedTask({ ...updatedTask, deadline: e.target.value })
          }
          className="border border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
        />
        <textarea
          cols="10"
          rows="5"
          value={updatedTask.description}
          onChange={(e) =>
            setUpdatedTask({ ...updatedTask, description: e.target.value })
          }
          className="border border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
        ></textarea>
        <div className="mb-2">
          <input
            type="checkbox"
            checked={updatedTask.completed}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, completed: e.target.checked })
            }
            className="mr-2"
          />
          <span>Completed</span>
        </div>
        <div className="mb-4">
          <input
            type="checkbox"
            checked={updatedTask.important}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, important: e.target.checked })
            }
            className="mr-2"
          />
          <span>Important</span>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            onClick={handleCloseEditModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
