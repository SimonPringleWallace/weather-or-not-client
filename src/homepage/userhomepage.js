import React from 'react'
import './homepage.scss'
import axios from 'axios'
import {getLocations, apiCreateLocation, apiDestroyLocation} from './homepage_api.js'
import {Umbrella, QuestionMark, AllClear} from './weatherImages.js'
import {cities, cityOptions} from './citieshandling.js'
import LocationCard from './locationcard.js'
import './userhomepage.scss'
// import AllClear from './AllClear.js'

class UserHomepage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locations:[],
      usState: 'MA'
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
          this.setState(this.setState({locationError: true}))
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
    const props = e.target.getAttribute('longitude')
    await this.setState({selectedCity: e.target.value})
    console.log(props)
  }

  destroyLocation = async (id) => {
    const locations = this.state.locations
    const index = locations.findIndex(location => location.id === id)
    const response = await apiDestroyLocation(this.props.user, id)
      .then(async(response) => {
        if (response.ok) {
          console.log(response.ok)
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
        {this.state.locations.map(location => (
          <LocationCard
            onDelete={this.destroyLocation.bind(this)}
            key={location.id}
            user={this.props.user}
            id={location.id}
            city={location.city}
            state={location.state}
            longitude={location.longitude}
            latitude={location.latitude}
          />
        ))}
      </div>
    )
  }
}
export default UserHomepage
