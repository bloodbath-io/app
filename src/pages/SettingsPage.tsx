import { IonContent, IonPage, IonRow, IonCol, IonItem, IonTitle, IonButton, IonLabel, IonCardSubtitle, IonGrid } from '@ionic/react';
import React from 'react';
import MainHeaderComponent from '../components/MainHeaderComponent'
import './SettingsPage.css';


const SettingsPage: React.FC = () => {

  const currentKey = () => {
    return localStorage.getItem('apiKey')
  }

  const insertedAt = () => {
    return localStorage.getItem('insertedAt')
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
                <IonCol>{insertedAt()}</IonCol>
                <IonCol><IonLabel>Valid</IonLabel></IonCol>
              </IonRow>
            </IonGrid>

          </IonCol>
        </IonRow>

        <IonRow className="ion-justify-content-left">
          <IonCol>

            <IonItem>
              <IonTitle>
                Billing
              </IonTitle>
            </IonItem>

            <IonGrid className="ion-margin">
              <IonRow>
                <IonCol>
                  You're currently on a <a href="/">beta release</a>. Enjoy Bloodbath for free!
                </IonCol>
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
                <IonCol>
                  Nothing yet
                </IonCol>
              </IonRow>
            </IonGrid>

          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
