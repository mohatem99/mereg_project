import React from 'react';
import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';
import TaskCard from './TaskCard';

const TaskColumn = ({ title, tasks, status, onAddTask }) => {
  return (
    <div className="flex-1 bg-white ">
      <div className="flex items-center justify-between mb-4 rounded-lg shadow-md h-fit p-4">
        <h2 className="text-xl font-bold text-customBlue900 sm:text-xl md:text-xl">{title}</h2>
        <Link to={onAddTask}>
          <IoMdAdd className="text-2xl text-customBlue900 cursor-pointer hover:text-blue-600 transition duration-200" />
        </Link>
      </div>
      <div className="border-b-2 border-blue-900 my-2"></div>
      <div className="space-y-4">
        {tasks.filter(task => task.status === status).map((task, index) => (
          <TaskCard task={task} key={index} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
