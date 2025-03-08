import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Rnd } from 'react-rnd';
import './App.css';

const Window = ({ id, title, children, isMinimized, isFullscreen, onClose, onMinimize, onToggleFullscreen }) => {
  const windowClassNames = `window ${isFullscreen ? 'fullscreen' : ''} ${isMinimized ? 'minimized' : ''}`;

  return (
    <Draggable handle=".window-header" bounds="parent" disabled={isFullscreen || isMinimized}>
      <Rnd
        default={{
          x: isFullscreen ? 0 : 50,
          y: isFullscreen ? 0 : 50,
          width: isFullscreen ? '100%' : 300,
          height: isFullscreen ? '100%' : 200,
        }}
        enableResizing={!isFullscreen && !isMinimized}
        bounds="parent"
        className={windowClassNames}
      >
        <div>
          <div className="window-header">
            <span>{title}</span>
            <div className="window-controls">
              <button onClick={() => onMinimize(id)}>{isMinimized ? '🔼' : '🔽'}</button>
              <button onClick={() => onToggleFullscreen(id)}>{isFullscreen ? '🗗' : '🗖'}</button>
              <button onClick={() => onClose(id)}>X</button>
            </div>
          </div>
          {!isMinimized && <div className="window-content">{children}</div>}
        </div>
      </Rnd>
    </Draggable>
  );
};

const Taskbar = ({ windows, onOpenWindow }) => {
  return (
    <div className="taskbar">
      <div className="taskbar-center">
        {windows.map(window => (
          <button key={window.id} onClick={() => onOpenWindow(window.id)}>
            {window.title}
          </button>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [windows, setWindows] = useState([
    { id: 1, title: 'Window 1', content: 'Content of Window 1', isOpen: true, isMinimized: false, isFullscreen: true },
    { id: 2, title: 'Window 2', content: 'Content of Window 2', isOpen: false, isMinimized: false, isFullscreen: false },
  ]);

  const openWindow = (id) => {
    setWindows(windows.map(window => window.id === id ? { ...window, isOpen: true, isMinimized: false } : window));
  };

  const closeWindow = (id) => {
    setWindows(windows.map(window => window.id === id ? { ...window, isOpen: false } : window));
  };

  const minimizeWindow = (id) => {
    setWindows(windows.map(window => window.id === id ? { ...window, isMinimized: !window.isMinimized } : window));
  };

  const toggleFullscreenWindow = (id) => {
    setWindows(windows.map(window => window.id === id ? { ...window, isFullscreen: !window.isFullscreen } : window));
  };

  return (
    <div className="desktop">
      {windows.filter(window => window.isOpen).map(window => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          isMinimized={window.isMinimized}
          isFullscreen={window.isFullscreen}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onToggleFullscreen={toggleFullscreenWindow}
        >
          {window.content}
        </Window>
      ))}
      <Taskbar windows={windows} onOpenWindow={openWindow} />
    </div>
  );
};

export default App;