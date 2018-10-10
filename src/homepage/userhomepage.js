import React from 'react'
import './homepage.scss'
import axios from 'axios'
import {getLocations} from './homepage_api.js'
import {Umbrella, QuestionMark, AllClear} from './weatherImages.js'
import LocationCard from './locationcard.js'
import './userhomepage.scss'
// import AllClear from './AllClear.js'

class UserHomepage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locations:[]
    }
  }
  // when component mounts
  componentDidMount = async () => {
    //set response to equal API response
    let response = await getLocations(this.props.user)
    //parse this to JSON
    response = await response.json()
    //set the state to equal the response
    this.setState({locations: response.locations})
  }
  // this shoudl trigger a get request to see all the user locations
  seeState = () => {
    console.log(locations)
  }

  render () {

    return (
      <div className="userhomepage-flex">
        <div>signed in view</div>
        {this.state.locations.map(location => (
          <LocationCard
            key={location.id}
            city={location.city}
            state={location.state}
            longitude={location.longitude}
            latitude={location.latitude}
          />
        ))}
        <button onClick={this.seeState}></button>
      </div>
    )
  }
}
export default UserHomepage
