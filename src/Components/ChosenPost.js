import React, { Component } from 'react'

import { Message, Form, Card, Button, Divider } from 'semantic-ui-react'
const classes = {
  categoryPill: {
    margin: '8px 0px',
    padding: '4px',
    borderRadius: '4px',
    backgroundColor: 'lightblue',
    display: 'inline-block'
  },
  commentsTitle: {
    fontSize: '24px',
    fontWeight: '400'
  }
}
class ChosenPost extends Component {
  state = {
    value: '',
    post: {}
  }
  /////////////////////////////////////////////////////////////////////////////////////////
  handleSubmit = e => {
    let value = this.state.value
    let postId = this.props.post.id
    let userId = this.props.user.id
    fetch('https://personal-farmers-market.herokuapp.com/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        content: value,
        user_id: userId,
        post_id: postId
      })
    })
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          value: '',
          post: {
            ...this.state.post,
            comments: [...this.state.post.comments, data]
          }
        })
      )
  }
  //////////////////////////////////////////////////////////////////////////////////////////////
  addAttendee = user => {
    fetch('https://personal-farmers-market.herokuapp.com/attends', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user_id: user.id,
        post_id: this.state.post.id
      })
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          post: {
            ...this.state.post,
            attends: [...this.state.post.attends, data]
          }
        })
      })
  }
  //////////////////////////////////////////////////////////////////////////////////////////////
  deletePost = (e, comment) => {
    let newComments = this.state.post.comments.filter(
      com => com.id !== comment.id
    )
    fetch(
      `https://personal-farmers-market.herokuapp.com/comments/${comment.id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    )
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          post: {
            ...this.state.post,
            comments: newComments
          }
        })
      )
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  handleChange = (e, { value }) => {
    this.setState({
      value: value
    })
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    let id = this.props.post.id
    fetch(`https://personal-farmers-market.herokuapp.com/posts/${id}`)
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          post: data
        })
      )
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    // console.log(this.state.post.comments)

    let user = this.props.user ? this.props.user : null
    let userId = this.props.user ? this.props.user.id : null
    let post = this.state.post
    let user_ids = post.attends
      ? post.attends.map(attend => attend.user_id)
      : null
    if (post === undefined) {
      return null
    } else {
      return (
        <Card align="left">
          <Card.Content>
            <Card.Header>
              <h3>{post.title}</h3>
            </Card.Header>
            <Card.Meta style={{ color: 'navy' }}>
              <h5>{new Date(post.startTime).toDateString()}</h5>
            </Card.Meta>

            <Card.Description style={{ color: 'black' }}>
              {post.content !== undefined ? post.content : null}
            </Card.Description>
          </Card.Content>
          <Divider />
          <Card.Content style={{ color: 'black' }}>
            <h5>Location:</h5>
            {post.location}
            <br />
            {post.city}, {post.state !== undefined ? post.state.name : null}{' '}
            {post.zip}
            <Divider />
            {post.category !== undefined ? (
              <p style={classes.categoryPill}> {post.category.name}</p>
            ) : null}
            <br />
          </Card.Content>
          <Divider />
          {post.attends ? (
            user.role === 'customer' ? (
              <Card.Content>
                <h5>Attending: {post.attends.length}</h5>
                {user_ids.includes(userId) ? (
                  'you are attending!!'
                ) : (
                  <Button
                    color="vk"
                    onClick={() => this.addAttendee(this.props.user)}
                  >
                    attend
                  </Button>
                )}
              </Card.Content>
            ) : (
              <Card.Content>
                <h5>Attending: {post.attends.length}</h5>
              </Card.Content>
            )
          ) : null}
          <hr />
          <Card.Content extra>
            <p style={classes.commentsTitle}>Comments </p>
            {this.state.post.comments
              ? this.state.post.comments.length > 0
                ? this.state.post.comments.map(comment => (
                    <Message floating key={comment.id}>
                      {' '}
                      <Message.Header>
                        From {comment.user.username}
                        {comment.user_id === userId ? (
                          <Button
                            size="mini"
                            color="red"
                            floated="right"
                            onClick={event => this.deletePost(event, comment)}
                          >
                            delete
                          </Button>
                        ) : null}
                      </Message.Header>
                      <Message.Content>{comment.content}</Message.Content>
                    </Message>
                  ))
                : 'No Comments Yet'
              : null}
            <br />
          </Card.Content>
          <Card.Content>
            {this.props.commenting ? (
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Input
                    width={16}
                    placeholder="Add A Comment"
                    name="comment"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                  <Form.Button color="teal" content="Submit" />
                  <Form.Button
                    color="black"
                    onClick={this.props.changeDisplay}
                    content="Done"
                  />
                </Form.Group>
              </Form>
            ) : (
              <Button onClick={this.props.changeDisplay} color="vk">
                hide
              </Button>
            )}
          </Card.Content>
        </Card>
      )
    }
  }
}

export default ChosenPost
