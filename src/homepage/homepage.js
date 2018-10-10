import React from 'react'
import './homepage.scss'

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
  counter = () => {
    event.preventDefault
    if (this.state.clickCounter === 20) {
      console.log('no more clicks until you sign in')
    }else {
      //the function that makes the api call
      console.log(`clicked ${this.state.clickCounter}`)
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
        <button onClick={this.counter}> get forecast </button>
        <p className='plug'> Sign in to save your locations <br/> and customize your glances </p>
      </div>
    )
  }
}
export default Homepage
