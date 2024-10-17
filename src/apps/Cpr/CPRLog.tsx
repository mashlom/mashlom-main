import React, { useState, useEffect } from 'react';

interface PatientDetails {
  name: string;
  age: number;
  [key: string]: any; // Allow for additional fields
}

interface Action {
  type: 'patientDetails' | 'action';
  timestamp: string;
  details?: PatientDetails;
  action?: string;
}

interface CPRLog {
  patientId: string;
  actions: Action[];
}

// Custom hook to manage CPR logs
const useCPRLogs = () => {
  const [logs, setLogs] = useState<CPRLog[]>([]);

  useEffect(() => {
    // Load logs from localStorage on component mount
    const storedLogs = localStorage.getItem('cprLogs');
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
  }, []);

  useEffect(() => {
    // Save logs to localStorage whenever they change
    localStorage.setItem('cprLogs', JSON.stringify(logs));
  }, [logs]);

  const addLog = (patientId: string, log: Omit<Action, 'timestamp'>) => {
    setLogs(prevLogs => {
      const existingLogIndex = prevLogs.findIndex(l => l.patientId === patientId);
      const timestamp = new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' });
      const newLog: Action = { ...log, timestamp };

      if (existingLogIndex !== -1) {
        // Update existing log
        const updatedLogs = [...prevLogs];
        updatedLogs[existingLogIndex] = {
          ...updatedLogs[existingLogIndex],
          actions: [...updatedLogs[existingLogIndex].actions, newLog]
        };
        return updatedLogs.slice(-5); // Keep only the last 5 logs (LRU)
      } else {
        // Add new log
        return [...prevLogs, { patientId, actions: [newLog] }].slice(-5); // Keep only the last 5 logs (LRU)
      }
    });
  };

  return { logs, addLog };
};

const CPRLogComponent: React.FC = () => {
  const { logs, addLog } = useCPRLogs();

  const setPatientDetails = (patientId: string, details: PatientDetails) => {
    addLog(patientId, { type: 'patientDetails', details });
  };

  const addAction = (patientId: string, action: string) => {
    addLog(patientId, { type: 'action', action });
  };
  console.log(addAction, setPatientDetails);

  return (
    <div className="cpr-log-component">
      <h2 className="text-xl font-bold mb-4">CPR Log and Audit</h2>
      {logs.map((log, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          <h3 className="text-lg font-semibold">Patient ID: {log.patientId}</h3>
          <ul className="list-disc pl-5">
            {log.actions.map((action, actionIndex) => (
              <li key={actionIndex} className="mb-2">
                <span className="font-medium">{action.timestamp}</span>:{' '}
                {action.type === 'patientDetails' ? (
                  <span>Patient Details Updated: {JSON.stringify(action.details)}</span>
                ) : (
                  <span>Action: {action.action}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Note: This component stores up to 5 CPR processes in local storage.
        </p>
      </div>
    </div>
  );
};

export default CPRLogComponent;