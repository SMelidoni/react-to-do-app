import './todo.styles.scss';

import React, { FC, useState } from 'react';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';

interface Task {
  id: number;
  name: string;
  editing: boolean;
  completed: boolean;
}

const Todo: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [editValue, setEditValue] = useState('');
  const [nextId, setNextId] = useState(0);

  const addTask = () => {
    if (inputValue.trim()) {
      setTasks([
        ...tasks,
        { id: nextId, name: inputValue, editing: false, completed: false },
      ]);
      setInputValue('');
      setNextId(nextId + 1);
    }
  };

  const editMode = (id: number, name: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, editing: true } : task)),
    );
    setEditValue(name);
  };

  const saveTask = (id: number) => {
    if (editValue.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, name: editValue, editing: false } : task,
        ),
      );
      setEditValue('');
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleCheck = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <div className='todo-container'>
      <h2 className='todo-header'>Add Task</h2>
      <div className='todo-input-container'>
        <input
          className='todo-input'
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTask();
            }
          }}
          placeholder='Enter Task Here...'
        />
        <button className='add-button' onClick={addTask}>
          Add
        </button>
      </div>
      <ul className='todo-list'>
        {tasks.map((task) => (
          <li
            className={`todo-item ${task.editing ? 'editing' : ''} ${
              task.completed ? 'completed' : ''
            }`}
            key={task.id}
          >
            <div className='task-container'>
              <input
                type='checkbox'
                className='task-checkbox'
                checked={task.completed}
                onChange={() => handleCheck(task.id)}
              />
              {task.editing ? (
                <div className='edit-input-container'>
                  <input
                    className='edit-input'
                    type='text'
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button
                    className='save-button'
                    onClick={() => saveTask(task.id)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className='task-display'>
                  <span
                    className={`task-text ${
                      task.completed ? 'task-text-completed' : ''
                    }`}
                  >
                    {task.name}
                  </span>
                  <div className='button-container'>
                    <FaPencilAlt
                      className='edit-button'
                      onClick={() => editMode(task.id, task.name)}
                    />
                    <FaTrash
                      className='delete-button'
                      onClick={() => deleteTask(task.id)}
                    />
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
