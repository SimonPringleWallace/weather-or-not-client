import dotenv from 'dotenv'
import React, { Component } from 'react'
import axios from 'axios'
import './weather.css'
import daysOfTheWeek from './daysOfTheWeek.js'

// import DK_KEY from '../../.keys.js'

class TheWeather extends Component {
  constructor(props) {
    super(props)
    this.state = {
      forecast: []
    }
  }

  async  componentDidMount() {
    const response = await axios.get()
    console.log(respone)
    this.setState({forecast: response})
  }


  render() {
    // map through state to get hourly weather info
    const forecast = this.state.forecast.map(days => {
      // access the unix timestamp within the state data
      const utcTime = days.time
      // create a new date
      const date = new Date(0)
      // convert the Unix date in state to the JS data object
      date.setUTCSeconds(utcTime)
      const weekDay = daysOfTheWeek[date.getDay()]
      return (
        <li key={utcTime}>{`Today is ${weekDay}, ${date} the forecast is: ${days.summary}`}</li>
      )
    })

    return (
      <React.Fragment>
        <h3>the weather</h3>
        <ul>{forecast}</ul>
        {/* {console.log(`the state is ${this.state}`)}
        {console.log(this.state.forecast)} */}
      </React.Fragment>
    )
  }
}

export default TheWeather
