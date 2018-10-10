import React from 'react'
import './homepage.scss'
import axios from 'axios'
import foreCastIndex from './homepage_api.js'

class Homepage extends React.Component {
  constructor(){
    super()
    this.state = {
      cities: ['Select','Boston','Natick','Cambridge',
        'Somerville', 'Worcester','Springfield',
        'Lenox','Sturbridge'],
      usState:'MA',
      forecast: [],
      clickCounter: 0,
      selectedCity:''
    }
  }

  // handle get forecast submit
  counter = (e) => {
    e.preventDefault
    // create a limit to the number of API calls to 5 in a session
    if (this.state.clickCounter === 5) {
      console.log('no more clicks until you sign in')
    }else {

      // have to figure out how to access the value of the item selected from the drop down
      // then it should be stored in state or props or whatever and used to make the call to the api

      // the function that makes the api call
      foreCastIndex(this.state.selectedCity)
        .then((response) =>response.json())
        .then((data) => {
          // increment the counter by one for the session.
          const clicks = this.state.clickCounter + 1
          //reset the clickCounter number nad the forecast to be the value of
          //the first daily value(today) returned from the API call.
          this.setState({clickCounter: clicks, forecast: data.daily.data[0]})
        })
        .then(console.log(this.state.forecast))
        .catch(error => {
          return error
        })

    }
  }

  //To handle a user selecting a city from the dropdown menu
  handleSelect = (e) => {
    this.setState({selectedCity: e.target.value})
    console.log(`this.state.selected city is ${this.state.selectedCity}`)
  }


  render () {

    // generate options for the drop down menu
    const cityOptions = this.state.cities.map(city => {
      return <option key={city} value={city}>{city}</option>
    })

    // toggle whether to show the question mark or the weather symbols
    let className = 'umbrella-or-no'
    this.state.forecast.length === 0 ? className ='umbrella-or-no-question' : ''
    //else if the length is greater than 0, check to see if the string contains 'rain'
    // if it does, give them the umbrella

    return (
      <div className="homepage-flex">
        <h4> Need that Umbrella? </h4>
        <div>Choose your city</div>
        <select onChange={this.handleSelect}>{cityOptions}</select>
        <div className={className}></div>
        <form onSubmit={this.counter}><button> get forecast</button> </form>
        <p className='plug'> Sign in to save your locations <br/> and customize your glances </p>
      </div>
    )
  }
}
export default Homepage
