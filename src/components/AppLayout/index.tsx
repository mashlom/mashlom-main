import { FC, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import './style.scss';

interface ChildrenProps {
  children: ReactNode;
}

interface FooterItemProps {
  label: string;
  icon: IconProp;
  onClick?: () => void;
  isActive: boolean;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: IconProp;
  component: React.FC;
}

const AppLayout: FC<ChildrenProps> & {
  Footer: FC<ChildrenProps>;
  FooterItem: FC<FooterItemProps>;
} = ({ children }) => {
  return <div className="app-layout">{children}</div>;
};

AppLayout.Footer = ({ children }: ChildrenProps) => {
  return <footer className="app-layout-footer">{children}</footer>;
};

AppLayout.FooterItem = ({
  label,
  icon,
  onClick,
  isActive,
}: FooterItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`footer-button ${isActive ? 'active' : ''}`}
      type="button"
      aria-pressed={isActive}
    >
      <div className="footer-button-content">
        <div className="footer-button-icon">
          <FontAwesomeIcon icon={icon} />
        </div>
        <span className="footer-button-label">{label}</span>
      </div>
    </button>
  );
};

export default AppLayout;
