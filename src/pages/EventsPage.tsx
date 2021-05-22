import { IonContent, IonModal, IonIcon, IonPage, IonBackButton, IonTitle, IonGrid, IonCardSubtitle, IonRow, IonCol, useIonModal, IonItem, useIonToast, useIonLoading, IonButton } from '@ionic/react'
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import MainHeaderComponent from '../components/MainHeaderComponent'
import { closeOutline } from 'ionicons/icons'

import { QUERY_LIST_EVENTS } from '../queries/ListEvents'
import { QUERY_GET_EVENT } from '../queries/GetEvent'
import { MUTATION_REMOVE_EVENT } from '../queries/RemoveEvent'

import { client } from './../Client'

interface ShowEventProps {
  // children: React.ReactNode
  setShowModal: any
  id: string
}


const ShowEvent: React.FC<ShowEventProps> = ({ id, setShowModal, ...rest }) => {
  const [toast, dismissToast] = useIonToast()
  const { loading, error, data } = useQuery(QUERY_GET_EVENT, { variables: { id }, client })

  if (error) {
    toast({
      message: `Woops! ${error.message}`,
      duration: 2000,
      buttons: [{ text: 'hide', handler: () => dismissToast() }],
    })
  }

  if (!data) return (<></>)

  const event = data.getEvent

  return (
    <IonPage>
      <IonContent fullscreen>

        <IonRow className="ion-justify-content-left">
          <IonCol>

            <IonItem>
              <IonTitle>
                Occurrence
              </IonTitle>
              <IonButton onClick={() => { setShowModal(false) }}  color="secondary">
                <IonIcon icon={closeOutline} />
              </IonButton>
            </IonItem>

            <IonGrid className="ion-margin table-custom">
              <IonRow>
                <IonCol className="table-header" size="1">
                  ID
                </IonCol>
                <IonCol className="ion-align-items-end ion-text-end">
                  {event.id}
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCol>
        </IonRow>

        <IonRow className="ion-justify-content-left">
          <IonCol>

            <IonItem>
              <IonTitle>
                State
              </IonTitle>
            </IonItem>

            <IonGrid className="ion-margin table-custom">
              <IonRow>
                <IonCol className="table-header">
                  Created at
                </IonCol>
                <IonCol>
                  {event.insertedAt}
                </IonCol>
              </IonRow>
              <IonRow className="table-record">
                <IonCol className="table-header">
                  Last updated at
                </IonCol>
                <IonCol>
                  {event.updatedAt}
                </IonCol>
              </IonRow>
              <IonRow className="table-record">
                <IonCol className="table-header">
                  Scheduled for
                </IonCol>
                <IonCol>
                  {event.scheduledFor}
                </IonCol>
              </IonRow>
              <IonRow className="table-record">
                <IonCol className="table-header">
                  Enqueued at
                </IonCol>
                <IonCol>
                  {event.enqueuedAt}
                </IonCol>
              </IonRow>
              <IonRow className="table-record">
                <IonCol className="table-header">
                  Locked at
                </IonCol>
                <IonCol>
                  {event.lockedAt}
                </IonCol>
              </IonRow>
              <IonRow className="table-record">
                <IonCol className="table-header">
                  Dispatched at
                </IonCol>
                <IonCol>
                  {event.dispatchedAt}
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>

            <IonItem>
              <IonTitle>
                Payload
              </IonTitle>
            </IonItem>

            <IonGrid className="ion-margin table-custom">
              <IonRow>
                <IonCol className="table-header">
                  Endpoint
                </IonCol>
                <IonCol>
                  {event.endpoint}
                </IonCol>
              </IonRow>
              <IonRow className="table-record">
                <IonCol className="table-header">
                  Method
                </IonCol>
                <IonCol>
                  {event.method}
                </IonCol>
              </IonRow>
              <IonRow className="table-record">
                <IonCol className="table-header">
                  Headers
                </IonCol>
                <IonCol>
                  {event.headers}
                </IonCol>
              </IonRow>
              <IonRow className="table-record">
                <IonCol className="table-header">
                  Body
                </IonCol>
                <IonCol>
                  {event.body}
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCol>
        </IonRow>

      </IonContent>
    </IonPage>
  )
}

let loadingSpawned = false

const EventPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [toast, dismissToast] = useIonToast()
  const [showLoading, dismissLoading] = useIonLoading();
  const [mutationRemoveEvent] = useMutation(MUTATION_REMOVE_EVENT, {
    refetchQueries: [{ query: QUERY_LIST_EVENTS }],
  })
  const { loading, error, data } = useQuery(QUERY_LIST_EVENTS)

  // const [showModal,] = useIonModal(ShowEvent, { id })

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
    for (const [index, value] of data.listEvents.entries()) {

      const deleteButton = value.lockedAt ? null : (
        <IonButton onClick={() => { clickRemoveEvent(value.id) }}>Delete</IonButton>
      )

      events.push(
        <IonRow className="table-body" key={index}>
          <IonCol size="2">{value.id}</IonCol>
          <IonCol size="1">{value.method}</IonCol>
          <IonCol size="1">{value.endpoint}</IonCol>
          <IonCol size="1">{value.headers}</IonCol>
          <IonCol size="1">{value.body}</IonCol>
          <IonCol size="1">{value.scheduledFor}</IonCol>
          <IonCol size="1">{value.enqueuedAt}</IonCol>
          <IonCol size="1">{value.lockedAt}</IonCol>
          <IonCol size="1">{value.dispatchedAt}</IonCol>
          <IonCol size="2" className="ion-text-right">
            <IonButton color="secondary" onClick={() => { setShowModal(true) }}>Show</IonButton>
            {deleteButton}
            <IonContent>
              <IonModal isOpen={showModal}>
                <ShowEvent id={value.id} setShowModal={setShowModal} />
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
