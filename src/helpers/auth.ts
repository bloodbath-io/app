export const isAuthenticated = () => {
  if (localStorage.getItem('apiKey') !== null) return true
  return false
}