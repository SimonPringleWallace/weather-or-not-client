import React from 'react'
import {destroyLocation} from './homepage_api.js'
import './locationcard.scss'

class LocationCard extends React.Component {
  destroyLocation(id) {
    this.props.onDelete(id)
  }
  getLocationForecast(city,usState){
    this.props.getForecast(city, usState)
  }

  render () {
    return (
      <div className='location-card-flex'>
        <a className='getForecast' onClick={this.getLocationForecast.bind(this, this.props.city)}>
          <div>
            <p>{this.props.city}</p>
            <p>{this.props.usState}</p>
            <p>{this.props.longitude}</p>
            <p>{this.props.latitude}</p>
            <p>click for the weather</p>
          </div>
        </a>
        <button value={this.props.id} onClick={this.destroyLocation.bind(this, this.props.id)}>Destroy!!!</button>
      </div>
    )
  }
}
export default LocationCard
