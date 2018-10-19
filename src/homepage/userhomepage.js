import React from 'react'
import './homepage.scss'
import axios from 'axios'
import {forecastIndex, getLocations, apiCreateLocation, apiDestroyLocation} from './homepage_api.js'
import {Umbrella, QuestionMark, AllClear} from './weatherImages.js'
import {cities, cityOptions} from './citieshandling.js'
import LocationCard from './locationcard.js'
import './locationcard.scss'
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
          //parse this to JSON
          response = await response.json()
          //set the state to equal the response
          await this.setState({locations: response.locations})
        } else {
          // if response.ok is false
          this.setState(this.setState({locationError: true, rainStatus: null}))
        }
      })
      .catch(() => {this.setState({locationError: true})})
  }

  createLocation = async () => {
    // stash the current state's locations in a constant
    const locations = this.state.locations
    // make the request to creat the location
    const response = await apiCreateLocation(this.props.user, this.state)
      .then(async(response) => {
        if (response.ok) {
          response = await response.json()
          // add the location in the response to the array of locations
          // that was captured from state
          locations.push(response.location)
          // reset the state to include the location that was create
          //meaning that the new location will instantly appear on the screen
          this.setState({locations: locations})
        }else {
          this.setState(this.setState({createError: true}))
        }
      })
      .catch(() => {this.setState({locationError: true})})
  }

  handleSelect = async (e) => {
    await this.setState({selectedCity: e.target.value})
  }

  destroyLocation = async (id) => {
    // stash the current state's locations in a constant
    const locations = this.state.locations
    // make the request to creat the location
    const index = locations.findIndex(location => location.id === id)
    //declare the index within const locations of the location to be deleted
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
        <div className='card-flex'>
          {this.state.locations.map(location => (
            <LocationCard
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
