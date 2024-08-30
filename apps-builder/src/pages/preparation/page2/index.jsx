import React from 'react';
import Layout from '@components/Layout';
import Seo from '@components/Seo';

export default function PreparationPage() {
  return (
    <Layout includeCover={false}>
      <section>
        <div className="best-regards-container">
          <p className="text-center">
            <b>text8</b>
          </p>
          <p className="text-center">
            <b>text9</b>
          </p>
        </div>
      </section>
    </Layout>
  );
}
export const Head = () => <Seo title="מחשבון גיל מתוקן וגרפי התפתחות" />;
