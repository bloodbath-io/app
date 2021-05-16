import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Analytics.css';

const Analytics: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Analytics</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Analytics</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Analytics page" />
      </IonContent>
    </IonPage>
  );
};

export default Analytics;