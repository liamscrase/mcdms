// Header layout component
// Wraps the Ionic IonHeader with app-wide defaults.

import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from '@ionic/react';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false }) => {
  return (
    <IonHeader>
      <IonToolbar>
        {showBackButton && (
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
        )}
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
