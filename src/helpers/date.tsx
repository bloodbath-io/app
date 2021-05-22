import Moment from 'react-moment'

import { IonIcon } from '@ionic/react'
import { closeOutline } from 'ionicons/icons'

export const fromNow = (date: any) => {
  if (date === null) return (
    <IonIcon icon={closeOutline}></IonIcon>
  )
  return (
  <Moment fromNow>{date}</Moment>
  )
}

export const exactDate = (date: any) => {
  if (date === null) return (
    <IonIcon icon={closeOutline}></IonIcon>
  )
  return (
  <Moment local format="YYYY/MM/DD HH:mm:ss">{date}</Moment>
  )
}