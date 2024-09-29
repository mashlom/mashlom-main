import React, { useState, useEffect } from 'react';
import Modal from './Modal'; // Adjust the import path as needed
import { ButtonAlignmentOptions, ModalDirectionOptions } from './Modal'; // Import these if they're not in the same file

interface HospitalConfig {
  logo: string;
  hebrewName: string;
}

interface TermsOfServiceProps {
  hospitalConfig: HospitalConfig;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ hospitalConfig }) => {
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    const termsSignedKey = 'mashlom.termsSigned';
    const termsVersion = Date.parse('2024-07-14');
    const termsSigned = localStorage.getItem(termsSignedKey);

    if (!termsSigned || parseInt(termsSigned) < termsVersion) {
      setShowTerms(true);
    }
  }, []);

  const acceptTerms = () => {
    localStorage.setItem('mashlom.termsSigned', Date.now().toString());
    setShowTerms(false);
  };

  const perHospitalPhrasing = () => {
    if (!hospitalConfig.hebrewName) {
      return '';
    }
    return `בבית החולים ${hospitalConfig.hebrewName}`;
  };

  return (
    <Modal
      isOpen={showTerms}
      isHeaderHidden
      setIsOpen={setShowTerms}
      primaryButton={{
        text: 'קראתי את תנאי השימוש ואני מסכים להם',
        onClick: acceptTerms,
      }}
      isDismissedOnOutsideClick={false}
      buttonAlignment={ButtonAlignmentOptions.CENTER}
      direction={ModalDirectionOptions.RTL}
    >
      <p>
        בשימושך באתר אתה מצהיר כי הנך איש צוות רפואי {perHospitalPhrasing()},
        והנך מבין כי האתר מיועד לשימוש תומך החלטה בלבד ואינו מהווה תחליף לשיקול
        דעת הרופא.ה המטפל.ת. השימוש באתר באחריות המשתמש בלבד.
        <br />
        <a
          href="https://drive.google.com/file/d/1x8SNHDi9QbS-JYTWLYx7Yz7G68KlhWfM/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          תנאי השימוש המלאים
        </a>
      </p>
    </Modal>
  );
};

export default TermsOfService;
