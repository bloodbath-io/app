import { IonContent, IonPage, useIonToast, IonRow, IonCol, IonItem, IonLabel, IonInput, IonIcon, IonButton, useIonLoading } from '@ionic/react'
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import MainHeaderComponent from '../components/MainHeaderComponent'
import './SigninPage.css'

import { MUTATION_SIGNIN } from '../queries/Signin'

const SigninPage: React.FC = () => {

  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [mutationSignin] = useMutation(MUTATION_SIGNIN)
  const [toast, dismissToast] = useIonToast();
  const [loading, dismissLoading] = useIonLoading();

  const clickSignin = () => {
    loading('Authentication to Bloodbath', 0, 'dots')

    mutationSignin({ variables: { email, password } }).then(({ data: { signin }}) => {
      const apiKey = signin.apiKey
      localStorage.setItem('apiKey', apiKey)
      dismissLoading()
      window.location.href = "/"
    }).catch((error) => {
      dismissLoading()
      toast({
        message: `Woops! ${error.message}`,
        duration: 2000,
        buttons: [{ text: 'hide', handler: () => dismissToast() }],
      })
    })
  }

  const formFilled = () => {
    if (!email) return false
    if (!password) return false
    return true
  }

  return (
    <IonPage>
      <MainHeaderComponent />
      <IonContent fullscreen>
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
                    required
                    onIonChange={e => setEmail(e.detail.value!)}
                  >
                  </IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating"> Password</IonLabel>
                  <IonInput
                    type="password"
                    value={password}
                    required
                    onIonChange={e => setPassword(e.detail.value!)}
                  >
                  </IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonButton expand="block" onClick={clickSignin} disabled={!formFilled()}>Sign-in</IonButton>
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
