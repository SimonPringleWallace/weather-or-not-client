import React from 'react'
import {destroyLocation} from './homepage_api.js'
import Flipcard from './flipcard.js'
import './locationcard.scss'

class LocationCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      flipped: false
    }
  }
  // declared here but passed to userhomepage
  destroyLocation(id) {
    this.props.onDelete(id)
  }

  // declared here but passed to userhomepage
  getLocationForecast(city,usState){
    this.props.getForecast(city, usState)
  }

  //trigger the card clip when a card is clicked
  flip = () => (
    console.log('I flip!!')
    // this.setState({flipped: !this.state.flipped})
  )

  render () {
    return (
      <React.Fragment>
        <Flipcard
          flip={this.flip.bind(this)}
          flipped={this.state.flipped}
          id={this.props.id}
          onDelete={this.destroyLocation.bind(this)}
          city={this.props.city}
          usState={this.props.usState}
        >
        </Flipcard>
      </React.Fragment>
    )
  }
}
export default LocationCard
