// import React from 'react';
// import styled from 'styled-components';
// import AppTile from './AppTile';
// // Styled Container for the tile layout
// const TileContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 10px;
//   justify-content: flex-start;
//   align-items: center;
//   padding: 20px;
// `;

// const AppsContainer: React.FC = () => {
//   return (
//     <TileContainer>
//       <AppTile title="תרופות החייאה" icon="faSyringe" inDevelopment={true} />
//       <AppTile title="טריאז'" icon="faUser" />
//       <AppTile title="אחבת ביילוד" icon="faBaby" />
//     </TileContainer>
//   );
// };

// export default AppsContainer;

import React from 'react';
import styled from 'styled-components';
import AppTile from './AppTile'; // Import the AppTile component
import { MashlomAppType } from '../config/apps';

// Styled Container for the tile layout
const TilesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
`;

interface AppsContainerProps {
  apps: MashlomAppType[];
  hospital: string;
}

const AppsContainer: React.FC<AppsContainerProps> = ({ apps, hospital }) => {
  console.log(hospital, apps);
  return (
    <TilesContainer>
      {apps.map((appId) => {
        return <AppTile key={appId} appId={appId} hospital={hospital}/>;
      })}
    </TilesContainer>
  );
};

export default AppsContainer;

