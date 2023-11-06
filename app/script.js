import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const App = () => {
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(1200);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
    if (!isTimerRunning) {
      setStatus('work');
    } else {
      setStatus('off');
      setTime(1200);
    }
  };

  const closeApp = () => {
    window.close();
  };

  useEffect(() => {
    let timer;
    if (isTimerRunning && time > 0) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(timer);
      const bellSound = new Audio('./sounds/bell.wav');
      bellSound.play();
      if (status === 'work') {
        setStatus('rest');
        setTime(20);
      } else if (status === 'rest') {
        setStatus('work');
        setTime(1200);
      }
    }

    return () => {
      clearInterval(timer);
    };
  }, [isTimerRunning, status, time]);

  return (
    <div>
      {status === 'off' && (
        <div>
          <h1>Protect your eyes</h1>
          <p>According to optometrists, in order to save your eyes, you should follow the 20/20/20 rule. It means you should rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      )}

      {(status === 'work' || status === 'rest') && <img src={`./images/${status}.png`} alt={status} />}
      {status !== 'off' && <div className="timer">{formatTime(time)}</div>}
      
      <button className="btn" onClick={toggleTimer}>{isTimerRunning ? 'Stop' : 'Start'}</button>
      <button className="btn btn-close" onClick={closeApp}>X</button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));