import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link to="/change-password">Change Password</Link>
    <Link to="/sign-out">Sign Out</Link>
    <Link to="/signed-in">Home</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up">Sign Up</Link>
    <Link to="/sign-in">Sign In</Link>
    <Link to="/">Home</Link>
  </React.Fragment>
)

// const alwaysOptions = (
//   <React.Fragment>
//
//   </React.Fragment>
// )

const Header = ({ user }) => (
  <div className='header-flex-box'>
    <header className="main-header">
      <img className='logo' src={require('./weather-or-not-logo.png')}/>
      <nav>
        { user && <span>Welcome, {user.email}</span>}
        { user ? authenticatedOptions : unauthenticatedOptions }
        {/* { alwaysOptions } */}
      </nav>
    </header>
    <hr/>
  </div>
)

export default Header
