import './App.scss';

import React, { FC } from 'react';

import ToDoHome from './pages/todo-home/todo-home.component';

const App: FC = () => {
  return (
    <div className='global-page-container'>
      <div className='pixelated-grid'></div>
      <ToDoHome />
    </div>
  );
};

export default App;
