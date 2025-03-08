import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import './App.css';

const Window = ({
  id,
  title,
  children,
  isMinimized,
  isFullscreen,
  onClose,
  onMinimize,
  onToggleFullscreen,
}) => {
  const windowClassNames = `window ${isFullscreen ? 'fullscreen' : ''} ${isMinimized ? 'minimized' : ''}`;

  const defaultSize = { width: 300, height: 200 };
  const fullscreenSize = { width: '100%', height: '100%' };

  const [size, setSize] = useState(defaultSize);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleToggleFullscreen = () => {
    if (isFullscreen) {
      setSize(defaultSize);
      setPosition({ x: 50, y: 50 });
    } else {
      setSize(fullscreenSize);
      setPosition({ x: 0, y: 0 });
    }
    onToggleFullscreen(id);
  };

  return (
    <Rnd
      size={size}
      position={position}
      onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({
          width: ref.style.width,
          height: ref.style.height,
        });
        setPosition(position);
      }}
      bounds="parent"
      className={windowClassNames}
      enableResizing={!isFullscreen && !isMinimized}
      disableDragging={isFullscreen || isMinimized}
      dragHandleClassName="window-header"
    >
      <div>
        <div className="window-header">
          <span>{title}</span>
          <div className="window-controls">
            <button onClick={() => onMinimize(id)}>{isMinimized ? '🔼' : '🔽'}</button>
            <button onClick={handleToggleFullscreen}>{isFullscreen ? '🗗' : '🗖'}</button>
            <button onClick={() => onClose(id)}>X</button>
          </div>
        </div>
        {!isMinimized && <div className="window-content">{children}</div>}
      </div>
    </Rnd>
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
    { id: 1, title: 'Window 1', content: 'Content of Window 1', isOpen: true, isMinimized: false, isFullscreen: false },
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