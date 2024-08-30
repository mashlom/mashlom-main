import * as React from 'react';
import { Link } from 'gatsby';
import Layout from '@components/Layout';
import Seo from '@components/Seo';

export default function NotFoundPage() {
  return (
    <Layout includeCover={false}>
      <h1>Page not found - 404</h1>
      <p>
        You just hit a route that doesn&#39;t exist...
        <br />
        <Link to="/">Go home</Link>.
      </p>
    </Layout>
  );
}

export const Head = () => <Seo title="404: Not Found" />;
