import React from 'react';
import { IonIcon } from '@ionic/react';
import './SideMenuItem.scss';

export interface SideMenuItemProps {
  icon?: React.ComponentProps<typeof IonIcon>['icon'];
  label?: string;
  active?: boolean;
  badge?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

const SideMenuItem: React.FC<SideMenuItemProps> = ({
  icon,
  label,
  active = false,
  badge = false,
  children,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={`side-menu-item${active ? ' side-menu-item--active' : ''}${label ? ' side-menu-item--has-label' : ''}`}
      onClick={onClick}
      aria-pressed={active}
    >
      <span className="side-menu-item__icon-wrap">
        {children ?? (icon ? <IonIcon icon={icon} className="side-menu-item__icon" /> : null)}
        {badge && <span className="side-menu-item__badge" aria-hidden />}
      </span>
      {label && <span className="side-menu-item__label">{label}</span>}
    </button>
  );
};

export default SideMenuItem;
