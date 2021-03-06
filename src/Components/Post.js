import React, { Component } from 'react'
import DatetimePicker from 'react-datetime-picker'
import moment from 'moment'
import { Form, TextArea, Segment, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      enabled: false,
      date: '',
      post: {}
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  onChange = date => {
    let newDate = date.toISOString()
    this.setState({
      post: {
        ...this.state.post,
        startTime: newDate
      },
      date: date
    })
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  changePost = (e, { name, value }) => {
    this.setState({
      post: {
        ...this.state.post,
        [name]: value
      }
    })
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  changeSelect = (e, { name, value }) => {
    let item = {}
    this.props.categories.forEach(category => {
      if (category.name === value) {
        return (item = category)
      } else {
      }
    })
    this.setState({
      post: {
        ...this.state.post,
        [name]: item
      }
    })
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  changeZip = (e, { name, value }) => {
    const re = /^[0-9\b]{1,5}$/
    if (value === '' || re.test(value)) {
      this.setState({
        post: {
          ...this.state.post,
          [name]: value
        }
      })
    } else {
      return null
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  changeState = (e, { name, value }) => {
    let item = {}
    this.props.states.forEach(state => {
      if (state.name === value) {
        return (item = state)
      } else {
      }
    })
    this.setState({
      post: {
        ...this.state.post,
        [name]: item
      }
    })
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  enableForm = e => {
    e.preventDefault()
    this.setState({
      enabled: !this.state.enabled
    })
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    let id = this.props.postId
    fetch(`https://personal-farmers-market.herokuapp.com/posts/${id}`)
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          post: data
        })
      )
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  patchForm = e => {
    let post = this.state.post
    e.preventDefault()
    let id = this.props.postId
    fetch(`https://personal-farmers-market.herokuapp.com/posts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        post: {
          id: post.id,
          title: post.title,
          content: post.content,
          startTime: post.startTime,
          location: post.location,
          zip: post.zip,
          city: post.city,
          state_id: post.state.id,
          attending: post.attending,
          user_id: post.user_id,
          comments: post.comments,
          category_id: post.category.id
        }
      })
    })
      .then(resp => resp.json())
      .then(data => this.props.changePost(data))
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  deletePost = () => {
    debugger
    let id = this.props.postId
    fetch(`https://personal-farmers-market.herokuapp.com/posts/${id}`, {
      method: 'DELETE'
    })
      .then(resp => resp.json())
      .then(data => this.props.changePosts(data))
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    let newCategories = this.props.categories
      ? this.props.categories.map(category => {
          return {
            key: category.id,
            text: category.name,
            value: category.name
          }
        })
      : null

    let newStates = this.props.states
      ? this.props.states.map(state => {
          return {
            key: state.id,
            text: state.name,
            value: state.name
          }
        })
      : null

    let post = this.state.post

    return (
      <div>
        <Segment>
          <Form>
            <Form.Input
              name="title"
              label="Title"
              value={post.title || ''}
              onChange={this.changePost}
              placeholder="Your Title Here..."
            />
            <Form.Field
              id="form-textarea-control-opinion"
              control={TextArea}
              name="content"
              label="Content"
              value={post.content || ''}
              onChange={this.changePost}
              placeholder="Your Content Here..."
            />
            <Form.Input
              fluid
              name="location"
              label="Location"
              placeholder="specific location"
              value={post.location || ''}
              onChange={this.changePost}
            />
            <Form.Input
              fluid
              name="zip"
              label="Zip"
              placeholder="zipcode"
              value={post.zip || ''}
              onChange={this.changeZip}
            />
            <Form.Input
              fluid
              name="city"
              label="City"
              placeholder="City"
              value={post.city || ''}
              onChange={this.changePost}
            />

            <Form.Select
              label="State"
              name="state"
              placeholder="States"
              value={post.state !== undefined ? post.state.name : null}
              onChange={this.changeState}
              options={newStates}
            />
            <Form.Select
              label="Category"
              name="category"
              placeholder="Categories"
              onChange={this.changeSelect}
              value={post.category !== undefined ? post.category.name : null}
              options={newCategories}
            />
          </Form>

          {this.state.enabled ? (
            <Segment align="center">
              <DatetimePicker
                value={this.state.date}
                onChange={this.onChange}
                disableClock={true}
                disableCalendar={false}
                clearIcon={null}
              />
            </Segment>
          ) : null}

          <Segment align="center">
            <Button
              animated="fade"
              size="medium"
              onClick={this.enableForm}
              color="linkedin"
            >
              <Button.Content visible>
                {moment(this.state.post.startTime).format('MMM-D-YYYY hh:mm a')}
              </Button.Content>
              <Button.Content hidden>Click to Edit</Button.Content>
            </Button>
          </Segment>

          <Form align="center">
            <Form.Group align="center">
              <Form.Button onClick={this.patchForm} color="teal">
                Submit
              </Form.Button>
              <Form.Button onClick={this.deletePost} color="red">
                Delete
              </Form.Button>
              <Form.Button onClick={this.props.falsifyPost} color="black">
                Nevermind
              </Form.Button>
            </Form.Group>
          </Form>
        </Segment>
      </div>
    )
  }
}
export default withRouter(Post)
