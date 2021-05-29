import { IonIcon, IonContent, IonModal, IonApp, IonBadge, IonBackButton, IonTitle, IonGrid, IonCardSubtitle, IonRow, IonCol, useIonModal, IonItem, useIonToast, useIonLoading, IonButton, IonSplitPane } from '@ionic/react'
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import MainHeaderComponent from '../components/MainHeaderComponent'
import ShowEvent from '../components/ShowEvent'

import { bytes } from '../helpers/format'
import { fromNow } from '../helpers/date'

import { QUERY_LIST_EVENTS } from '../queries/ListEvents'
import { MUTATION_CANCEL_EVENT } from '../queries/CancelEvent'

import { gettingStartedGuide } from '../helpers/externalLinks'

let loadingSpawned = false

const EventPage: React.FC = () => {
  const [showModal, setShowModal] = useState<string>('');
  const [toast, dismissToast] = useIonToast()
  const [showLoading, dismissLoading] = useIonLoading();
  const [mutationCancelEvent] = useMutation(MUTATION_CANCEL_EVENT, {
    refetchQueries: [{ query: QUERY_LIST_EVENTS }]
  })
  const { loading, error, data } = useQuery(QUERY_LIST_EVENTS, {
    pollInterval: 10000
  })

  const clickCancelEvent = (id: string) => {
    showLoading('Cancelling event', 0, 'dots')

    mutationCancelEvent({ variables: { id } }).then(({ data: { cancelEvent } }) => {
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
      showLoading('Loading events', 3000, 'dots')
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

      const cancelButton = event.lockedAt ? null : (
        <IonButton onClick={() => { clickCancelEvent(event.id) }}>Cancel</IonButton>
      )

      events.push(
        <IonRow key={index}>
          <IonCol size="2">{event.id}</IonCol>
          <IonCol><IonBadge color="light">{event.method}</IonBadge></IonCol>
          <IonCol>{event.endpoint}</IonCol>
          <IonCol>{bytes(event.headers)}</IonCol>
          <IonCol>{bytes(event.body)}</IonCol>
          <IonCol className="hidden-md-down">{fromNow(event.scheduledFor)}</IonCol>
          <IonCol className="hidden-md-down">{fromNow(event.enqueuedAt)}</IonCol>
          <IonCol className="hidden-md-down">{fromNow(event.lockedAt)}</IonCol>
          <IonCol className="hidden-md-down">{fromNow(event.dispatchedAt)}</IonCol>
          <IonCol className="ion-text-right">
            <IonButton color="secondary" onClick={() => { setShowModal(event.id) }}>Show</IonButton>
            {cancelButton}
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

  if (events.length === 0) {
    return (
      <IonApp>
      <MainHeaderComponent />
      <IonContent fullscreen>
        <IonRow className="ion-justify-content-center">
          <IonCol sizeXs="10" sizeMd="5" className="illustration-grid">
            <IonRow className="ion-justify-content-center">
              <IonCol className="ion-align-self-center" style={{ textAlign: "center" }} >
                <IonIcon src="assets/illustrations/events.svg" style={{ fontSize: "20em" }}></IonIcon>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol style={{ textAlign: "center" }}>
                You don't have any events yet. Follow our <a href={gettingStartedGuide} target="_blank" rel="noreferrer">getting started guide</a> to change that.
              </IonCol>
            </IonRow>

          </IonCol>

        </IonRow>
      </IonContent>
    </IonApp>
    )
  }

  return (
    <IonApp>
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
                      <IonButton color="primary" onClick={() => { window.open("https://www.notion.so/Bloodbath-Guide-00a3edc8f43b4528b2e34bf5eac5b0df") }}>
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
                    <IonCol>Method</IonCol>
                    <IonCol>Endpoint</IonCol>
                    <IonCol>Headers</IonCol>
                    <IonCol>Body</IonCol>
                    <IonCol className="hidden-md-down">Scheduled for</IonCol>
                    <IonCol className="hidden-md-down">Enqueued at</IonCol>
                    <IonCol className="hidden-md-down">Locked at</IonCol>
                    <IonCol className="hidden-md-down">Dispatched at</IonCol>
                    <IonCol className="ion-text-right">Action</IonCol>
                  </IonRow>
                  {events}
                </IonGrid>

              </IonCol>
            </IonRow>
          </IonCol>

        </IonRow>
      </IonContent>
    </IonApp>
  );
};

export default EventPage;
