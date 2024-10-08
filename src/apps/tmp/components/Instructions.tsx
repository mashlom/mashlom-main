import React from 'react';

export const Instructions: React.FC = () => {
  return (
    <div className="instructions-container">
      <h2>הוראות שימוש</h2>
      <ol>
        <li>הזן את חום האם המקסימלי במהלך הלידה.</li>
        <li>הכנס את משך ההריון בשבועות וימים.</li>
        <li>ציין את משך הזמן מפקיעת הקרומים ועד הלידה בשעות.</li>
        <li>בחר את סטטוס ה-GBS של האם.</li>
        <li>בחר את סוג הטיפול האנטיביוטי שניתן במהלך הלידה, אם ניתן.</li>
        <li>המחשבון יציג את הסיכון לאלח דם מוקדם ואת ההמלצות הקליניות בהתאם למצב התינוק.</li>
      </ol>
      <p>שים לב: מחשבון זה הוא כלי עזר בלבד ואינו מחליף שיקול דעת רפואי.</p>
    </div>
  );
};