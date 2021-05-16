import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './SettingsPage.css';

const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SettingsPage</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">SettingsPage</IonTitle>
          </IonToolbar>
        </IonHeader>
        Settings page
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
