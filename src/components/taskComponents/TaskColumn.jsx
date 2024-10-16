import React from 'react';
import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';
import TaskCard from './TaskCard';

const TaskColumn = ({ title, tasks, status, onAddTask }) => {
  return (
    <div className="flex-1 bg-white p-4">
      <div className="flex items-center justify-between mb-4 rounded-lg shadow-md h-fit p-4">
        <h2 className="text-xl font-bold text-customBlue900">{title}</h2>
        <Link to={onAddTask}>
          <IoMdAdd className="text-2xl text-customBlue900 cursor-pointer" />
        </Link>
      </div>
      <div style={{ borderBottom: '2px solid #10197A', margin: '10px 0' }}></div>
      <div className="space-y-4">
        {tasks.filter(task => task.status === status).map((task, index) => (
          <TaskCard task={task} key={index} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
