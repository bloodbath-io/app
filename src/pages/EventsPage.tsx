import { IonContent, IonPage, IonTitle, IonGrid, IonCardSubtitle, IonRow, IonCol, IonItem, useIonToast, useIonLoading, IonButton } from '@ionic/react'
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import MainHeaderComponent from '../components/MainHeaderComponent'
import './EventsPage.css';

import { QUERY_LIST_EVENTS } from '../queries/ListEvents'
import { MUTATION_REMOVE_EVENT } from '../queries/RemoveEvent'

let loadingSpawned = false
let dismissSpawned = false

const EventPage: React.FC = () => {

  const [toast, dismissToast] = useIonToast()
  const [showLoading, dismissLoading] = useIonLoading();
  const [mutationRemoveEvent] = useMutation(MUTATION_REMOVE_EVENT, {
    refetchQueries: [{ query: QUERY_LIST_EVENTS }],
  })
  const { loading, error, data } = useQuery(QUERY_LIST_EVENTS)
  const clickRemoveEvent = (id: any) => {
    showLoading('Removing event', 0, 'dots')

    mutationRemoveEvent({ variables: { id } }).then(({ data: { removeEvent }}) => {
      const { id } = removeEvent
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
  } else {
    if (!dismissSpawned) {
      dismissSpawned = true
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
    for (const [index, value] of data.listEvents.entries()) {

      const deleteButton = value.lockedAt? null : (
        <IonButton onClick={() => { clickRemoveEvent(value.id) }}>Delete</IonButton>
      )

      events.push(
        <IonRow className="body" key={index}>
          <IonCol size="2">{value.id}</IonCol>
          <IonCol size="1">{value.method}</IonCol>
          <IonCol size="1">{value.headers}</IonCol>
          <IonCol size="1">{value.body}</IonCol>
          <IonCol size="1">{value.endpoint}</IonCol>
          <IonCol size="1">{value.scheduledFor}</IonCol>
          <IonCol size="1">{value.enqueuedAt}</IonCol>
          <IonCol size="1">{value.lockedAt}</IonCol>
          <IonCol size="1">{value.dispatchedAt}</IonCol>
          <IonCol size="2">
            <IonButton color="secondary">Show</IonButton>
            {deleteButton}
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
                </IonItem>

                <IonGrid class="ion-margin">
                  <IonRow>
                    <IonCol>
                      <IonCardSubtitle>
                        This list shows the last 500 events scheduled on Bloodbath.
                  </IonCardSubtitle>
                    </IonCol>
                  </IonRow>
                </IonGrid>

                <IonGrid className="ion-margin">
                  <IonRow className="header">
                    <IonCol size="2">ID</IonCol>
                    <IonCol size="1">Method</IonCol>
                    <IonCol size="1">Headers</IonCol>
                    <IonCol size="1">Body</IonCol>
                    <IonCol size="1">Endpoint</IonCol>
                    <IonCol size="1">Scheduled for</IonCol>
                    <IonCol size="1">Enqueued at</IonCol>
                    <IonCol size="1">Locked at</IonCol>
                    <IonCol size="1">Dispatched at</IonCol>
                    <IonCol size="2">Action</IonCol>
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
