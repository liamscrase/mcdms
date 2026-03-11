import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  speedometerOutline,
  carOutline,
  filterOutline,
  pricetagOutline,
  peopleOutline,
  openOutline,
  clipboardOutline,
  constructOutline,
  settingsOutline,
  helpCircleOutline,
  notificationsOutline,
  appsOutline,
} from 'ionicons/icons';
import SideMenuItem from '../SideMenuItem';
import './SideMenuSmall.scss';

interface SideMenuSmallProps {
  expanded?: boolean;
  onNavigate?: () => void;
}

const SideMenuSmall: React.FC<SideMenuSmallProps> = ({ expanded = false, onNavigate }) => {
  const location = useLocation();
  const history = useHistory();

  const isActive = (path: string) => location.pathname.startsWith(path);

  const go = (path: string) => {
    history.push(path);
    onNavigate?.();
  };

  const label = (text: string) => expanded ? text : undefined;

  return (
    <aside
      className={`side-menu-small${expanded ? ' side-menu-small--expanded' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="side-menu-small__header">
        <button
          type="button"
          className="side-menu-small__logo"
          aria-label="Motorcentral DMS"
          onClick={() => go('/app/dashboard')}
        >
          <span className="side-menu-small__logo-text">M</span>
        </button>
        {expanded && <span className="side-menu-small__brand">Motorcentral DMS</span>}
      </div>
      <div className="side-menu-small__divider" />

      <div className="side-menu-small__nav">
        <SideMenuItem icon={speedometerOutline} label={label('Dashboard')} active={isActive('/app/dashboard')} onClick={() => go('/app/dashboard')} />
        <SideMenuItem icon={carOutline} label={label('Vehicles')} active={isActive('/app/vehicles')} onClick={() => go('/app/vehicles')} />
        <SideMenuItem icon={filterOutline} label={label('Opportunities')} active={isActive('/app/opportunities')} onClick={() => go('/app/opportunities')} />
        <SideMenuItem icon={pricetagOutline} label={label('Sales')} active={isActive('/app/sales')} onClick={() => go('/app/sales')} />
        <SideMenuItem icon={peopleOutline} label={label('Contacts')} active={isActive('/app/contacts')} onClick={() => go('/app/contacts')} />
        <SideMenuItem icon={openOutline} label={label('Export')} onClick={() => go('/app/export')} />
        <SideMenuItem icon={clipboardOutline} label={label('Reports')} active={isActive('/app/reports')} onClick={() => go('/app/reports')} />
        <SideMenuItem icon={constructOutline} label={label('Tools')} active={isActive('/app/tools')} onClick={() => go('/app/tools')} />
        <SideMenuItem icon={settingsOutline} label={label('Settings')} active={isActive('/app/settings')} onClick={() => go('/app/settings')} />
      </div>

      <div className="side-menu-small__footer">
        <SideMenuItem icon={helpCircleOutline} label={label('Help')} onClick={() => {}} />
        <SideMenuItem icon={notificationsOutline} label={label('Notifications')} badge onClick={() => {}} />
        <SideMenuItem label={label('Profile')} onClick={() => go('/app/profile')} active={isActive('/app/profile')}>
          <span className="side-menu-small__avatar">WW</span>
        </SideMenuItem>
        <SideMenuItem icon={appsOutline} label={label('All apps')} onClick={() => {}} />
      </div>
    </aside>
  );
};

export default SideMenuSmall;
