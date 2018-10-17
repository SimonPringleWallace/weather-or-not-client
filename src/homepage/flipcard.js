import React from 'react'
import {Front, Back} from './cardsides'
import {Card, Icon, Avatar } from 'antd'
import 'antd/dist/antd.css'
const { Meta } = Card
import './locationcard.scss'

class Flipcard extends React.Component {

  getLocationForecast(city){
    this.props.getForecast(city)
  }
  destroyLocation(id) {
    this.props.onDelete(id)
  }

  render () {
    return (
      <div className='location-card'>
        <div className={'flipper' + (this.props.flipped ? ' flipped' : '')}>
          <Front
            onDelete={this.destroyLocation.bind(this)}
            flip={this.props.flip}
            flipped={this.props.flipped}
            city = {this.props.city}
            id = {this.props.id}
            usState={this.props.usState}
          />
          <Back
            flip={this.props.flip}
          />
        </div>
      </div>
    )
  }
}
export default Flipcard
