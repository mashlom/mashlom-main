import * as React from 'react';
import { Link } from 'gatsby';

export default function IndexPage() {
  return (
    <div
      style={{
        margin: '12px',
        direction: 'ltr',
        textDecoration: 'underline',
        color: 'blue',
      }}
    >
      <h1 id="assuta-patients">
        <Link to="/preparation">סרטוני הכנה לניתוח</Link>
      </h1>
    </div>
  );
};

export const Head = () => <title>Home Page</title>;
