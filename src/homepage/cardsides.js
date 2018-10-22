import React from 'react'
import {Card, Icon, Avatar } from 'antd'
import 'antd/dist/antd.css'
const { Meta } = Card
import './locationcard.scss'


export const Front = ({city, usState, id, flip, onDelete}) => {
// set a variable to equal the file names of the images that I want for the
//image


  return (
<<<<<<< Updated upstream
    <div className='front' onClick={flip.bind(this, city)}>
      <div className='weather-container'><img className='card-logo' src={require('../header/weather-or-not-logo.png')}/>
        <p className='location'>{city}, {usState}</p>
        <p>Click for the forecast</p>
        <button onClick={onDelete.bind(this, id)}> Remove Location</button>
      </div>
    </div>
=======
    <Card className='front'
      hoverable
      bordered
      bodyStyle={{width: 200}}
      cover={<img alt="example" src={require('../header/weather-or-not-logo.png')} onClick={flip.bind(this, city)} />}
      actions={[<Icon key={id} onClick={onDelete.bind(this, id)} type="delete" />]}
    >
      <Meta
        title={`${city}, ${usState}`}
        description="This is the description"
      />
    </Card>
>>>>>>> Stashed changes
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
  const percentage = percentPercip * 100

  return (
    <div className='back' onClick={flip.bind(this, city)}>
      <div className='weather-container'><img className='card-logo' src={chooseImage()}/>
        <p className='location'>{city}, {usState}</p>
      </div>
    </div>
  )
}
