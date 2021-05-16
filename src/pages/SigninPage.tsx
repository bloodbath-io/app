import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonItem, IonLabel, IonInput, IonIcon, IonButton, IonButtons } from '@ionic/react';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import HeaderComponent from '../components/HeaderComponent'
import './SigninPage.css';

import { MUTATION_SIGNIN } from '../queries/SignIn'

const SigninPage: React.FC = () => {

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [mutationSignIn] = useMutation(MUTATION_SIGNIN)

  const clickSignIn = () => {
    mutationSignIn({ variables: { email, password } }).then(({ data: { signin }}) => {
      const apiKey = signin.apiKey
      // localStorage.set('apiKey', apiKey)
    }).catch((error) => console.log(error))
  }

  return (
    <IonPage>
      <HeaderComponent />
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Sign-in</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRow className="ion-justify-content-center">
          <IonCol sizeXs="10" sizeMd="5">

            <IonRow className="ion-justify-content-center">
              <IonCol className="ion-align-self-center" style={{ textAlign: "center" }} >
                <IonIcon src="assets/illustrations/signin.svg" style={{ fontSize: "20em" }}></IonIcon>
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
                <IonButton expand="block" onClick={clickSignIn}>Sign-in</IonButton>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol style={{ textAlign: "center" }}>
                No account yet? You can <a href="/signup">create one for free</a> now.
              </IonCol>
            </IonRow>

          </IonCol>

        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default SigninPage;
