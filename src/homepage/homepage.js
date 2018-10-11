import React from 'react'
import './homepage.scss'
import axios from 'axios'
import {foreCastIndex} from './homepage_api.js'
import {cities, cityOptions} from './citieshandling.js'
import {Umbrella, QuestionMark, AllClear, PleaseSignIn} from './weatherImages.js'
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
      if (this.state.forecast) {
        // increment the click counter by one for the session to prevent spamming
        const clicks = this.state.clickCounter + 1
        this.setState({clickCounter: clicks})
        // transform forecast into lowercase and then a string
        const words = await this.state.forecast.toLowerCase().split(' ')
        // search for the word 'rain' or 'raining'
        if (words.indexOf('rain') >= 0){
          this.setState({rainStatus: true})
        }else if (words.indexOf('raining') >= 0){
          this.setState({rainStatus: true})
        }else{
          this.setState({rainStatus: false})
        }
      }
    }
  }


  //To handle a user selecting a city from the dropdown menu
  handleSelect = async (e) => {
    await this.setState({selectedCity: e.target.value})
    console.log(`this.state.selected city is ${this.state.selectedCity}`)
    // set response equal to result of the api call
    let response = await foreCastIndex(this.state.selectedCity, this.state.usState)
    //convert response to json
    response = await response.json()
    //the first daily value(today) returned from the API call.
    this.setState({forecast: response.daily.data[0].summary})
  }

  selectComponents = () => {
    if (this.state.clickCounter <= 7) {
      if (this.state.rainStatus === null) {
        return <QuestionMark/>
      } else if (this.state.rainStatus === true) {
        return <Umbrella/>
      } else{
        return <AllClear/>
      }
    }else{
      return <PleaseSignIn />
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
