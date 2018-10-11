import React from 'react'
import {destroyLocation} from './homepage_api.js'

class LocationCard extends React.Component {
  destroyLocation(id) {
    this.props.onDelete(id)
  }

  render () {
    return (
      <div>
        <p>{this.props.city}</p>
        <p>{this.props.state}</p>
        <p>{this.props.longitude}</p>
        <p>{this.props.latitude}</p>
        <button value={this.props.id} onClick={this.destroyLocation.bind(this, this.props.id)}>Destroy!!!</button>
      </div>
    )
  }
}
export default LocationCard
