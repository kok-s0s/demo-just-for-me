export function getToken() {
  return localStorage.getItem('token') as string
}

export function setToken(token: string) {
  return localStorage.setItem('token', token)
}

export function removeToken() {
  return localStorage.removeItem('token')
}
