import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeLow, faRepeat } from '@fortawesome/free-solid-svg-icons';
import Metronome from './Metronome';
import { useNotification } from './Notifications';

interface CprManagerProps {
  // Add any props if needed
}

const CprManager: React.FC<CprManagerProps> = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [countdownTime, setCountdownTime] = useState(20); // 2 minutes in seconds
  const [isSoundOn, setIsSoundOn] = useState(true);
  const notificationShownRef = useRef(false);
  const { showNotification } = useNotification();

  const showTimerNotification = useCallback(() => {
    if (!notificationShownRef.current) {
      notificationShownRef.current = true;
      showNotification({
        icon: faRepeat,
        text: "החלף מעסים ובדוק דופק",
        buttons: [
          { 
            text: "בוצע", 
            onClick: () => {
              setCountdownTime(20); // Reset timer to 30 seconds
              notificationShownRef.current = false;
            }
          }
        ],
        // audio: "/sounds/notification.mp3" // Optional: Add a sound for the notification
      });
    }
  }, [showNotification]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
        setCountdownTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            showTimerNotification();
            return 0;
          }
        });
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning, showTimerNotification]);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return [hours, minutes, seconds]
      .map(v => v < 10 ? "0" + v : v)
      .join(":");
  };

  const startCpr = () => {
    setIsRunning(true);
    notificationShownRef.current = false;
  };

  const endCpr = (reason: 'ROSC' | 'DEATH') => {
    setIsRunning(false);
    notificationShownRef.current = false;
    // Handle end of CPR (e.g., log the reason, show a summary, etc.)
    console.log(`CPR ended: ${reason}`);
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      direction: 'rtl',
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1);'
    }}>
      {/* Right: Clocks and Timers */}
      <div style={{ padding: '20px' }}>
        <div style={{ fontSize: '24px', marginBottom: '10px' }}>
          {formatTime(elapsedTime)}
        </div>
        <div style={{ fontSize: '20px', color: countdownTime === 0 ? 'red' : 'inherit' }}>
          {formatTime(countdownTime)}
        </div>
      </div>

      {/* Center: Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {!isRunning ? (
          <button
            onClick={startCpr}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: '#1FB5A3',
              color: 'white',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
            }}
          >
            התחל
          </button>
        ) : (
          <>
            <button
              onClick={() => endCpr('ROSC')}
              style={{
                width: '120px',
                height: '60px',
                backgroundColor: '#1FB5A3',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                marginBottom: '10px',
                cursor: 'pointer',
              }}
            >
              ROSC
            </button>
            <button
              onClick={() => endCpr('DEATH')}
              style={{
                width: '120px',
                height: '60px',
                backgroundColor: '#1FB5A3',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              DEATH
            </button>
          </>
        )}
      </div>

      {/* Left: Settings */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label className="switch">
            <input
              type="checkbox"
              checked={isSoundOn}
              onChange={() => setIsSoundOn(!isSoundOn)}
            />
            <span className="slider round"></span>
          </label>
          <FontAwesomeIcon icon={faVolumeLow} style={{ marginRight: '10px' }} />
        </div>
      </div>

      {/* Metronome */}
      <Metronome isPlaying={isRunning && isSoundOn} bpm={100} />

      <style>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #B9EDE7;
          transition: .4s;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
        }

        input:checked + .slider {
          background-color: #1FB5A3;
        }

        input:checked + .slider:before {
          transform: translateX(26px);
        }

        .slider.round {
          border-radius: 34px;
        }

        .slider.round:before {
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default CprManager;