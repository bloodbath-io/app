import { IonIcon } from '@ionic/react'
import { closeOutline } from 'ionicons/icons'

export const convertToBytes = (string: string) => {
  return (new TextEncoder().encode(string)).length
}

export const bytes = (string: string) => {
  if (string === null) return (
    <IonIcon icon={closeOutline}></IonIcon>
  )

  return (
    <>
    {convertToBytes(string)} Bytes
    </>
  )
}