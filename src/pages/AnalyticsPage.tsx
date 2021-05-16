import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './AnalyticsPage.css';

const AnalyticsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>AnalyticsPage</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">AnalyticsPage</IonTitle>
          </IonToolbar>
        </IonHeader>
        Analytics Page
      </IonContent>
    </IonPage>
  );
};

export default AnalyticsPage;
