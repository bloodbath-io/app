import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonItem, IonLabel, IonInput, IonIcon, IonButton, useIonToast, useIonLoading } from '@ionic/react';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import MainHeaderComponent from '../components/MainHeaderComponent'
import './SignupPage.css';

import { MUTATION_SIGNUP } from '../queries/Signup'

const SignupPage: React.FC = () => {

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [firstName, setfirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [companyName, setCompanyName] = useState<string>();
  const [mutationSignup] = useMutation(MUTATION_SIGNUP)
  const [toast, dismissToast] = useIonToast();
  const [showLoading, dismissLoading] = useIonLoading();

  const clickSignup = () => {
    showLoading('Registering to Bloodbath', 0, 'dots')

    mutationSignup({ variables: { email, password, firstName, lastName, organizationInput: { name: companyName } } }).then(({ data: { signup } }) => {
      const { apiKey, insertedAt } = signup
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
    if (!firstName) return false
    if (!lastName) return false
    if (!companyName) return false
    return true
  }

  return (
    <IonPage>
      <MainHeaderComponent />
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
                <IonIcon src="assets/illustrations/signup.svg" style={{ fontSize: "20em" }}></IonIcon>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="6">
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
              </IonCol>
              <IonCol size="6">
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
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="floating"> First name</IonLabel>
                  <IonInput
                    type="text"
                    value={firstName}
                    required
                    onIonChange={e => setfirstName(e.detail.value!)}
                  >
                  </IonInput>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="floating"> Last name</IonLabel>
                  <IonInput
                    type="text"
                    value={lastName}
                    required
                    onIonChange={e => setLastName(e.detail.value!)}
                  >
                  </IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="floating"> Company name</IonLabel>
                  <IonInput
                    type="text"
                    value={companyName}
                    required
                    onIonChange={e => setCompanyName(e.detail.value!)}
                  >
                  </IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonButton expand="block" onClick={clickSignup} disabled={!formFilled()}>Sign-up free</IonButton>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol style={{ textAlign: "center" }}>
                Already have an account? You can <a href="/signin">sign-in</a> now.
              </IonCol>
            </IonRow>

          </IonCol>

        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default SignupPage;
