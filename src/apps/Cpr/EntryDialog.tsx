import React, { useState } from 'react';
import { LogEntry } from './CPRLog';
import Modal, { ModalDirectionOptions } from '../../components/Modal';

interface EntryDialogProps {
  entry?: LogEntry;
  type: LogEntry['type'];
  onSave: (entry: Omit<LogEntry, 'id' | 'type'>) => void;
  onClose: () => void;
}

const EntryDialog: React.FC<EntryDialogProps> = ({ entry, type, onSave, onClose }) => {
  const [timestamp, setTimestamp] = useState(entry?.timestamp || new Date().toISOString());
  const [text, setText] = useState(entry?.text || '');

  const handleSave = () => {
    onSave({
      timestamp,
      text,
      isImportant: entry ? entry.isImportant : false
    });
  };

  const getTitle = () => {
    const action = entry ? 'עריכת' : 'הוספת';
    switch (type) {
      case 'medication':
        return `${action} תרופה`;
      case 'patientDetails':
        return `${action} מידע על המטופל`;
      case 'action':
        return `${action} פעולה שנעשתה`;
    }
  };

  return (
    <Modal
      isOpen={true}
      setIsOpen={() => onClose()}
      title={getTitle()}
      primaryButton={{
        text: 'שמור',
        onClick: handleSave
      }}
      secondaryButton={{
        text: 'ביטול',
        onClick: onClose
      }}
      direction={ModalDirectionOptions.RTL}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>
          זמן:
          <input
            type="datetime-local"
            value={timestamp.slice(0, 16)} // Format for datetime-local input
            onChange={(e) => setTimestamp(new Date(e.target.value).toISOString())}
            style={{ width: '100%', padding: '5px' }}
          />
        </label>
        <label>
          תוכן:
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', minHeight: '100px', padding: '5px' }}
          />
        </label>
      </div>
    </Modal>
  );
};

export default EntryDialog;