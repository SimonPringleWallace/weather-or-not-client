import React from 'react'
import {destroyLocation} from './homepage_api.js'
import { DatePicker, Card, Icon, Avatar } from 'antd'
import './locationcard.scss'
import 'antd/dist/antd.css'
const { Meta } = Card

class LocationCard extends React.Component {
  destroyLocation(id) {
    this.props.onDelete(id)
  }
  getLocationForecast(city,usState){
    this.props.getForecast(city, usState)
  }

  render () {
    return (
      <div className='location-card'>
        <Card
          onClick={this.getLocationForecast.bind(this, this.props.city)}
          bodyStyle={{width: 200}}
          cover={<img alt="example" src={require('../header/weather-or-not-logo.png')} />}
          actions={[<Card key={this.props.id} onClick={this.getLocationForecast.bind(this, this.props.city)} />, <Icon key={this.props.id} onClick={this.destroyLocation.bind(this, this.props.id)} type="delete" />, <Icon key={this.props.id + 1} type="edit" />, <Icon key={this.props.id + 2} type="ellipsis" />]}
        >
          <Meta
            title={`${this.props.city}, ${this.props.usState}`}
            description="This is the description"
          />
        </Card>
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
