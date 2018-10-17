import React from 'react'
import {Card, Icon, Avatar } from 'antd'
import {Front, Back} from './cardsides'
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
        <div className={'flipper' + (this.props.flipped ? ' flipped' : '')} onClick={this.props.flip}>
          <Front>The front!</Front>
          <Back>The back!</Back>
          {/* <Card
            onClick={this.getLocationForecast.bind(this, this.props.city)}
            bodyStyle={{width: 200}}
            cover={<img alt="example" onClick={this.props.flip} src={require('../header/weather-or-not-logo.png')} />}
            actions={[<Card key={this.props.id}/>, <Icon key={this.props.id} onClick={this.destroyLocation.bind(this, this.props.id)} type="delete" />, <Icon key={this.props.id + 1} type="edit" />, <Icon key={this.props.id + 2} type="ellipsis" />]}
          >
            <Meta
              title={`${this.props.city}, ${this.props.usState}`}
              description="This is the description"
            />
          </Card> */}
        </div>
      </div>
    )
  }
}
export default Flipcard
