import { IonContent, IonApp, IonRow, IonCol, IonItem, IonTitle, useIonToast, IonButton, IonLabel, IonCardSubtitle, IonGrid } from '@ionic/react';
import React from 'react';
import MainHeaderComponent from '../components/MainHeaderComponent'
import { fromNow } from '../helpers/date'
import './SettingsPage.scss'
import { betaRelease } from '../helpers/externalLinks'

const SettingsPage: React.FC = () => {
  const [toast, dismissToast] = useIonToast()
  const currentKey = () => {
    return localStorage.getItem('apiKey')
  }

  const insertedAt = () => {
    return localStorage.getItem('insertedAt')
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${currentKey()}`)
    toast({
      message: `Your key was copied to your clipboard.`,
      duration: 2000,
      buttons: [{ text: 'hide', handler: () => dismissToast() }],
    })
  }

  return (
    <IonApp>
      <MainHeaderComponent />
      <IonContent fullscreen>
        <IonRow className="ion-justify-content-left">
          <IonCol>

            <IonItem>
              <IonTitle>
                Keys
              </IonTitle>
            </IonItem>

            <IonGrid className="ion-margin">
              <IonRow>
                <IonCol>
                  <IonCardSubtitle>
                  Your active keys can be used throughout all our APIs including this dashboard to list, schedule and delete events.
                  </IonCardSubtitle>
                </IonCol>
              </IonRow>
            </IonGrid>

            <IonGrid className="ion-margin table">
              <IonRow>
                <IonCol size="9">Key</IonCol>
                <IonCol>Created at</IonCol>
                <IonCol>Status</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="9"><span onClick={copyToClipboard} className="key">{currentKey()}</span></IonCol>
                <IonCol>{fromNow(insertedAt())}</IonCol>
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
                  You're currently on a <a href={betaRelease} target="_blank" rel="noreferrer">beta release</a>. Enjoy Bloodbath for free!
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
                  You're currently logged-in.
                </IonCol>
              </IonRow>
            </IonGrid>

          </IonCol>
        </IonRow>
      </IonContent>
    </IonApp>
  );
};

export default SettingsPage;
