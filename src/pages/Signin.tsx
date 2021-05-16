import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonItem, IonLabel, IonInput } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Signin.css';
const Signin: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign-in</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Signin</IonTitle>
          </IonToolbar>
        </IonHeader>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeXs="10" sizeMd="5">
              <IonItem>
                <IonLabel position="floating"> Email</IonLabel>
                <IonInput
                  type="email"
                  value=""
                  >
                </IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Signin;
