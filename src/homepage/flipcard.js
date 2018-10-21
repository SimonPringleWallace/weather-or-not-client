import React from 'react'
import {Front, Back} from './cardsides'
import {Card, Icon, Avatar } from 'antd'
import 'antd/dist/antd.css'
const { Meta } = Card

class Flipcard extends React.Component {
  constructor(){
    super()
    this.state={

    }
  }
  flip(city){
    this.props.flip(city)
  }
  destroyLocation(id) {
    this.props.onDelete(id)
  }

  render () {
    return (
      <div className='location-card'>
        <div className={'flipper' + (this.props.flipped ? ' flipped' : '')}>
          <Front
            // getForecast={this.getLocationForecast.bind(this)}
            onDelete={this.destroyLocation.bind(this)}
            flip={this.props.flip.bind(this)}
            flipped={this.props.flipped}
            city = {this.props.city}
            id = {this.props.id}
            usState={this.props.usState}
          />
          <Back
            flip={this.props.flip}
            rainStatus={this.props.rainStatus}
            barometricPress={this.props.barometricPress}
            percentPercip={this.props.percentPercip}
            city={this.props.city}
            usState={this.props.usState}
          />
        </div>
      </div>
    )
  }
}
export default Flipcard
