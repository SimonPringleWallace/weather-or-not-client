import apiUrl from './../apiConfig.js'

export const foreCastIndex = (city, state) => {
  return fetch(`${apiUrl}/forecast/${city},${state}`, {
    method: 'GET'
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

export const apiDestroyLocation = (user, id) => {
  return fetch(`${apiUrl}/locations/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}

export const apiCreateLocation = (user, state) => {
  return fetch(apiUrl + '/locations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    },
    body: JSON.stringify({
      locations: {
        city: state.selectedCity,
        state: state.usState,
        latitude: null,
        longitude: null,
        user_id: user.id
      }
    })
  })
}
