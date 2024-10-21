import React, { useState, useEffect } from 'react';
import './ABCDEFProcedures.css';

const procedures = [
  {
    letter: 'A',
    title: 'AIRWAY',
    content: [
      'נתיב אוויר פתוח?',
      'דם/הפרשות?',
      'Suction',
      'שברי שיניים, מלפורמציה טראומטית'
    ]
  },
  {
    letter: 'B',
    title: 'Breathing',
    content: [
      'מאמץ נשמתי',
      'התפשטות בית חזה.',
      'האזנה'
    ]
  },
  {
    letter: 'C',
    title: 'Circulation',
    content: [
      'מילוי קפילרי.',
      'דופק מרכזי ופריפרי',
      'בטן תפוחה',
      'עצירת דימומים.'
    ]
  },
  {
    letter: 'D',
    title: 'Disability',
    content: [
      'מצב הכרה- AVPU/GCS',
      'אישונים',
      'תנועת 4 גפיים',
      'DEX'
    ]
  },
  {
    letter: 'E',
    title: 'Environment',
    content: [
      'הפשטה והיפוך.',
      'חום גוף.'
    ]
  },
  {
    letter: 'F',
    title: 'Family',
    content: [
      'אנמנזה של המשפחה.'
    ]
  }
];

const ABCDEFProcedures: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isHighlighted = (letter: string, index: number) => {
    if (isMobile) {
      return index % 2 === 0;
    } else {
      return ['A', 'D', 'E'].includes(letter);
    }
  };

  return (
    <div className="abcdef-grid">
      {procedures.map((proc, index) => (
        <div 
          key={proc.letter} 
          className={`card ${isHighlighted(proc.letter, index) ? 'highlighted' : 'white'}`}
        >
          <div className="card-header">
            <h3>
              <span className="letter">{proc.letter}</span>{proc.title.slice(1)}
            </h3>
          </div>
          <div className="card-content">
            <ul>
              {proc.content.map((item, idx) => (
                <li key={idx} className={item === 'DEX' || item === 'חום גוף.' ? 'bold' : ''}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ABCDEFProcedures;