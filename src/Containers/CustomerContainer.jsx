import React, { Component } from 'react'
import Navbar from '../Components/Navbar'
import CustomerHome from '../Components/CustomerHome'
import { Route, withRouter } from 'react-router-dom'
import MarketSearch from '../Components/MarketSearch'
import FarmerSearch from '../Components/FarmerSearch'
import FarmerProfile from '../Components/FarmerProfile'
import { Grid } from 'semantic-ui-react'

class CustomerContainer extends Component {
  state = {
    activeItem: 'Home',
    chosenFarmer: {},
    following: false,
    length: 0
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  navigating = e => {
    return this.setState({
      activeItem: e.target.innerText
    })
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleUnFollow = (customer, farmer) => {
    let followers = farmer.followers.filter(follower => {
      if (follower.id !== customer.id) {
        return follower
      } else {
        return null
      }
    })

    let followees = customer.followees.filter(followee => {
      if (followee.id !== farmer.id) {
        return followee
      } else {
        return null
      }
    })

    let newCustomer = { ...customer, followees: followees }

    fetch(`https://personal-farmers-market.herokuapp.com/follows`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        follower_id: farmer.id,
        followee_id: customer.id
      })
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        this.setState({
          chosenFarmer: {
            ...this.state.chosenFarmer,
            followers: followers
          },
          following: false,
          length: this.state.length - 1
        })
      })
    return this.props.updateUser(newCustomer)
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleFollow = (customer, farmer) => {
    let thisCustomer = {
      customer: customer.id,
      username: customer.username,
      role: 'customer'
    }
    let newFarmer = { ...farmer, followers: [...farmer.followers, customer] }
    let newCustomer = {
      ...customer,
      followees: [...customer.followees, newFarmer]
    }

    fetch(`https://personal-farmers-market.herokuapp.com/follows`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        follower_id: farmer.id,
        followee_id: customer.id
      })
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        this.setState({
          chosenFarmer: {
            ...this.state.chosenFarmer,
            followers: [...this.state.chosenFarmer.followers, thisCustomer]
          },
          following: true,
          length: this.state.length + 1
        })
      })
    return this.props.updateUser(newCustomer)
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  chooseFarmer = farmer => {
    if (farmer.followers.length !== 0) {
      let followers = farmer.followers.filter(follower => {
        if (follower.id === this.props.customer.id) {
          return follower
        } else {
          return null
        }
      })
      if (followers.length === 0) {
        this.setState({
          chosenFarmer: farmer,
          following: false,
          length: farmer.followers.length
        })
      } else {
        this.setState({
          chosenFarmer: farmer,
          following: true,
          length: farmer.followers.length
        })
      }
    } else {
      this.setState({
        chosenFarmer: farmer,
        following: false,
        length: farmer.followers.length
      })
    }

    this.props.history.push('/FarmerProfile')
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    return (
      <div>
        <Grid>
          <Grid.Column width={16}>
            <Grid.Row>
              <Navbar
                clickHandler={this.navigating}
                active={this.state.activeItem}
                names={['Search For Farmers', 'Search For Markets', 'Home']}
                username={this.props.customer.username}
                logout={this.props.logout}
              />
            </Grid.Row>
          </Grid.Column>
          <Grid.Row>
            <Grid.Column width={16}>
              <Route
                exact
                path="/Home"
                render={() => (
                  <CustomerHome
                    customer={this.props.customer}
                    chooseFarmer={this.chooseFarmer}
                    enableSelect={this.props.enableSelect}
                    selectForm={this.props.selectForm}
                    disableForm={this.props.disableForm}
                    submitAvatar={this.props.submitAvatar}
                    changeAvatar={this.props.changeAvatar}
                  />
                )}
              />
            </Grid.Column>

            <Grid.Column width={16}>
              <Route
                exact
                path="/Search For Markets"
                render={() => (
                  <MarketSearch
                    customer={this.props.customer}
                    chooseFarmer={this.chooseFarmer}
                  />
                )}
              />
            </Grid.Column>

            <Grid.Column width={16}>
              <Route
                exact
                path="/Search For Farmers"
                render={() => (
                  <FarmerSearch
                    chooseFarmer={this.chooseFarmer}
                    customer={this.props.customer}
                  />
                )}
              />
            </Grid.Column>

            <Grid.Column width={16}>
              <Route
                path="/FarmerProfile"
                exact
                render={() => (
                  <FarmerProfile
                    customer={this.props.customer}
                    farmer={this.state.chosenFarmer}
                    following={this.state.following}
                    toggleUnFollow={this.toggleUnFollow}
                    toggleFollow={this.toggleFollow}
                    length={this.state.length}
                  />
                )}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default withRouter(CustomerContainer)
