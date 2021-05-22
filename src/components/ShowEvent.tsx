import { IonContent, IonIcon, IonPage, IonTitle, IonGrid, IonCardSubtitle, IonRow, IonCol, useIonModal, IonItem, useIonToast, useIonLoading, IonButton } from '@ionic/react'
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { closeOutline } from 'ionicons/icons'

import { QUERY_GET_EVENT } from '../queries/GetEvent'

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

export default ShowEvent
