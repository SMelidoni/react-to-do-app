import './todo.styles.scss';

import React, { FC, useState } from 'react';

interface Task {
  id: number;
  name: string;
  editing: boolean;
}

const Todo: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [editValue, setEditValue] = useState('');
  const [nextId, setNextId] = useState(0);

  const addTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { id: nextId, name: inputValue, editing: false }]);
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
            className={`todo-item ${task.editing ? 'editing' : ''}`}
            key={task.id}
          >
            {task.editing ? (
              <div className='edit-input-container'>
                <input
                  className='edit-input'
                  type='text'
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value.toUpperCase())}
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
                {task.name}
                <div className='button-container'>
                  <button
                    className='edit-button'
                    onClick={() => editMode(task.id, task.name)}
                  >
                    Edit
                  </button>
                  <button
                    className='delete-button'
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
