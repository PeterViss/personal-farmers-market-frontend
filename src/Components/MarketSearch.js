import React, { Component, Fragment } from 'react'
import { Input, Checkbox, Grid, Segment, Button } from 'semantic-ui-react'
import moment from 'moment'

import ChosenPost from './ChosenPost'

export default class MarketSearch extends Component {
  state = {
    check: false,
    nameCheck: '',
    disabled: true,
    value: '',
    filtered: false,
    posts: [],
    categories: [],
    chooseCat: [],
    catNames: [],
    chooseZip: [],
    chosenPost: {},
    displayPost: null
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  changeDisplay = () => {
    this.setState({ displayPost: false })
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  chosenCat = (e, { label, checked }) => {
    if (checked === true) {
      const newCats = this.state.chooseZip.filter(post => {
        if (post.category.name === label.props.children) {
          return post
        } else {
          return null
        }
      })
      return this.setState({
        chooseCat: newCats,
        nameCheck: label.props.children,
        filtered: true
      })
    } else {
      this.setState({
        nameCheck: '',
        filtered: false
      })
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }

  handleSearchChange = (e, { value }) => {
    //debugger
    const re = /^[0-9\b]{1,5}$/
    if (value === '' || re.test(value)) {
      this.setState({
        value: value
      })
    } else {
      return null
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    fetch('https://personal-farmers-market.herokuapp.com/categories')
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          categories: data
        })
      )
    fetch('https://personal-farmers-market.herokuapp.com/posts')
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          posts: data
        })
      )
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  choosePost = post => {
    this.setState({ chosenPost: post, displayPost: true })
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  searchZips = () => {
    let zipcodes = require('zipcodes')
    let rad = zipcodes.radius(this.state.value, 50)
    if (this.state.value === '') {
      return alert('Please enter a zipcode!')
    } else {
      let zips = this.state.posts.filter(post => {
        if (rad.includes(post.zip.toString())) {
          return post
        } else {
          return null
        }
      })
      if (zips.length > 0) {
        return this.setState({
          chooseZip: zips,
          disabled: false
        })
      } else {
        alert(
          'There Are No Farmers Markets Within A 50 Mile Radius Of This Zipcode, Please Enter Another One.'
        )
      }
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    console.log(this.state.nameCheck)

    return (
      <Fragment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
              <h3>50 Mile Radius:</h3>

              <Input
                placeholder="Search By Zipcode..."
                value={this.state.value}
                onChange={this.handleSearchChange}
              />
              <Button onClick={this.searchZips} color="green">
                Find
              </Button>

              <h3>Filter By Categories:</h3>
              {this.state.categories.map((category, i) => (
                <Grid.Column disabled={this.state.disabled} key={category.id}>
                  <Checkbox
                    checked={
                      this.state.nameCheck === category.name
                        ? true
                        : this.state.nameCheck === ''
                        ? false
                        : false
                    }
                    label={<label>{category.name}</label>}
                    onClick={this.chosenCat}
                  />
                </Grid.Column>
              ))}
            </Grid.Column>

            <Grid.Column width={4}>
              {this.state.filtered === true &&
              this.state.chooseCat.length === 0 ? (
                <h2>There are no posts with that category in this area.</h2>
              ) : this.state.chooseZip.length === 0 ? (
                <h3>
                  Please type in a zipcode to find markets within your area.
                </h3>
              ) : null}
              <h2>Farmers Markets Available:</h2>
              {this.state.filtered
                ? this.state.chooseCat.map(post => {
                    return (
                      <Segment key={post.id} raised>
                        Title: {post.title}
                        <br />
                        Market Date:{' '}
                        {moment(post.startTime).format('MMM-D-YYYY hh:mm a')}
                        <br />
                        Category: {post.category.name}
                        <br />
                        <Button
                          color="vk"
                          size="small"
                          onClick={() => this.choosePost(post)}
                        >
                          View
                        </Button>
                      </Segment>
                    )
                  })
                : this.state.chooseZip.map(post => {
                    return (
                      <Segment key={post.id} raised>
                        Market Name: {post.title}
                        <br />
                        Date:{' '}
                        {moment(post.startTime).format('MMM-D-YYYY hh:mm a')}
                        <br />
                        Category: {post.category.name}
                        <br />
                        <Button
                          color="vk"
                          size="small"
                          onClick={() => this.choosePost(post)}
                        >
                          View
                        </Button>
                      </Segment>
                    )
                  })}
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={5}>
              <h1 position="centered">Post</h1>
              {this.state.displayPost ? (
                <ChosenPost
                  post={this.state.chosenPost}
                  user={this.props.customer}
                  changeDisplay={this.changeDisplay}
                  commenting={true}
                />
              ) : null}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>
    )
  }
}
