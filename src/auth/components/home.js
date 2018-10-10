import React from 'react'
import TheWeather from './weather.js'

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      weatherComponent: false
    }
  }
  getWeather = () => {
    this.setState({weatherComponent: !this.state.weatherComponent})
  }

  render() {
    return (
      <React.Fragment>
        <h1>Get the weather!</h1>
        <button onClick={this.getWeather}> get weather </button>
        {this.state.weatherComponent ? <TheWeather /> : null}

      </React.Fragment>
    )
  }
}

export default Home
