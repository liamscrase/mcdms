import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import TopHeader from '../components/TopHeader';
import VehiclesTabBar from '../components/VehiclesTabBar';
import VehiclesSearchBar from '../components/VehiclesSearchBar';
import VehiclesTable from '../components/VehiclesTable';
import './Vehicles.scss';

/**
 * Vehicles page — full MC DMS Vehicles layout from Figma.
 * Includes: Top header (logo + ad), tab bar, search/filters, vehicles table.
 */
const Vehicles: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('Last activity: >2 weeks ago');

  return (
    <IonPage>
      <IonContent fullscreen className="vehicles-page">
        <div className="vehicles-page__layout">
          <div className="vehicles-page__header">
            <div className="vehicles-page__green-bar" />
            <TopHeader />
            <VehiclesTabBar />
          </div>
          <main className="vehicles-page__main">
            <div className="vehicles-page__content">
              <VehiclesSearchBar
                activeFilter={activeFilter}
                onClearFilters={() => setActiveFilter('')}
              />
              <VehiclesTable />
            </div>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Vehicles;
