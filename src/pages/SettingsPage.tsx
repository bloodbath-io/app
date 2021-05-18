import { IonContent, IonPage, IonRow, IonCol, IonItem, IonIcon, IonTitle, IonButton, IonText, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonGrid } from '@ionic/react';
import { checkmarkCircle } from 'ionicons/icons';
import React from 'react';
import MainHeaderComponent from '../components/MainHeaderComponent'
import './SettingsPage.css';


const SettingsPage: React.FC = () => {

  const currentKey = () => {
    return localStorage.getItem('apiKey')
  }

  const createdAt = () => {
    return "01/01/2010"
  }

  const clickSignOut = () => {
    localStorage.removeItem('apiKey')
    window.location.href = "/"
  }

  return (
    <IonPage>
      <MainHeaderComponent />
      <IonContent fullscreen>
        <IonRow className="ion-justify-content-left">
          <IonCol>

            <IonItem>
              <IonTitle>
                Keys
              </IonTitle>
            </IonItem>

            <IonGrid class="ion-margin">
              <IonRow>
                <IonCol>
                  <IonCardSubtitle>
                  Your active keys can be used throughout all our APIs including this dashboard to list, schedule and delete events.
                  </IonCardSubtitle>
                </IonCol>
              </IonRow>
            </IonGrid>

            <IonGrid className="ion-margin">
              <IonRow className="header">
                <IonCol size="9">Key</IonCol>
                <IonCol>Created at</IonCol>
                <IonCol>Status</IonCol>
              </IonRow>
              <IonRow className="body">
                <IonCol size="9" className="blockquote">{currentKey()}</IonCol>
                <IonCol>{createdAt()}</IonCol>
                <IonCol><IonIcon icon={checkmarkCircle}></IonIcon></IonCol>
              </IonRow>
            </IonGrid>

          </IonCol>
        </IonRow>


        <IonRow className="ion-justify-content-left">
          <IonCol>

            <IonItem>
              <IonTitle>
                Account
              </IonTitle>
            </IonItem>

            <IonGrid className="ion-margin">
              <IonRow>
                <IonCol><IonButton onClick={clickSignOut}>Sign-out</IonButton></IonCol>
              </IonRow>
            </IonGrid>

          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
