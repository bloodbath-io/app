import { IonContent, IonModal, IonPage, IonBadge, IonBackButton, IonTitle, IonGrid, IonCardSubtitle, IonRow, IonCol, useIonModal, IonItem, useIonToast, useIonLoading, IonButton } from '@ionic/react'
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import MainHeaderComponent from '../components/MainHeaderComponent'
import ShowEvent from '../components/ShowEvent'

import { bytes } from '../helpers/format'
import { fromNow } from '../helpers/date'

import { QUERY_LIST_EVENTS } from '../queries/ListEvents'
import { MUTATION_REMOVE_EVENT } from '../queries/RemoveEvent'

let loadingSpawned = false

const EventPage: React.FC = () => {
  const [showModal, setShowModal] = useState<string>('');
  const [toast, dismissToast] = useIonToast()
  const [showLoading, dismissLoading] = useIonLoading();
  const [mutationRemoveEvent] = useMutation(MUTATION_REMOVE_EVENT, {
    refetchQueries: [{ query: QUERY_LIST_EVENTS }],
  })
  const { loading, error, data } = useQuery(QUERY_LIST_EVENTS)

  const clickRemoveEvent = (id: string) => {
    showLoading('Removing event', 0, 'dots')

    mutationRemoveEvent({ variables: { id } }).then(({ data: { removeEvent } }) => {
      dismissLoading()
    }).catch((error) => {
      dismissLoading()
      toast({
        message: `Woops! ${error.message}`,
        duration: 2000,
        buttons: [{ text: 'hide', handler: () => dismissToast() }],
      })
    })
  }

  if (loading) {
    if (!loadingSpawned) {
      loadingSpawned = true
      showLoading('Loading events', 0, 'dots')
    }
  }

  if (error) {
    toast({
      message: `Woops! ${error.message}`,
      duration: 2000,
      buttons: [{ text: 'hide', handler: () => dismissToast() }],
    })
  }

  if (data?.size !== 0) {
    setTimeout(dismissLoading, 500)
  }

  let events: Array<any> = []

  if (data?.listEvents.length > 0) {
    for (const [index, event] of data.listEvents.entries()) {

      const deleteButton = event.lockedAt ? null : (
        <IonButton onClick={() => { clickRemoveEvent(event.id) }}>Delete</IonButton>
      )

      events.push(
        <IonRow className="table-body" key={index}>
          <IonCol size="2">{event.id}</IonCol>
          <IonCol size="1"><IonBadge color="light">{event.method}</IonBadge></IonCol>
          <IonCol size="1">{event.endpoint}</IonCol>
          <IonCol size="1">{bytes(event.headers)}</IonCol>
          <IonCol size="1">{bytes(event.body)}</IonCol>
          <IonCol size="1">{fromNow(event.scheduledFor)}</IonCol>
          <IonCol size="1">{fromNow(event.enqueuedAt)}</IonCol>
          <IonCol size="1">{fromNow(event.lockedAt)}</IonCol>
          <IonCol size="1">{fromNow(event.dispatchedAt)}</IonCol>
          <IonCol size="2" className="ion-text-right">
            <IonButton color="secondary" onClick={() => { setShowModal(event.id) }}>Show</IonButton>
            {deleteButton}
            <IonContent>
              <IonModal isOpen={showModal === event.id} onDidDismiss={() => setShowModal('')}>
                <ShowEvent id={event.id} setShowModal={setShowModal} />
              </IonModal>
            </IonContent>
          </IonCol>
        </IonRow>
      )
    }
  }

  return (
    <IonPage>
      <MainHeaderComponent />
      <IonContent fullscreen>
        <IonRow className="ion-justify-content-center">
          <IonCol>

            <IonRow className="ion-justify-content-left">
              <IonCol>

                <IonItem>
                  <IonTitle>
                    Events
                </IonTitle>
                  <IonRow className="ion-align-items-end">
                    <IonCol>
                      <IonButton color="primary">
                        Documentation
                    </IonButton>
                    </IonCol>
                  </IonRow>
                </IonItem>

                <IonGrid className="ion-margin">
                  <IonRow>
                    <IonCol>
                      <IonCardSubtitle>
                        This list shows the last 500 events scheduled on Bloodbath.
                      </IonCardSubtitle>
                    </IonCol>
                  </IonRow>
                </IonGrid>

                <IonGrid className="ion-margin table">
                  <IonRow>
                    <IonCol size="2">ID</IonCol>
                    <IonCol size="1">Method</IonCol>
                    <IonCol size="1">Endpoint</IonCol>
                    <IonCol size="1">Headers</IonCol>
                    <IonCol size="1">Body</IonCol>
                    <IonCol size="1">Scheduled for</IonCol>
                    <IonCol size="1">Enqueued at</IonCol>
                    <IonCol size="1">Locked at</IonCol>
                    <IonCol size="1">Dispatched at</IonCol>
                    <IonCol size="2" className="ion-text-right">Action</IonCol>
                  </IonRow>
                  {events}
                </IonGrid>

              </IonCol>
            </IonRow>
          </IonCol>

        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default EventPage;
