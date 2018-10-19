import React from 'react'
import {Card, Icon, Avatar } from 'antd'
import 'antd/dist/antd.css'
const { Meta } = Card
import './locationcard.scss'


export const Front = ({city, usState, id, flip, onDelete}) => {
// set a variable to equal the file names of the images that I want for the
//image


  return (
    <Card className='front'
      hoverable
      bodyStyle={{width: 200}}
      cover={<img alt="example" src={require('../header/weather-or-not-logo.png')} onClick={flip.bind(this, city)} />}
      actions={[<Card key={id}/>, <Icon key={id} onClick={onDelete.bind(this, id)} type="delete" />, <Icon key={id + 1} type="edit" />, <Icon key={id + 2} type="ellipsis" />]}
    >
      <Meta
        title={`${city}, ${usState}`}
        description="This is the description"
      />
    </Card>
  )
}

export const Back = ({flip, rainStatus, barometricPress, percentPercip}) => {

// select which image to display based off of the results from darksky
  const chooseImage = () => {
    if (rainStatus){
      const umbrella = require('./images/umbrella.png')
      return umbrella
    }else{
      const sun = require('./images/sun.png')
      return sun
    }
  }

  return (
    <Card className='back'
      hoverable
      cover={<img alt="example" src={chooseImage()} onClick={flip} />}
    >
      <Meta
        title= {`Barometric Pressure ${barometricPress}`}
        description={percentPercip}
      />
    </Card>
  )
}
