import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './EventsPage.css';

const EventsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Events</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Events</IonTitle>
          </IonToolbar>
        </IonHeader>
        Events page
      </IonContent>
    </IonPage>
  );
};

export default EventsPage;
