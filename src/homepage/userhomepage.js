import React from 'react'
import './homepage.scss'
import axios from 'axios'
import {getLocations, apiCreateLocation, apiDestroyLocation} from './homepage_api.js'
import {Umbrella, QuestionMark, AllClear} from './weatherImages.js'
import {cities, cityOptions, handleSelec} from './citieshandling.js'
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
    let response = await getLocations(this.props.user)
    //parse this to JSON
    response = await response.json()
    //set the state to equal the response
    await this.setState({locations: response.locations})
  }

  userHasLocations = () => {
    if (this.state.locations.length === 0 ){
      return 'no locations yet'
    }
  }

  createLocation = async () => {
    const locations = this.state.locations
    let response = await apiCreateLocation(this.props.user, this.state)
    response = await response.json()
    locations.push(response.location)
    this.setState({locations: locations})
  }

  handleSelect = async (e) => {
    await this.setState({selectedCity: e.target.value})
  }

  destroyLocation = async (id) => {
    console.log('hi!')
    const locations = this.state.locations
    console.log(this)
    const index = locations.findIndex(location => location.id === id)
    const response = await apiDestroyLocation(this.props.user, id)
    console.log(response.ok)
    locations.splice(index, 1)
    this.setState({locations: locations})
  }

  render () {

    return (
      <div className="userhomepage-flex">
        <div>{this.userHasLocations()}</div>
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
