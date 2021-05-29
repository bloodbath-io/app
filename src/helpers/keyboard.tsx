export const pressEnter = (event: any, callback: any) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    callback()
  }
}
