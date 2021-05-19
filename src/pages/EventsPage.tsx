import { IonContent, IonHeader, IonPage, IonTitle, IonGrid, IonCardSubtitle, IonRow, IonCol, IonItem, IonLabel, IonInput, IonIcon, IonButton, IonAlert } from '@ionic/react';
import React, { useState } from 'react';
import MainHeaderComponent from '../components/MainHeaderComponent'
import './EventsPage.css';

const EventPage: React.FC = () => {

  return (
    <IonPage>
      <MainHeaderComponent />
      <IonContent fullscreen>
        <IonRow className="ion-justify-content-center">
          <IonCol>

          <IonRow className="ion-justify-content-left">
          <IonCol>

            <IonItem>
              <IonTitle>
                Events
              </IonTitle>
            </IonItem>

            <IonGrid class="ion-margin">
              <IonRow>
                <IonCol>
                  <IonCardSubtitle>
                  This list shows the last 500 events scheduled on Bloodbath.
                  </IonCardSubtitle>
                </IonCol>
              </IonRow>
            </IonGrid>

            <IonGrid className="ion-margin">
              <IonRow className="header">
                <IonCol>Key</IonCol>
                <IonCol>Created at</IonCol>
                <IonCol>Status</IonCol>
              </IonRow>
              <IonRow className="body">
                <IonCol>TEST</IonCol>
                <IonCol>TEST</IonCol>
                <IonCol>TEST</IonCol>
              </IonRow>
            </IonGrid>

          </IonCol>
        </IonRow>
          </IonCol>

        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default EventPage;
