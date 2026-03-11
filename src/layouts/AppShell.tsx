import React from 'react';
import { IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { MobileMenuProvider, useMobileMenu } from '../contexts/MobileMenuContext';
import SideMenuSmall from '../components/SideMenuSmall';
import Dashboard from '../pages/Dashboard';
import Vehicles from '../pages/Vehicles';
import './AppShell.scss';

const AppShellInner: React.FC = () => {
  const { isMenuOpen, closeMenu } = useMobileMenu();

  return (
    <div className="app-shell">
      {/* Desktop sidebar — always visible above breakpoint, hidden on mobile */}
      <div className="app-shell__sidebar-desktop">
        <SideMenuSmall />
      </div>

      {/* Mobile drawer overlay */}
      <div
        className={`app-shell__drawer-backdrop${isMenuOpen ? ' app-shell__drawer-backdrop--visible' : ''}`}
        onClick={closeMenu}
        aria-hidden={!isMenuOpen}
      />
      <div className={`app-shell__drawer${isMenuOpen ? ' app-shell__drawer--open' : ''}`}>
        <SideMenuSmall expanded onNavigate={closeMenu} />
      </div>

      <main className="app-shell__main" role="main">
        <IonRouterOutlet>
          <Route exact path="/app" render={() => <Redirect to="/app/dashboard" />} />
          <Route exact path="/app/dashboard" component={Dashboard} />
          <Route exact path="/app/vehicles" component={Vehicles} />
        </IonRouterOutlet>
      </main>
    </div>
  );
};

const AppShell: React.FC = () => (
  <MobileMenuProvider>
    <AppShellInner />
  </MobileMenuProvider>
);

export default AppShell;
