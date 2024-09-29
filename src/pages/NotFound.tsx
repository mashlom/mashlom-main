import React from 'react';
import Layout from '../components/Layout';
import Subtitle from '../components/Subtitle';

const NotFoundPage: React.FC = () => {
  const seo = {
    title: '404 - דף לא נמצא | משלום לרופאים',
    description: 'הדף המבוקש לא נמצא במערכת משלום לרופאים',
    keywords: '404, דף לא נמצא, משלום לרופאים'
  };
  return (
    <Layout
      seo={seo}
    >
      <Subtitle text="היינו שמחים לעזור לך, אבל אנחנו לא מוצאים את הדף המבוקש" />
    </Layout>
  );
};

export default NotFoundPage;