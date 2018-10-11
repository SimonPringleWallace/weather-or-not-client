import React from  'react'
export const cities = ['Select','Tampa','Natick','Cambridge',
  'Somerville', 'Worcester','Springfield',
  'Lenox','Sturbridge']

export const cityOptions = cities.map(city => {
  return <option key={city} value={city}>{city}</option>
})
