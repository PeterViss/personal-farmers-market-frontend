import React, { Component, Fragment } from 'react'
import { Input, Checkbox, Grid, Segment, Button } from 'semantic-ui-react'
import moment from 'moment'

import ChosenPost from './ChosenPost'

export default class MarketSearch extends Component {
  state = {
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
  chosenCat = (e, { label }) => {
    let value = label.props.children
    if (this.state.catNames.includes(value)) {
      let unchoose = this.state.catNames.filter(name => name !== value)
      let removed = this.state.chooseCat.filter(post => {
        return post.category.name !== value
      })
      this.setState({
        catNames: unchoose,
        chooseCat: removed,
        filtered: !this.state.filtered
      })
    } else {
      let newZips = this.state.chooseZip.filter(post => {
        if (post.category.name.toLowerCase().includes(value.toLowerCase())) {
          return post
        } else {
          return null
        }
      })
      let catNames = newZips.map(post => {
        return post.category.name
      })
      // debugger
      return this.setState({
        catNames: catNames,
        chooseCat: newZips,
        filtered: !this.state.filtered
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
    fetch('http://localhost:3000/categories')
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          categories: data
        })
      )
    fetch('http://localhost:3000/posts')
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
      this.setState({
        chooseZip: zips,
        disabled: false
      })
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    //console.log(this.state.filtered)
    // console.log(this.state.chooseZip)
    //console.log()
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
                    label={<label>{category.name}</label>}
                    onClick={this.chosenCat}
                    disabled={this.state.disabled}
                  />
                </Grid.Column>
              ))}
            </Grid.Column>

            <Grid.Column width={4}>
              <h2>Farmers Markets Available:</h2>
              {this.state.filtered
                ? this.state.chooseCat.map(post => {
                    return (
                      <Segment key={post.id} raised>
                        Title: Farmer Market
                        <br />
                        Market Date:{' '}
                        {moment(post.startTime).format('MMM-D-YYYY hh:mm a')}
                        <br />
                        Category: {post.category.name}
                        <br />
                        <Button
                          color="blue"
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
                        Market Name: Farmer Market
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
