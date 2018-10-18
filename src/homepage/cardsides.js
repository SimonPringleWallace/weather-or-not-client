import React from 'react'
import {Card, Icon, Avatar } from 'antd'
import 'antd/dist/antd.css'
const { Meta } = Card
import './locationcard.scss'


export const Front = ({city, usState, id, flip, onDelete, getForecast}) => {


  return (
    <Card className='front'
      hoverable
      // onClick={this.getLocationForecast.bind(this, this.props.city)}
      bodyStyle={{width: 200}}
      cover={<img alt="example" src={require('../header/weather-or-not-logo.png')} onClick={flip} />}
      actions={[<Card key={id}/>, <Icon key={id} onClick={onDelete.bind(this, id)} type="delete" />, <Icon key={id + 1} type="edit" />, <Icon key={id + 2} type="ellipsis" />]}
    >
      <Meta
        title={`${city}, ${usState}`}
        description="This is the description"
      />
    </Card>
  )
}



export const Back = ({flip}) => (
  <div className='back' onClick={flip}>The Back!</div>
)
