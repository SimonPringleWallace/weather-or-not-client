import React from 'react'
import './homepage.scss'
import axios from 'axios'
import foreCastIndex from './homepage_api.js'

class Homepage extends React.Component {
  constructor(){
    super()
    this.state = {
      cities: ['Boston','Natick','Cambridge',
        'Sommerville', 'Worcester','Springfield',
        'Lenox','Sturbridge'],
      usState:'MA',
      forecast: [],
      clickCounter: 0
    }
  }

  // handle submit and also create a limit to the number of API calls in a session
  counter = (e) => {
    e.preventDefault
    if (this.state.clickCounter === 5) {
      console.log('no more clicks until you sign in')
    }else {

      // have to figure out how to access the value of the item selected from the drop down
      // then it should be stored in state or props or whatever and used to make the call to the api

      // the function that makes the api call
      foreCastIndex(this.state.cities[1])
        .then((response) =>response.json())
        .then((data) => {
          console.log(data)
        })
        .catch(error => {
          return error
        })
      // .then(console.log(data))


      // this.setState({forecast: response})
      // console.log(`clicked ${this.state.clickCounter}`)
      const clicks = this.state.clickCounter + 1
      this.setState({clickCounter: clicks})
    }
  }

  render () {

    // generate options for the drop down menu
    const cityOptions = this.state.cities.map(city => {
      return <option key={city} value={city}>{city}</option>
    })

    // toggle whether to show the question mark or the weather symbols
    let className = 'umbrella-or-no'
    this.state.forecast.length === 0 ? className ='umbrella-or-no-question' : ''

    return (
      <div className="homepage-flex">
        <h4> Need that Umbrella? </h4>
        <div>Choose your city</div>
        <select>{cityOptions}</select>
        <div className={className}></div>
        <form onSubmit={this.counter}><button> get forecast</button> </form>
        <p className='plug'> Sign in to save your locations <br/> and customize your glances </p>
      </div>
    )
  }
}
export default Homepage
