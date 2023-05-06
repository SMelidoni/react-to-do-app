import './todo.styles.scss';

import React, { FC, useState } from 'react';

import GlobalButton from '../global-button/global-button.component';

const Todo: FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div className='todo-container'>
      <h2 className='todo-header'>Add Task</h2>
      <div className='todo-input-container'>
        <input
          className='todo-input'
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.toUpperCase())}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTask();
            }
          }}
          placeholder='ENTER TASK'
        />
        <GlobalButton label='Add' onClick={addTask}></GlobalButton>
      </div>
      <ul className='todo-list'>
        {tasks.map((task, index) => (
          <li className='todo-item' key={index}>
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
