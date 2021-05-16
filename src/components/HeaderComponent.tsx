import { IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonButtons } from '@ionic/react';
import React from 'react';
import './HeaderComponent.css';

const HeaderComponent: React.FC = () => {

  return (
    <IonHeader>
      <IonToolbar color="primary">

        <IonButtons slot="end">
          <IonButton color="secondary">
            Documentation
            </IonButton>
        </IonButtons>

        <IonTitle slot="start" size="large">
          <a href="/">
            <IonIcon src="assets/icon/logo-reversed.svg" size="large" style={{ verticalAlign: "bottom" }}></IonIcon>
          </a>
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default HeaderComponent;
