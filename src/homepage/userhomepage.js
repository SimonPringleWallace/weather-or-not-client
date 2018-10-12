import React from 'react'
import './homepage.scss'
import axios from 'axios'
import {foreCastIndex, getLocations, apiCreateLocation, apiDestroyLocation} from './homepage_api.js'
import {Umbrella, QuestionMark, AllClear} from './weatherImages.js'
import {cities, cityOptions} from './citieshandling.js'
import LocationCard from './locationcard.js'
import './userhomepage.scss'
// import AllClear from './AllClear.js'

class UserHomepage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: [],
      usState: 'MA',
      rainStatus: null,
    }
  }
  // when component mounts
  componentDidMount = async () => {
    //set response to equal API response
    const response = await getLocations(this.props.user)
      .then(async(response) => {
        if (response.ok) {
          console.log('response is ok')
          //parse this to JSON
          response = await response.json()
          //set the state to equal the response
          await this.setState({locations: response.locations})
        } else {
          this.setState(this.setState({locationError: true, rainStatus: null}))
        }
      })
      .catch(() => {this.setState({locationError: true})})
  }

  createLocation = async () => {
    const locations = this.state.locations
    const response = await apiCreateLocation(this.props.user, this.state)
      .then(async(response) => {
        if (response.ok) {
          response = await response.json()
          locations.push(response.location)
          this.setState({locations: locations})
        }else {
          this.setState(this.setState({createError: true}))
        }
      })
      .catch(() => {this.setState({locationError: true})})
  }

  handleSelect = async (e) => {
    await this.setState({selectedCity: e.target.value})
    console.log(this.activeCity)
  }

  destroyLocation = async (id) => {
    const locations = this.state.locations
    const index = locations.findIndex(location => location.id === id)
    const response = await apiDestroyLocation(this.props.user, id)
      .then(async(response) => {
        if (response.ok) {
          locations.splice(index, 1)
          this.setState({locations: locations})
        }else {
          this.setState(this.setState({destroyError: true}))
        }
      })
      .catch(() => {this.setState({destroyError: true})})
  }

   getLocationForecast = async (city) => {
     // create a limit to the number of API calls to 5 in a session
     this.setState({activeCity: city})
     const usState = 'MA'
     const response = await foreCastIndex(city, usState)
       .then(async(response) => {
         if (response.ok) {
           this.setState({error: false})
           console.log(this.state.error)
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
     console.log(this.state.activeCity)
   }

     selectComponents = () => {
       console.log(this.state.rainStatus)
       // if there hasn't been a forecast made yet
       if (this.state.rainStatus !== null) {
         if (this.state.rainStatus){
           return <Umbrella/>
         } else if(!this.state.rainStatus)
           return <AllClear/>
       }
     }
     //returns the sun when the page loads now its backwards...


  errorMessage = () => {
    if (this.state.locationError) {
      return 'you might have locations but we couldn\'t get them, please try again'
    }else if (this.state.createError) {
      return 'we couldn\'t create that location please try again'
    } else if (this.state.destroyError) {
      return 'we couldn\'t delete that location, you\'re stuck with it'
    }
  }

  render () {

    return (
      <div className="userhomepage-flex">
        <div className='errordiv'>{this.errorMessage()}</div>
        <div>Track a new location</div>
        <select onChange={this.handleSelect}>{cityOptions}</select>
        <button onClick={this.createLocation}> Track it!</button>
        <div>{this.state.activeCity}</div>
        <div className='weather-prediction'>{this.selectComponents()}</div>
        <div className='card-flex'>
          {this.state.locations.map(location => (
            <LocationCard
              getForecast = {this.getLocationForecast.bind(this)}
              onDelete={this.destroyLocation.bind(this)}
              key={location.id}
              user={this.props.user}
              id={location.id}
              city={location.city}
              usState={location.state}
              longitude={location.longitude}
              latitude={location.latitude}
            />
          ))}
        </div>
      </div>
    )
  }
}
export default UserHomepage
