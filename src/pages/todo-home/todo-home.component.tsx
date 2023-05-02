import './todo-home.styles.scss';

import React, { FC } from 'react';

const ToDoHome: FC = () => {
  return (
    <div className='todo-home-container'>
      <header className='todo-home-header'>
        <h1 className='header-text header-text-react'>React</h1>
        <h1 className='header-text header-text-todo'>To-Do</h1>
      </header>
      <div className='todo-home-content'></div>
    </div>
  );
};

export default ToDoHome;
