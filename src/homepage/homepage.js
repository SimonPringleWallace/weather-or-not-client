import React from 'react'
import './homepage.scss'
import axios from 'axios'
import {forecastIndex} from './../shared/weather_apis.js'
import {usStates, stateOptions} from './../shared/usStateshandling.js'
import {Umbrella, QuestionMark, AllClear, PleaseSignIn} from './../shared/weatherImages.js'
import messages from '../auth/messages.js'
// import AllClear from './AllClear.js'

class Homepage extends React.Component {
  constructor() {
    super()
    this.state = {
      usState:'AK',
      forecast: '',
      clickCounter: 0,
      selectedCity:'',
      rainStatus: null
    }
  }


  // handle get forecast submit
  counter = async (e) => {
    e.preventDefault()
    // create a limit to the number of API calls to 5 in a session
    if (this.state.clickCounter <= 8) {
      // check to make sure that the user has selected a location for forecast
      if (this.state.selectedCity) {
        // increment the click counter by one for the session to prevent spamming
        const clicks = this.state.clickCounter + 1
        this.setState({clickCounter: clicks})
        // transform forecast into lowercase and then a string
        const response = await forecastIndex(this.state.selectedCity, this.state.usState)
          .then(async(response) => {
            if (response.ok) {
              this.setState({error: false})
              response = await response.json()
              console.log(response)
              /* set the state to the probablity of percipitation and the
              barometric preassure of the first daily value(today) returned from
              the API call. */
              await this.setState({percentPercip: response.daily.data[0].precipProbability, barometricPress: response.daily.data[0].pressure})
              // if the barometric pressure is too high for rain to be reasonably likely
              if (this.state.barometricPress > 1014){
                await this.setState({rainStatus:false})
                /* check to see if the chance of percipitation is greater than 50%
                or the mb of pressure is below 1008*/
              }else if (this.state.percentPercip >= .5 || this.state.barometricPress < 1008) {
                await this.setState({rainStatus: true})
              }else {
                await this.setState({rainStatus: false})
              }
            }else{
              this.setState({error: true})
            }
          })
          .catch(() => {this.setState({error: true})})
      }
    }
    console.log(this.state.rainStatus)
    console.log(this.state.percentPercip)
    console.log(this.state.barometricPress)
  }


  // To handle a user selecting a state from the dropdown menu
  handleSelect = async (e) => {
    // set state equal to result of the api call
    await this.setState({usState: e.target.value})
    this.setState({rainStatus: null})
  }

  // handle a user's input into the search bar
  recordCity = (event) => {
    this.setState({selectedCity: event.target.value})
  }

  selectComponents = () => {
    if (!this.state.error) {
    // if the user hasn't been spamming the click button
      if (this.state.clickCounter <= 7) {
      // if there hasn't been a forecast made yet
        if (this.state.rainStatus === null) {
          return <QuestionMark/>
        // if there will be rain
        } else if (this.state.rainStatus === true) {
          return <Umbrella/>
        } else{
        //if there won't be rain
          return <AllClear/>
        }
      }else{
      // if they've clicked too many times
        return <PleaseSignIn />
      }
      // handle error
    }else {
      return ('Something bad happen, must be the weather, please try again')
    }
  }

  render () {

    return (
      <div className="homepage-flex">
        <h4> Need that Umbrella? </h4>
        <div>Enter your city and state to <br/> find out</div>
        <div className='input-flex'>
          <input placeholder='City' onChange={this.recordCity}></input>
          <select onChange={this.handleSelect}>{stateOptions}</select>
        </div>
        <div className='weather-image-container'>{this.selectComponents()}</div>
        <form onSubmit={this.counter}><button> get forecast</button> </form>
      </div>
    )
  }
}
export default Homepage
