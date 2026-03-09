// Footer layout component
// Provides a consistent app-wide footer using IonFooter.

import React from 'react';
import { IonFooter, IonToolbar, IonTitle } from '@ionic/react';

interface FooterProps {
  text?: string;
}

const Footer: React.FC<FooterProps> = ({ text = '© MCDMS' }) => {
  return (
    <IonFooter>
      <IonToolbar>
        <IonTitle size="small">{text}</IonTitle>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;
