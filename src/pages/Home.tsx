import React from 'react';
import Layout from '../components/Layout';
import ContactInfo from '../components/ContactInfo';
import Logo from '../components/Logo';
import TermsOfService from '../components/TermsOfService';

const HomePage: React.FC = () => {

  const hospitalConfig = {
    "logo": "/apps/assets/assuta/logo.png",
    "hebrewName": "אסותא אשדוד"
  }
  return (
    <Layout
      seo={{
        title: 'מה שלומי - כלי עזר יום יומיים לרופאים',
        description: '',
        keywords: undefined,
      }}
    >
      <Logo marginBottom='24px'/>
      <div className="subtitle">כלי עזר יום יומיים לצוותי רפואה</div>
      <div className="title">לרפואה מהירה יותר ומדוייקת יותר</div>
      <ContactInfo />
      <TermsOfService hospitalConfig={hospitalConfig} />
    </Layout>
  );
};

export default HomePage;
