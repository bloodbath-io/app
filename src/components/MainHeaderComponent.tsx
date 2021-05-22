import { IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonButtons } from '@ionic/react';
import React from 'react';
import { logOutOutline } from 'ionicons/icons';
import './MainHeaderComponent.scss';
import { isAuthenticated } from '../helpers/auth'

const MainHeaderComponent: React.FC = () => {

  const clickSignOut = () => {
    localStorage.removeItem('apiKey')
    localStorage.removeItem('insertedAt')
    window.location.reload()
  }

  const signOutButton = !isAuthenticated() ? null : (<IonButton onClick={clickSignOut}>
    <IonIcon icon={logOutOutline} />
  </IonButton>
  )

  return (
    <IonHeader>
      <IonToolbar color="primary">

        <IonButtons slot="end">
          {signOutButton}
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

export default MainHeaderComponent;
