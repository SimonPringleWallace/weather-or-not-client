import React from 'react'
import {destroyLocation} from './homepage_api.js'
import { DatePicker, Card, Icon, Avatar } from 'antd'
import Flipcard from './flipcard'
import './locationcard.scss'
import 'antd/dist/antd.css'
const { Meta } = Card

class LocationCard extends React.Component {
  constructor() {
    super()
    this.state = {
      flipper: false
    }
  }
  destroyLocation(id) {
    this.props.onDelete(id)
  }
  getLocationForecast(city){
    this.props.getForecast(city)
  }
  flip = () => {
    this.setState({ flipped: !this.state.flipped })
    console.log(this.state.flipped)
  }

  render () {
    return (
      <div className='location-card'>
        <Flipcard
          flip = {this.flip}
          flipped = {this.state.flipped}
          onDelete = {this.destroyLocation.bind(this)}
          getForecast = {this.getLocationForecast.bind(this)}
          city = {this.props.city}
          id = {this.props.id}
          usState={this.props.usState}
        >
        </Flipcard>
      </div>
      /* <div className='location-card-flex'>
        <a className='getForecast' onClick={this.getLocationForecast.bind(this, this.props.city)}>
          <div>
            <DatePicker>pick dates</DatePicker>
            <p>{this.props.city}</p>
            <p>{this.props.usState}</p>
            <p>{this.props.longitude}</p>
            <p>{this.props.latitude}</p>
            <p>click for the weather</p>
          </div>
        </a>
        <button value={this.props.id} onClick={this.destroyLocation.bind(this, this.props.id)}>Destroy!!!</button>
      </div> */
    )
  }
}
export default LocationCard
