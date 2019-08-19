import React, { Component } from 'react'
import FarmerContainer from './FarmerContainer'
import CustomerContainer from './CustomerContainer'
import { Route, Redirect, withRouter } from 'react-router-dom'
import Login from '../Components/Login'
class MainContainer extends Component {
  state = {
    user: {}
  }

  logout = () => {
    this.setState({
      user: {}
    })
    localStorage.clear()
    // window.location.reload()
    this.props.history.push('/Login')
  }
  ////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////////
  updateLoggedInUser = newUser => {
    this.setState({
      user: newUser
    })
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  setBio = event => {
    this.setState({
      user: {
        ...this.state.user,
        biography: {
          ...this.state.user.biography,
          [event.target.name]: event.target.value
        }
      }
    })
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  componentDidMount() {
    //check to see if token, if exist, get user/userstate
    let token = localStorage.getItem('token')
    if (token) {
      fetch(`http://localhost:3000/users/`, {
        headers: {
          Authentication: `Bearer ${token}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          this.updateLoggedInUser(data)
          this.props.history.push('/Home')
        })
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    return (
      <div>
        {this.state.user.username ? (
          this.state.user.role === 'farmer' ? (
            <FarmerContainer
              farmer={this.state.user}
              bioHandler={this.setBio}
              sendBio={this.sendBio}
              logout={this.logout}
            />
          ) : (
            <CustomerContainer
              customer={this.state.user}
              logout={this.logout}
              updateUser={this.updateLoggedInUser}
            />
          )
        ) : (
          <Redirect to="/login" />
        )}

        <Route
          exact
          path="/login"
          render={() => (
            <Login
              user={this.state.user}
              updateLoggedInUser={this.updateLoggedInUser}
            />
          )}
        />
      </div>
    )
  }
}

export default withRouter(MainContainer)
