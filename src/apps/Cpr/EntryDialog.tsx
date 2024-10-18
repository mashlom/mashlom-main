import React, { useState } from 'react';
import { LogEntry } from './CPRLog';

interface EntryDialogProps {
  entry?: LogEntry;
  onSave: (entry: Omit<LogEntry, 'id'>) => void;
  onClose: () => void;
}

const EntryDialog: React.FC<EntryDialogProps> = ({ entry, onSave, onClose }) => {
  const [timestamp, setTimestamp] = useState(entry?.timestamp || new Date().toISOString());
  const [text, setText] = useState(entry?.text || '');
  const [type, setType] = useState<LogEntry['type']>(entry?.type || 'action');
  const [isImportant, setIsImportant] = useState(entry?.isImportant || false);

  const handleSave = () => {
    onSave({ timestamp, text, type, isImportant });
    onClose();
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h3>{entry ? 'ערוך רשומה' : 'הוסף רשומה חדשה'}</h3>
        <input
          type="datetime-local"
          value={timestamp.slice(0, 16)} // Format for datetime-local input
          onChange={(e) => setTimestamp(new Date(e.target.value).toISOString())}
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="תוכן הרשומה"
        />
        <select 
          value={type} 
          onChange={(e) => setType(e.target.value as LogEntry['type'])}
        >
          <option value="patientDetails">פרטי המטופל</option>
          <option value="medication">תרופות שניתנו</option>
          <option value="action">פעולות שנעשו</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={isImportant}
            onChange={(e) => setIsImportant(e.target.checked)}
          />
          סמן כחשוב
        </label>
        <button onClick={handleSave}>שמור</button>
        <button onClick={onClose}>ביטול</button>
      </div>
      <style>{`
        .dialog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .dialog {
          background-color: white;
          padding: 20px;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
        }
        input, textarea, select {
          margin-bottom: 10px;
        }
        button {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default EntryDialog;