// import React from 'react';
// import Layout from '@components/Layout';
// import Seo from '@components/Seo';
// import './preparation.scss';

// export default function PreparationPage() {
  //   return (
    //     <Layout includeCover={false}>
    //       <section>
    //         <div className="best-regards-container">
    //           <p className="text-center">
    //             <b>text8</b>
    //           </p>
    //           <p className="text-center">
    //             <b>text9</b>
    //           </p>
    //         </div>
    //       </section>
    //     </Layout>
    //   );
    // }
    
    
    import React, { useState } from 'react';
    import Layout from '@components/Layout';
    import Seo from '@components/Seo';
    import CorrectedAgeCalculator from '@components/CorrectedAgeCalculator';
    import { Link } from 'gatsby';
    // import './prematurity.scss';
    import './preparation.scss';

export default function CalcAndGraph() {
    const [recommendedCheckDate, setRecommendedCheckDate]=useState(null);
    const [recommendedSupportWorkshopDate, setRecommendedSupportWorkshopDate]=useState(null);
  return (
    <Layout coverTitle="בדרך הביתה">
      <div className="page-container">
        <div className="main-content">
          <div className="sub-title">
            תאריכים לקביעת תורות עתידיים וגרפי התפתחות
          </div>
          <p>
            מחשבון גיל מתוקן
          </p>
          <CorrectedAgeCalculator setRecommendedCheckDate={setRecommendedCheckDate} setRecommendedSupportWorkshopDate={setRecommendedSupportWorkshopDate} />
          <div className="recommended-dates">
          <p>
            תאריך מומלץ לקביעת תור למרפאת פגים: {recommendedCheckDate}
          </p>
          <p>
            תאריך מומלץ לקביעת תור לסדנת ליווי התפתחותי: {recommendedSupportWorkshopDate}
          </p>
          </div>
          
          <p>
            גרפי התפתחות
          </p>
          <div className="back-to-home-container">
            <Link to="/prematurity" className="back-to-home-button">
              חזרה לדף הבית
            </Link>
            <Link to="./page2" className="back-to-home-button">
              go to page2
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const Head = () => (
  <Seo title="מחשבון גיל מתוקן וגרפי התפתחות" />
);
