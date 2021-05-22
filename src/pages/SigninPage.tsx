import { IonContent, IonPage, useIonToast, IonRow, IonCol, IonItem, IonLabel, IonInput, IonIcon, IonButton, useIonLoading } from '@ionic/react'
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import MainHeaderComponent from '../components/MainHeaderComponent'

import { MUTATION_SIGNIN } from '../queries/Signin'

const SigninPage: React.FC = () => {

  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [mutationSignin] = useMutation(MUTATION_SIGNIN)
  const [toast, dismissToast] = useIonToast();
  const [showLoading, dismissLoading] = useIonLoading();

  const pressEnter = (event: any, callback: any) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      callback()
    }
  }

  const clickSignin = () => {
    showLoading('Authentication to Bloodbath', 2000, 'dots')

    mutationSignin({ variables: { email, password } }).then(({ data: { signin } }) => {
      const { apiKey, insertedAt } = signin
      localStorage.setItem('apiKey', apiKey)
      localStorage.setItem('insertedAt', insertedAt)
      dismissLoading()
      window.location.href = "/events"
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
                    onIonChange={event => setEmail(event.detail.value!)}
                    onKeyPress={event => { pressEnter(event, clickSignin) }}
                  >
                  </IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating"> Password</IonLabel>
                  <IonInput
                    type="password"
                    value={password}
                    required
                    onIonChange={event => setPassword(event.detail.value!)}
                    onKeyPress={event => { pressEnter(event, clickSignin) }}
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
