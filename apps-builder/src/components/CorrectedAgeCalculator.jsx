// import React, { useState } from 'react';
// import { differenceInDays } from 'date-fns';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import './CorrectedAgeCalculator.scss';

// const FULL_TERM_WEEKS = 40;
// const DAYS_IN_WEEK = 7;

// function formatCommas(input) {
//   // Trim the input string
//   let trimmedString = input.trim();

//   // Remove the last comma if it exists
//   if (trimmedString.endsWith(',')) {
//     trimmedString = trimmedString.slice(0, -1);
//   }

//   // Replace the last occurrence of ", " with "ו-"
//   const lastCommaSpaceIndex = trimmedString.lastIndexOf(', ');
//   if (lastCommaSpaceIndex !== -1) {
//     trimmedString =
//       trimmedString.slice(0, lastCommaSpaceIndex) +
//       ' ו-' +
//       trimmedString.slice(lastCommaSpaceIndex + 2);
//   }

//   return trimmedString.replace(/ו-יום/g, 'ויום').replace(/ו-שבוע/g, 'ושבוע');
// }

// export default function CorrectedAgeCalculator({
//   setRecommendedCheckDate,
//   setRecommendedSupportWorkshopDate,
// }) {
//   const [birthDate, setBirthDate] = useState(null);
//   const [gestationWeeks, setGestationWeeks] = useState('');
//   const [gestationDays, setGestationDays] = useState('');
//   const [ageToShow, setAgeToShow] = useState('');
//   const [isCalculated, setIsCalculated] = useState(false);

//   const calculateAge = (birthDate, gestationWeeks, gestationDays) => {
//     if (!birthDate || !gestationWeeks) return;
//     if (!gestationDays) {
//       gestationDays = 0;
//     }

//     // Check if the baby is not premature
//     if (gestationWeeks >= 37) {
//       setAgeToShow('התינוק אינו פג, ניתן להשתמש בגיל הכרונולוגי');
//       setIsCalculated(true);
//       setDate(gestationWeeks);
//       return;
//     }

//     const today = new Date();
//     const birth = new Date(birthDate);

//     // Calculate the total number of days premature
//     const totalGestationDays = gestationWeeks * DAYS_IN_WEEK + gestationDays;
//     const daysPremature = FULL_TERM_WEEKS * DAYS_IN_WEEK - totalGestationDays;

//     // Calculate the chronological age in days
//     const chronologicalAgeDays = differenceInDays(today, birth);

//     // Calculate the corrected age in days
//     const correctedAgeDays = chronologicalAgeDays - daysPremature;

//     if (correctedAgeDays <= 0) {
//       // Calculate current pregnancy week and days
//       const totalDaysPregnant = totalGestationDays + chronologicalAgeDays;
//       const currentWeeks = Math.floor(totalDaysPregnant / DAYS_IN_WEEK);
//       const currentDays = totalDaysPregnant % DAYS_IN_WEEK;

//       setAgeToShow(`שבוע ${currentDays}+${currentWeeks} להריון`);
//       setIsCalculated(true);
//       return;
//     }

//     // Convert corrected age days to months, weeks, and days
//     const totalMonths = Math.floor(correctedAgeDays / 30);
//     const remainingDays = correctedAgeDays % 30;
//     const weeks = Math.floor(remainingDays / 7);
//     const days = remainingDays % 7;

//     let ageString = '';

//     if (totalMonths < 6) {
//       // Less than 6 months: use only weeks and days
//       const totalWeeks = Math.floor(correctedAgeDays / 7);
//       const remainingDays = correctedAgeDays % 7;

//       if (totalWeeks > 0)
//         ageString += totalWeeks === 1 ? 'שבוע אחד' : totalWeeks + ' שבועות';
//       if (remainingDays > 0) {
//         if (totalWeeks > 0) ageString += ', ';
//         ageString += remainingDays === 1 ? 'יום אחד' : remainingDays + ' ימים';
//       }
//     } else {
//       // 6 months or more: use months, weeks, and days
//       if (totalMonths > 0)
//         ageString += totalMonths === 1 ? 'חודש אחד' : totalMonths + ' חודשים';
//       if (weeks > 0) {
//         if (totalMonths > 0) ageString += ', ';
//         ageString += weeks === 1 ? 'שבוע אחד' : weeks + ' שבועות';
//       }
//       if (days > 0) {
//         if (totalMonths > 0 || weeks > 0) ageString += ', ';
//         ageString += days === 1 ? 'יום אחד' : days + ' ימים';
//       }
//     }

