import React from 'react';
import { IonIcon } from '@ionic/react';
import {
  ellipsisHorizontalOutline,
  menuOutline,
  chevronDownOutline,
} from 'ionicons/icons';
import { useMobileMenu } from '../../contexts/MobileMenuContext';
import './VehiclesTabBar.scss';

const VehiclesTabBar: React.FC = () => {
  const { openMenu } = useMobileMenu();

  return (
    <>
      {/* Desktop tab bar */}
      <div className="vehicles-tab-bar vehicles-tab-bar--desktop" role="tablist">
        <div className="vehicles-tab-bar__tabs">
          <span className="vehicles-tab-bar__title">Vehicles</span>
          <button type="button" className="vehicles-tab-bar__tab vehicles-tab-bar__tab--active" role="tab">
            Inbox
          </button>
          <button type="button" className="vehicles-tab-bar__tab" role="tab">
            Insights
          </button>
        </div>
        <button type="button" className="vehicles-tab-bar__more" aria-label="More options">
          <IonIcon icon={ellipsisHorizontalOutline} />
        </button>
      </div>

      {/* Mobile tab bar */}
      <div className="vehicles-tab-bar vehicles-tab-bar--mobile">
        <div className="vehicles-tab-bar__mobile-left">
          <button type="button" className="vehicles-tab-bar__hamburger" onClick={openMenu} aria-label="Open menu">
            <IonIcon icon={menuOutline} />
            <span className="vehicles-tab-bar__hamburger-dot" />
          </button>
          <span className="vehicles-tab-bar__mobile-title">Vehicles</span>
          <button type="button" className="vehicles-tab-bar__mobile-inbox">
            Inbox
            <IonIcon icon={chevronDownOutline} />
          </button>
        </div>
        <button type="button" className="vehicles-tab-bar__more" aria-label="More options">
          <IonIcon icon={ellipsisHorizontalOutline} />
        </button>
      </div>
    </>
  );
};

export default VehiclesTabBar;
