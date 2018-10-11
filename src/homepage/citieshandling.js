import React from  'react'
export const cities = [
  'Select',
  'Tampa': {
    latitude: '27.964157',
    longitude: '-82.452606'
  },
  'Natick': {
    latitude: '42.2833333',
    longitude: '-71.35'
  },
  'Cambridge': {
    latitude: '42.3736',
    longitude: '-71.1097'
  },
  'Somerville': {
    latitude: '42.3876',
    longitude: '-71.0995'
  },
  'Worcester': {
    latitude: '42.2626',
    longitude: '-71.8023'
  },
  'Springfield': {
    latitude: '42.1015',
    longitude: '-72.5898'
  },
  'Lenox': {
    latitude: '42.3565',
    longitude: '-73.2849'
  },
  'Sturbridge':{
    latitude: '42.1084',
    longitude: '-72.0787'
  }]

// provide options for the city drop down menu
export const cityOptions = cities.map(city => {
  return <option
    key={city}
    latitude={city.latitude}
    longitude={city.longitude}
    value={city}>{city}</option>
})
