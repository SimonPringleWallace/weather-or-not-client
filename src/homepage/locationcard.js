import React from 'react'
import {destroyLocation} from './homepage_api.js'
import Flipcard from './flipcard'
import { forecastIndex } from './homepage_api.js'


class LocationCard extends React.Component {
  constructor() {
    super()
    this.state = {
      flipper: false,
      rainStatus: null
    }
  }
  destroyLocation(id) {
    this.props.onDelete(id)
  }


  // TODO save this data in state for each city so that a user doesn't have to get the
  // same data everytime they click

  flip = async (city) => {
    this.setState({ flipped: !this.state.flipped })
    if (!this.state.flipped) {
      if (typeof city === 'string') {
        const usState = 'MA'
        const response = await forecastIndex(city, usState)
          .then(async(response) => {
            if (response.ok) {
              this.setState({error: false})
              response = await response.json()
              /* set the state to the probablity of percipitation and the
              barometric preassure of the first daily value(today) returned from
              the API call. */
              await this.setState({percentPercip: response.daily.data[0].precipProbability, barometricPress: response.daily.data[0].pressure})
              /* check to see if the chance of percipitation is greater than 50%
              or the mb of pressure is below 1009*/
              if (this.state.barometricPress > 1014){
                await this.setState({rainStatus:false})
                /* check to see if the chance of percipitation is greater than 50%
                or the mb of pressure is below 1008*/
              }else if (this.state.precipProbability >= .5 || this.state.barometricPress < 1008) {
                await this.setState({rainStatus: true})
              }else {
                await this.setState({rainStatus: false})
              }
            }else{
              this.setState({error: true})
            }
          })
          .catch(() => {this.setState({error: true})})
      }
    }
  }

  render () {
    return (
      <div className='location-card'>
        <Flipcard
          // getForecast={this.getLocationForecast.bind(this)}
          // rain status state passed as prop
          flip = {this.flip.bind(this)}
          flipped = {this.state.flipped}
          onDelete = {this.destroyLocation.bind(this)}
          city = {this.props.city}
          id = {this.props.id}
          usState={this.props.usState}
          rainStatus = {this.state.rainStatus}
          barometricPress={this.state.barometricPress}
          percentPercip={this.state.percentPercip}
        >
        </Flipcard>
      </div>
    )
  }
}
export default LocationCard
