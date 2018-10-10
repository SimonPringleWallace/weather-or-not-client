import React from 'react'

const LocationCard = ({city, state, longitude, latitude}) => (
  <div>
    <p>{city}</p>
    <p>{state}</p>
    <p>{longitude}</p>
    <p>{latitude}</p>
  </div>
)
export default LocationCard
