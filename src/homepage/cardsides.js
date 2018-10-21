import React from 'react'
import {Card, Icon, Avatar } from 'antd'
import 'antd/dist/antd.css'
const { Meta } = Card
import './locationcard.scss'


export const Front = ({city, usState, id, flip, onDelete}) => {
// set a variable to equal the file names of the images that I want for the
//image


  return (
    <div className='front'>
      <Card
        hoverable
        cover={<img alt="example" src={require('../header/weather-or-not-logo.png')}  />}
        actions={[<Icon key={id} onClick={onDelete.bind(this, id)} type="delete" />]}
      >
        <Meta
          title={`${city}, ${usState}`}
          description="Click here for the prediction"
          onClick={flip.bind(this, city)}
        />
      </Card>
    </div>
  )
}

export const Back = ({city, usState, flip, rainStatus, barometricPress, percentPercip}) => {

// select which image to display based off of the results from darksky
  const chooseImage = () => {
    if (rainStatus === null){
      const logo = require('../header/weather-or-not-logo.png')
      return logo
    }else if (rainStatus  === true){
      const umbrella = require('./images/umbrella.png')
      return umbrella
    }else{
      const sun = require('./images/sun.png')
      return sun
    }
  }
  const percentage = {percentPercip} * 100

  return (
    <div className='back'>
      <Card
        hoverable
        cover={<img alt="example" src={chooseImage()} onClick={flip} />}
      >
        <Meta
          title= {`${city}, ${usState}`}
          description={percentage}
        />
      </Card>
    </div>
  )
}
