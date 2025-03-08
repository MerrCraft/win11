```jsx
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './App.css';

const Window = ({ id, title, children, onClose }) => {
  return (
    <Draggable>
      <div className="window">
        <div className="window-header">
          <span>{title}</span>
          <button onClick={() => onClose(id)}>X</button>
        </div>
        <div className="window-content">
          {children}
        </div>
      </div>
    </Draggable>
  );
};

const Taskbar = ({ windows, onOpenWindow }) => {
  return (
    <div className="taskbar">
      {windows.map(window => (
        <button key={window.id} onClick={() => onOpenWindow(window.id)}>
          {window.title}
        </button>
      ))}
    </div>
  );
};

const App = () => {
  const [windows, setWindows] = useState([
    { id: 1, title: 'Window 1', content: 'Content of Window 1', isOpen: true },
    { id: 2, title: 'Window 2', content: 'Content of Window 2', isOpen: false },
  ]);

  const openWindow = (id) => {
    setWindows(windows.map(window => window.id === id ? { ...window, isOpen: true } : window));
  };

  const closeWindow = (id) => {
    setWindows(windows.map(window => window.id === id ? { ...window, isOpen: false } : window));
  };

  return (
    <div className="desktop">
      {windows.filter(window => window.isOpen).map(window => (
        <Window key={window.id} id={window.id} title={window.title} onClose={closeWindow}>
          {window.content}
        </Window>
      ))}
      <Taskbar windows={windows} onOpenWindow={openWindow} />
    </div>
  );
};

export default App;
```