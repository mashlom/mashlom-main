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