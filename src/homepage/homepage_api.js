import apiUrl from './../apiConfig.js'

const foreCastIndex = (props) => {
  return fetch(apiUrl + '/forecast/' + props+',MA', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
}
export default foreCastIndex
