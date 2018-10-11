import React from 'react'
import './homepage.scss'
import axios from 'axios'
import {foreCastIndex} from './homepage_api.js'
import {cities, cityOptions} from './citieshandling.js'
import {Umbrella, QuestionMark, AllClear, PleaseSignIn} from './weatherImages.js'
import messages from '../auth/messages.js'
// import AllClear from './AllClear.js'

class Homepage extends React.Component {
  constructor() {
    super()
    this.state = {
      usState:'MA',
      forecast: '',
      clickCounter: 0,
      selectedCity:'',
      rainStatus: null
    }
  }


  // handle get forecast submit
  counter = async (e) => {
    e.preventDefault
    // create a limit to the number of API calls to 5 in a session
    if (this.state.clickCounter <= 8) {
      // check to make sure that the user has selected a location for forecast
      if (this.state.selectedCity) {
        // increment the click counter by one for the session to prevent spamming
        const clicks = this.state.clickCounter + 1
        this.setState({clickCounter: clicks})
        // transform forecast into lowercase and then a string
        const response = await foreCastIndex(this.state.selectedCity, this.state.usState)
          .then(async(response) => {
            if (response.ok) {
              this.setState({error: false})
              response = await response.json()
              //the first daily value(today) returned from the API call.
              await this.setState({forecast: response.daily.data[0].summary})
              // split the summary into individual words for analyzing
              const words = await this.state.forecast.toLowerCase().split(' ')
              // search for the word 'rain' or 'raining'
              if (words.indexOf('rain') >= 0){
                this.setState({rainStatus: true})
              }else if (words.indexOf('raining') >= 0){
                this.setState({rainStatus: true})
              }else{
                this.setState({rainStatus: false})
              }
            }else{
              this.setState({error: true})
            }
          })
          .catch(() => {this.setState({error: true})})
        //convert response to json
      }else{
        // TODO Handle error
      }
    }
  }


  //To handle a user selecting a city from the dropdown menu
  handleSelect = async (e) => {
    // set state equal to result of the api call
    await this.setState({selectedCity: e.target.value})
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
        <div>Choose your city to <br/> find out</div>
        <select onChange={this.handleSelect}>{cityOptions}</select>
        <div className='weather-image-container'>{this.selectComponents()}</div>
        <form onSubmit={this.counter}><button> get forecast</button> </form>
        <p className='plug'> Sign in to save your locations <br/> and customize your glances </p>
      </div>
    )
  }
}
export default Homepage