//     if (!ageString) ageString = '0 ימים';

//     ageString = formatCommas(ageString);

//     setAgeToShow(ageString);
//     setIsCalculated(true);
//   };

//   return (
//     <div className="corrected-age-calculator">
//       <h1>חישוב גיל מתוקן</h1>
//       <div className="form">
//         <div className="form-row">
//           <label htmlFor="birthDate">תינוקכם נולד בתאריך:</label>
//           <DatePicker
//             selected={birthDate}
//             onChange={(date) => setBirthDate(date)}
//             dateFormat="dd/MM/yyyy"
//             locale="he"
//             placeholderText="dd/mm/yyyy"
//             className="rtl-datepicker"
//             maxDate={new Date()}
//           />
//         </div>
//         <div className="form-row gestation-input">
//           <label>בשבוע הריון:</label>
//           <div className="gestation-inputs">
//             <input
//               id="gestation-week"
//               type="number"
//               min={20}
//               max={44}
//               value={gestationWeeks}
//               onChange={(e) => {
//                 const value = parseInt(e.target.value);
//                 if (!isNaN(value) && value >= 0 && value <= 44) {
//                   setGestationWeeks(value);
//                 }
//               }}
//               placeholder="שבוע לידה"
//             />
//             <input
//               id="gestation-days"
//               type="number"
//               min={0}
//               max={6}
//               value={gestationDays}
//               onChange={(e) => {
//                 const value = parseInt(e.target.value);
//                 if (!isNaN(value) && value >= 0 && value <= 6) {
//                   setGestationDays(value);
//                 }
//               }}
//               placeholder="+ימים"
//             />
//           </div>
//         </div>
//         <button
//           onClick={() => {
//             calculateAge(birthDate, gestationWeeks, gestationDays);
//           }}
//         >
//           חשב גיל מתוקן
//         </button>
//         {isCalculated && (
//           <div>
//             <p>
//               <b>גיל מתוקן: {ageToShow}</b>
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { format, addDays, differenceInDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CorrectedAgeCalculator.scss';

const FULL_TERM_WEEKS = 40;
const DAYS_IN_WEEK = 7;

function formatCommas(input) {
  // Trim the input string
  let trimmedString = input.trim();

  // Remove the last comma if it exists
  if (trimmedString.endsWith(',')) {
    trimmedString = trimmedString.slice(0, -1);
  }

  // Replace the last occurrence of ", " with "ו-"
  const lastCommaSpaceIndex = trimmedString.lastIndexOf(', ');
  if (lastCommaSpaceIndex !== -1) {
    trimmedString =
      trimmedString.slice(0, lastCommaSpaceIndex) +
      ' ו-' +
      trimmedString.slice(lastCommaSpaceIndex + 2);
  }

  return trimmedString.replace(/ו-יום/g, 'ויום').replace(/ו-שבוע/g, 'ושבוע');
}

export default function CorrectedAgeCalculator({
  setRecommendedCheckDate,
  setRecommendedSupportWorkshopDate,
}) {
  const [birthDate, setBirthDate] = useState(null);
  const [gestationWeeks, setGestationWeeks] = useState('');
  const [gestationDays, setGestationDays] = useState('');
  const [ageToShow, setAgeToShow] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);

  const calculateAge = (birthDate, gestationWeeks, gestationDays) => {
    if (!birthDate || !gestationWeeks) return;
    if (!gestationDays) {
      gestationDays = 0;
    }

    // Check if the baby is not premature
    if (gestationWeeks >= 37) {
      setAgeToShow('התינוק אינו פג, ניתן להשתמש בגיל הכרונולוגי');
      setIsCalculated(true);
      return;
    }

    const today = new Date();
    const birth = new Date(birthDate);

    // Calculate the total number of days premature
    const totalGestationDays = gestationWeeks * DAYS_IN_WEEK + gestationDays;
    const daysPremature = FULL_TERM_WEEKS * DAYS_IN_WEEK - totalGestationDays;

    // Calculate the chronological age in days
    const chronologicalAgeDays = differenceInDays(today, birth);

    // Calculate the corrected age in days
    const correctedAgeDays = chronologicalAgeDays - daysPremature;

    if (correctedAgeDays <= 0) {
      // Calculate current pregnancy week and days
      const totalDaysPregnant = totalGestationDays + chronologicalAgeDays;
      const currentWeeks = Math.floor(totalDaysPregnant / DAYS_IN_WEEK);
      const currentDays = totalDaysPregnant % DAYS_IN_WEEK;

      setAgeToShow(`שבוע ${currentDays}+${currentWeeks} להריון`);
      setIsCalculated(true);
      return;
    }

    // Convert corrected age days to months, weeks, and days
    const totalMonths = Math.floor(correctedAgeDays / 30);
    const remainingDays = correctedAgeDays % 30;
    const weeks = Math.floor(remainingDays / 7);
    const days = remainingDays % 7;

    let ageString = '';

    if (totalMonths < 6) {
      // Less than 6 months: use only weeks and days
      const totalWeeks = Math.floor(correctedAgeDays / 7);
      const remainingDays = correctedAgeDays % 7;

      if (totalWeeks > 0)
        ageString += totalWeeks === 1 ? 'שבוע אחד' : totalWeeks + ' שבועות';
      if (remainingDays > 0) {
        if (totalWeeks > 0) ageString += ', ';
        ageString += remainingDays === 1 ? 'יום אחד' : remainingDays + ' ימים';
      }
    } else {
      // 6 months or more: use months, weeks, and days
      if (totalMonths > 0)
        ageString += totalMonths === 1 ? 'חודש אחד' : totalMonths + ' חודשים';
      if (weeks > 0) {
        if (totalMonths > 0) ageString += ', ';
        ageString += weeks === 1 ? 'שבוע אחד' : weeks + ' שבועות';
      }
      if (days > 0) {
        if (totalMonths > 0 || weeks > 0) ageString += ', ';
        ageString += days === 1 ? 'יום אחד' : days + ' ימים';
      }
    }

    if (!ageString) ageString = '0 ימים';

    ageString = formatCommas(ageString);

    setAgeToShow(ageString);
    setIsCalculated(true);
    // const x = 100;
    // setRecommendedCheckDate(x);
    // setRecommendedSupportWorkshopDate (x);
    // format(date, 'dd/M/yyyy');

    const formatDate = (dateString) => {
      // Convert the string to a Date object
      const date = new Date(dateString);
      // Format the date using date-fns
      return format(date, 'dd/MM/yyyy');
    };

    const d = addDays(
      birthDate,
      (FULL_TERM_WEEKS - gestationWeeks) * 7 - gestationDays + 42
    );
    const d2 = addDays(
      birthDate,
      (FULL_TERM_WEEKS - gestationWeeks) * 7 - gestationDays + 70
    );

    // const formattedDate = formatDate(originalDate);

    setRecommendedCheckDate(formatDate(d));
    setRecommendedSupportWorkshopDate(formatDate(d2));
  };

  return (
    <div className="corrected-age-calculator">
      <h1>חישוב גיל מתוקן</h1>
      <div className="form">
        <div className="form-row">
          <label htmlFor="birthDate">תינוקכם נולד בתאריך:</label>
          <DatePicker
            selected={birthDate}
            onChange={(date) => setBirthDate(date)}
            dateFormat="dd/MM/yyyy"
            locale="he"
            placeholderText="dd/mm/yyyy"
            className="rtl-datepicker"
            maxDate={new Date()}
          />
        </div>
        <div className="form-row gestation-input">
          <label htmlFor="gestation-week">בשבוע הריון:</label>
          <div className="gestation-inputs">
            <input
              id="gestation-week"
              type="number"
              min={20}
              max={44}
              value={gestationWeeks}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && value >= 0 && value <= 44) {
                  setGestationWeeks(value);
                }
              }}
              placeholder="שבוע לידה"
            />
            <input
              id="gestation-days"
              type="number"
              min={0}
              max={6}
              value={gestationDays}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && value >= 0 && value <= 6) {
                  setGestationDays(value);
                }
              }}
              placeholder="+ימים"
            />
          </div>
        </div>
        <button
          onClick={() => {
            calculateAge(birthDate, gestationWeeks, gestationDays);
          }}
        >
          חשב גיל מתוקן
        </button>
        {isCalculated && (
          <div>
            <p>
              <b>גיל מתוקן: {ageToShow}</b>
            </p>
          </div>
        )}
      </div>
      <div className="recommended-dates">
        <p>
          {/* תאריך מומלץ לקביעת תור למרפאת פגים: {RecommendedCheckDate} */}
        </p>
        <p>
          {/* תאריך מומלץ לקביעת תור לסדנת ליווי התפתחותי: {RecommendedSupportWorkshopDate} */}
        </p>
      </div>
    </div>
  );
}
