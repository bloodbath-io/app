import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonItem, IonLabel, IonInput, IonIcon, IonButton, IonAlert } from '@ionic/react';
import React, { useState } from 'react';
import MainHeaderComponent from '../components/MainHeaderComponent'
import './EventsPage.css';

const EventPage: React.FC = () => {

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <IonPage>
      <MainHeaderComponent />
      <IonContent fullscreen>
        <IonRow className="ion-justify-content-center">
          <IonCol sizeXs="10" sizeMd="5">

            <IonRow>
              <IonCol>
                <IonItem>
                  OTHER STUFF
                </IonItem>
                <IonItem>
                  STUFF
                </IonItem>
              </IonCol>
            </IonRow>

          </IonCol>

        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default EventPage;
