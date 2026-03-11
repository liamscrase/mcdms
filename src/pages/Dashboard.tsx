import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Dashboard.scss';

/**
 * Dashboard page — maps to Figma main content area.
 */
const Dashboard: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="dashboard-content">
        <div className="ion-padding">
          <h1>Dashboard</h1>
          <p>Welcome to Motorcentral DMS. Select a section from the sidebar.</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
