// // import React from 'react';
// // import { Link } from 'react-router-dom';

// // interface FooterProps {
// //   setPage: (
// //     page: 'CALCULATOR' | 'INSTRUCTIONS' | 'ANTIBIOTIC_TREATMENT'
// //   ) => void;
// // }

// // const Footer: React.FC<FooterProps> = ({ setPage }) => {
// //   return (
// //     <footer className="text-center text-white footer">
// //       <div className="footer-container">
// //         <Link
// //           to="/instructions"
// //           className="footer-button"
// //           onClick={() => setPage('INSTRUCTIONS')}
// //         >
// //           <div className="bottom-menu-color">
// //             <i className="fa-solid fa-chalkboard-user"></i>
// //           </div>
// //           <div className="text">הוראות שימוש</div>
// //         </Link>
// //         <Link
// //           to="/antibiotic-treatment"
// //           className="footer-button"
// //           onClick={() => setPage('ANTIBIOTIC_TREATMENT')}
// //         >
// //           <div className="bottom-menu-color">
// //             <i className="fa-solid fa-thermometer"></i>
// //           </div>
// //           <div className="text">טיפול אנטיביוטי</div>
// //         </Link>
// //       </div>
// //     </footer>
// //   );
// // };

// // export default Footer;

// import React from 'react';

// type PageType = 'CALCULATOR' | 'INSTRUCTIONS' | 'ANTIBIOTIC_TREATMENT';

// interface FooterProps {
//   setPage: (page: PageType) => void;
// }

// const Footer: React.FC<FooterProps> = ({ setPage }) => {
//   return (
//     <footer className="text-center text-white footer">
//       <div className="footer-container">
//         <button
//           className="footer-button"
//           onClick={() => setPage('INSTRUCTIONS')}
//         >
//           <div className="bottom-menu-color">
//             <i className="fa-solid fa-chalkboard-user"></i>
//           </div>
//           <div className="text">הוראות שימוש</div>
//         </button>
//         <button
//           className="footer-button"
//           onClick={() => setPage('ANTIBIOTIC_TREATMENT')}
//         >
//           <div className="bottom-menu-color">
//             <i className="fa-solid fa-thermometer"></i>
//           </div>
//           <div className="text">טיפול אנטיביוטי</div>
//         </button>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React, { useState } from 'react';
import styled from 'styled-components';

interface FooterProps {
  type: 'informative' | 'interactive';
  onSearch?: (searchText: string) => void;
  onOpenMeasures?: () => void;
  onOpenHelperTables?: () => void;
}

const FooterContainer = styled.footer<{ isInteractive: boolean }>`
  text-align: center;
  padding: ${props => props.isInteractive ? '10px 0' : '5px 0 20px 20px'};
  background-color: ${props => props.isInteractive ? '#406286' : 'transparent'};
  text-align: center;
  padding: 5px 0px 20px 20px;
`;

const InteractiveContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const FooterButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;

  i {
    font-size: 24px;
    margin-bottom: 5px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 80%;
  padding: 10px;
  border: none;
  border-radius: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  margin-left: 10px;
  cursor: pointer;
`;

const Footer: React.FC<FooterProps> = ({ type, onSearch, onOpenMeasures, onOpenHelperTables }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleSearchOpen = () => setIsSearchOpen(true);
  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchText('');
  };

  const handleSearchSubmit = () => {
    if (onSearch) onSearch(searchText);
  };

  if (type === 'informative') {
    return (
      <FooterContainer isInteractive={false}>
        <div>
          ליצירת קשר: <a href="mailto:mashlom.me@gmail.com">mashlom.me@gmail.com</a><br />
          לקריאת תנאי השימוש <a href="https://drive.google.com/file/d/1x8SNHDi9QbS-JYTWLYx7Yz7G68KlhWfM/view?usp=sharing" target="_blank" rel="noopener noreferrer">לחץ כאן</a>
        </div>
      </FooterContainer>
    );
  }

  return (
    <FooterContainer isInteractive={true}>
      {isSearchOpen ? (
        <SearchContainer>
          <SearchInput
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
            placeholder="חיפוש לפי כל הערכים.."
          />
          <CloseButton onClick={handleSearchClose}>×</CloseButton>
        </SearchContainer>
      ) : (
        <InteractiveContent>
          <FooterButton onClick={handleSearchOpen}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <div>חפש</div>
          </FooterButton>
          <FooterButton onClick={onOpenMeasures}>
            <i className="fa-solid fa-syringe"></i>
            <div>מדדים</div>
          </FooterButton>
          <FooterButton onClick={onOpenHelperTables}>
            <i className="fa-solid fa-user-doctor"></i>
            <div>טבלאות עזר</div>
          </FooterButton>
        </InteractiveContent>
      )}
    </FooterContainer>
  );
};

export default Footer;