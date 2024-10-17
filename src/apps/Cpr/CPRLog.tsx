import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import EntryDialog from './EntryDialog';
import './CPRLog.css';

export interface LogEntry {
  id: string;
  timestamp: string;
  text: string;
  type: 'patientDetails' | 'medication' | 'action';
}

export interface CPRLog {
  patientId: string;
  entries: LogEntry[];
}

interface CPRLogContextType {
  log: CPRLog;
  addEntry: (entry: Omit<LogEntry, 'id'>) => void;
  updateEntry: (id: string, updatedEntry: Partial<LogEntry>) => void;
  deleteEntry: (id: string) => void;
}

const CPRLogContext = createContext<CPRLogContextType | undefined>(undefined);

export const CPRLogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [log, setLog] = useState<CPRLog>({ patientId: '', entries: [] });
  useEffect(() => {
    const storedLog = localStorage.getItem('cprLog');
    if (storedLog) {
      setLog(JSON.parse(storedLog));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cprLog', JSON.stringify(log));
  }, [log]);

  const addEntry = (entry: Omit<LogEntry, 'id'>) => {
    const newEntry = { ...entry, id: Date.now().toString() };
    setLog(prevLog => ({
      ...prevLog,
      entries: [...prevLog.entries, newEntry]
    }));
  };

  const updateEntry = (id: string, updatedEntry: Partial<LogEntry>) => {
    setLog(prevLog => ({
      ...prevLog,
      entries: prevLog.entries.map(entry =>
        entry.id === id ? { ...entry, ...updatedEntry } : entry
      )
    }));
  };

  const deleteEntry = (id: string) => {
    setLog(prevLog => ({
      ...prevLog,
      entries: prevLog.entries.filter(entry => entry.id !== id)
    }));
  };

  return (
    <CPRLogContext.Provider value={{ log, addEntry, updateEntry, deleteEntry }}>
      {children}
    </CPRLogContext.Provider>
  );
};

export const useCPRLog = () => {
  const context = useContext(CPRLogContext);
  if (context === undefined) {
    throw new Error('useCPRLog must be used within a CPRLogProvider');
  }
  return context;
};

const CPRLogComponent: React.FC = () => {
  const { log, addEntry, updateEntry, deleteEntry } = useCPRLog();
  const [dialogEntry, setDialogEntry] = useState<LogEntry | null>(null);

  const renderEntries = (type: LogEntry['type']) => (
    <ul>
      {log.entries
        .filter(entry => entry.type === type)
        .map(entry => (
          <li key={entry.id}>
            {entry.timestamp && <span>{new Date(entry.timestamp).toLocaleString('he-IL')}: </span>}
            <span>{entry.text}</span>
            <button onClick={() => setDialogEntry(entry)}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button onClick={() => deleteEntry(entry.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        ))}
    </ul>
  );

  return (
    <div className="cpr-log-component">
      <section>
        <h3 className="section-header">פרטי המטופל</h3>
        {renderEntries('patientDetails')}
        <button onClick={() => setDialogEntry({ id: '', timestamp: '', text: '', type: 'patientDetails' })}>
          <FontAwesomeIcon icon={faPlus} /> הוסף
        </button>
      </section>

      <section>
        <h3 className="section-header">תרופות שניתנו</h3>
        {renderEntries('medication')}
        <button onClick={() => setDialogEntry({ id: '', timestamp: '', text: '', type: 'medication' })}>
          <FontAwesomeIcon icon={faPlus} /> הוסף
        </button>
      </section>

      <section>
        <h3 className="section-header">פעולות שנעשו</h3>
        {renderEntries('action')}
        <button onClick={() => setDialogEntry({ id: '', timestamp: '', text: '', type: 'action' })}>
          <FontAwesomeIcon icon={faPlus} /> הוסף
        </button>
      </section>

      {dialogEntry && (
        <EntryDialog
          entry={dialogEntry.id ? dialogEntry : undefined}
          onSave={(entry) => {
            if (dialogEntry.id) {
              updateEntry(dialogEntry.id, entry);
            } else {
              addEntry(entry);
            }
            setDialogEntry(null);
          }}
          onClose={() => setDialogEntry(null)}
        />
      )}
    </div>
  );
};

export default CPRLogComponent;