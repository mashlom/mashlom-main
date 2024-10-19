import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeLow, faRepeat } from '@fortawesome/free-solid-svg-icons';
import Metronome from './Metronome';
import { useNotification } from './Notifications';
import { useCPRLog } from './CPRLog';
import Modal, { ModalDirectionOptions } from '../../components/Modal';

interface CprManagerProps {
  // Add any props if needed
}

const CprManager: React.FC<CprManagerProps> = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [countdownTime, setCountdownTime] = useState(20);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [showDeathModal, setShowDeathModal] = useState(false);
  const [deathTime, setDeathTime] = useState('');
  const notificationShownRef = useRef(false);
  const { showNotification } = useNotification();
  const { addEntry } = useCPRLog();

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
              setCountdownTime(20);
              notificationShownRef.current = false;
              addEntry({
                timestamp: new Date().toISOString(),
                text: "הוחלפו המעסים",
                type: 'action',
                isImportant: false
              });
            }
          }
        ],
      });
    }
  }, [showNotification, addEntry]);

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
    addEntry({
      timestamp: new Date().toISOString(),
      text: "החייאה התחילה",
      type: 'action',
      isImportant: true
    });
  };
  
  const endCpr = (reason: 'ROSC' | 'DEATH') => {
    setIsRunning(false);
    notificationShownRef.current = false;
    if (reason === 'ROSC') {
      addEntry({
        timestamp: new Date().toISOString(),
        text: "ההחיאה הסתיימה בהצלחה",
        type: 'action',
        isImportant: true
      });
    } else {
      addEntry({
        timestamp: new Date().toISOString(),
        text: "נקבע מות המטופל",
        type: 'action',
        isImportant: true
      });
    }
    console.log(`CPR ended: ${reason}`);
  };

  const handleDeathButtonClick = () => {
    const currentTime = new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setDeathTime(currentTime);
    setShowDeathModal(true);
  };

  const handleConfirmDeath = () => {
    setIsRunning(false);
    notificationShownRef.current = false;
    addEntry({
      timestamp: new Date().toISOString(),
      text: "נקבע מות המטופל",
      type: 'action',
      isImportant: true
    });
    showNotification({
      icon: faRepeat,
      text: `נקבע מות המטופל לשעה ${deathTime}. נא לא לשכוח ECG ו- POCUS`,
      buttons: [{ text: "הבנתי", onClick: () => {} }],
    });
    setShowDeathModal(false);
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      direction: 'rtl',
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
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
              onClick={handleDeathButtonClick}
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

      <Modal
        isOpen={showDeathModal}
        setIsOpen={setShowDeathModal}
        title="אישור קביעת מוות"
        secondaryButton={{
          text: "ביטול",
          onClick: () => setShowDeathModal(false),
        }}
        primaryButton={{
          text: "אישור",
          onClick: handleConfirmDeath,
        }}
        direction={ModalDirectionOptions.RTL}
      >
        <p>שעת המוות נקבעה ל {deathTime}</p>
      </Modal>

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