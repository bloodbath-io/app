import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonItem, IonLabel, IonInput, IonIcon, IonButton } from '@ionic/react';
import React, { useState } from 'react';
import { personCircle } from 'ionicons/icons';
import './SigninPage.css';
const SigninPage: React.FC = () => {

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle slot="end">
            Sign-in
          </IonTitle>
          <IonTitle slot="start" size="large">
            <a href="/">
              <IonIcon src="assets/icon/logo-reversed.svg" size="large" style={{ verticalAlign: "bottom" }}></IonIcon>
            </a>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Sign-in</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRow className="ion-justify-content-center">
          <IonCol sizeXs="10" sizeMd="5">

            <IonRow className="ion-justify-content-center">
              <IonCol className="ion-align-self-center" style={{ fontSize: "5em", textAlign: "center" }} >
                <IonIcon icon={personCircle} />
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating"> Email</IonLabel>
                  <IonInput
                    type="email"
                    value={email}
                    onIonChange={e => setEmail(e.detail.value!)}
                  >
                  </IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating"> Password</IonLabel>
                  <IonInput
                    type="password"
                    value={password}
                    onIonChange={e => setPassword(e.detail.value!)}
                  >
                  </IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonButton expand="block">Sign-in</IonButton>
              </IonCol>
            </IonRow>

          </IonCol>

        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default SigninPage;
