import { IonContent, IonApp, IonRow, IonCol, IonButtons, IonIcon, IonButton, IonAlert, IonCard } from '@ionic/react';
import React from 'react';
import MainHeaderComponent from '../components/MainHeaderComponent'

const AnalyticsPage: React.FC = () => {

  return (
    <IonApp>
      <MainHeaderComponent />
      <IonContent fullscreen>
        <IonRow className="ion-justify-content-center">
          <IonCol sizeXs="10" sizeMd="5" className="illustration-grid">
            <IonRow className="ion-justify-content-center">
              <IonCol className="ion-align-self-center" style={{ textAlign: "center" }} >
                <IonIcon src="assets/illustrations/analytics.svg" style={{ fontSize: "20em" }}></IonIcon>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol style={{ textAlign: "center" }}>
                There isn't enough data to digest analytics. Add more <a href="/events">events</a> to make it happen.
              </IonCol>
            </IonRow>

          </IonCol>

        </IonRow>
      </IonContent>
    </IonApp>
  );
};

export default AnalyticsPage;
