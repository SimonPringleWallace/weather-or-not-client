import React from 'react'
import {Card, Icon, Avatar } from 'antd'
import 'antd/dist/antd.css'
const { Meta } = Card
import './locationcard.scss'


export const Front = ({city, usState, id, flip, onDelete,}) => {
// set a variable to equal the file names of the images that I want for the
//image


  return (
    <Card className='front'
      hoverable
      onClick={flip.bind(this, city)}
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


// conditional statement for displaying images using the
// variable declared above based off of forecast prop
export const Back = ({flip}) => (
  <div className='back' onClick={flip}>The Back!</div>
)
