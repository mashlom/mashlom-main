import { Helmet } from 'react-helmet-async';
import './Home.css'; // We'll create this file for Home-specific styles

const HomePage = () => {

  return (
    <>
      <Helmet>
        <title>מה שלומי - כלי עזר יום יומיים לרופאים</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="apps/assets/logo/fav-icon96x96.png" />
        <meta property='og:title' content="mashlom.me - כלי עזר יום יומיים לרופאים" />
        <meta property='og:type' content='Article' />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property='og:site_name' content='mashlom.me' />
        <meta property='og:image' content='https://mashlom.me/apps/assets/logo/FullLogo1200x630.jpg' />
        <meta property="og:image:secure_url" content="https://mashlom.me/apps/assets/logo/FullLogo1200x630.jpg" />
        <meta property='og:url' content="https://mashlom.me" />
        <meta property='og:description' content="כלי עזר יום יומיים לצוותים רפואיים ובתי חולים" />
        <meta name="description" content="כלי עזר יום יומיים לצוותים רפואיים ובתי חולים" />
        <meta name="keywords" content="רופאים, מחשבונים, רפואה, כלי עזר לצוותי רפואה" />
        <meta name="robots" content="index, follow, NOODP" />
      </Helmet>
      <div className="homepage-container">
        <div className="text-structure">
          <img className="logo" src="apps/assets/logo/FullLogo_Transparent_NoBuffer.png" alt="Logo" />
          <div className="subtitle">כלי עזר יום יומיים לצוותי רפואה</div>
          <div className="title">לרפואה מהירה יותר ומדוייקת יותר</div>
          <div>ליצירת קשר - <a href="mailto:mashlom.me@gmail.com">mashlom.me@gmail.com</a></div>
        </div>
      </div>
    </>
  );
};

export default HomePage;