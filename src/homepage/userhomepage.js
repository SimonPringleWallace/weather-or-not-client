import React from 'react'
import './homepage.scss'
import axios from 'axios'
import foreCastIndex from './homepage_api.js'
import {Umbrella, QuestionMark, AllClear} from './weatherImages.js'
// import AllClear from './AllClear.js'

class UserHomepage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      state: null
    }
  }

  // // try to see / access the user props
  //   componentDidMount (
  //     // this shoudl trigger a get request to see all the user locations
  //   seeProps = () => {
  //     console.log(this.props.user)
  //   }
  // )
  render () {

    return (
      <div className="homepage-flex">
        <div> user Homepage </div>

      </div>
    )
  }
}
export default UserHomepage
