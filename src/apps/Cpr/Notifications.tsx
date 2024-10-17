import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface NotificationButton {
  text: string;
  onClick: () => void;
}

interface NotificationProps {
  icon: IconDefinition;
  text: string;
  buttons: NotificationButton[];
  audio?: string;
  onDismiss: () => void;
  index: number;
}

const Notification: React.FC<NotificationProps> = ({ icon, text, buttons, audio, onDismiss, index }) => {
  useEffect(() => {
    if (audio) {
      const audioElement = new Audio(audio);
      audioElement.play();
    }
  }, [audio]);

  const notificationStyle: React.CSSProperties = {
    position: 'fixed',
    top: `calc(10dvh + ${index * (15 + 100)}px)`, // 15px gap between notifications
    left: '50%',
    transform: 'translateX(-50%)',
    width: '97dvw',
    maxWidth: '600px',
    backgroundColor: '#F77389',
    color: 'white',
    padding: '1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '0.5rem',
    direction: 'rtl',
    zIndex: 1000 - index // Ensure newer notifications appear on top
  };

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const iconTextStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
    gap: '0.5rem'
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#103C6E',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    border: 'none',
    cursor: 'pointer'
  };

  return (
    <div style={notificationStyle}>
      <div style={contentStyle}>
        <div style={iconTextStyle}>
          <FontAwesomeIcon icon={icon} style={{ fontSize: '1.5rem' }} />
          <span>{text}</span>
        </div>
        <button onClick={onDismiss} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faTimes} style={{ fontSize: '1.25rem' }} />
        </button>
      </div>
      <div style={buttonContainerStyle}>
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={() => {
              button.onClick();
              onDismiss();
            }}
            style={buttonStyle}
          >
            {button.text}
          </button>
        ))}
      </div>
    </div>
  );
};

interface NotificationManagerProps {
  children: React.ReactNode;
}

interface NotificationData {
  icon: IconDefinition;
  text: string;
  buttons: NotificationButton[];
  audio?: string;
}

export const NotificationContext = React.createContext<{
  showNotification: (props: NotificationData) => void;
} | undefined>(undefined);

export const NotificationProvider: React.FC<NotificationManagerProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<(NotificationData & { id: string })[]>([]);

  const showNotification = (props: NotificationData) => {
    const id = Date.now().toString(); // Simple unique id
    setNotifications(prev => [...prev, { ...props, id }]);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notifications.map((notification, index) => (
        <Notification
          key={notification.id}
          {...notification}
          onDismiss={() => dismissNotification(notification.id)}
          index={index}
        />
      ))}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = React.useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};