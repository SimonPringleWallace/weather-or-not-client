import apiUrl from './../apiConfig.js'

export const foreCastIndex = (city, state) => {
  return fetch(`${apiUrl}/forecast/${city},${state}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

export const getLocations = (user) => {
  return fetch(apiUrl + '/locations', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}
