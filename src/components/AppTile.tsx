

import React, { useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { AppsConfigList, MashlomAppType } from '../config/apps';

interface AppTileProps {
  appId: MashlomAppType;
  hospital?: string;
}

const SquareButton = styled(Link)<{ inDevelopment?: boolean }>`
  position: relative;
  overflow: hidden;
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #406286;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 10px;
  text-align: center;
  text-decoration: none;
  padding: 10px;
  box-sizing: border-box;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover,
  &:focus {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }

  ${(props) =>
    props.inDevelopment &&
    `
    &::before {
      content: "בפיתוח";
      position: absolute;
      top: 12px;
      left: -30px;
      width: 100px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: rotate(-45deg);
      background-color: #ff6347;
      color: white;
      text-align: center;
      font-size: 0.6rem;
      padding: 2px 0;
      z-index: 1;
      box-shadow: 0 1px 2px rgba(0,0,0,0.2);
    }
  `}
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Title = styled.span`
  font-size: 1rem;
  line-height: 1.2;
  max-height: 2.4em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const AppTile: React.FC<AppTileProps> = ({ appId, hospital }) => {
  const { title, icon, inDevelopment = false } = AppsConfigList[appId];
  const selectedIcon = Icons[icon as keyof typeof Icons] as IconDefinition;
  const titleRef = useRef<HTMLSpanElement>(null);

  return (
    <SquareButton to={`/${hospital}/${appId}`} inDevelopment={inDevelopment}>
      <ContentWrapper>
        <Icon icon={selectedIcon} />
        <Title ref={titleRef}>
          {title}
        </Title>
      </ContentWrapper>
    </SquareButton>
  );
};

export default AppTile;
