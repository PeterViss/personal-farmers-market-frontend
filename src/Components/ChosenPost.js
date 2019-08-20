import React, { Component } from 'react'
import { Segment, Form, Card, Button } from 'semantic-ui-react'
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
    fetch('http://localhost:3000/comments', {
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
    let t = this
    let nuUser = user
    fetch('http://localhost:3000/attends', {
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
    fetch(`http://localhost:3000/comments/${comment.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
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
    fetch(`http://localhost:3000/posts/${id}`)
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          post: data
        })
      )
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    //console.log(this.state.post)
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
        <Card>
          <Card.Content>
            <Card.Header>{post.title}</Card.Header>
            <Card.Meta>{new Date(post.startTime).toDateString()}</Card.Meta>

            {post.content !== undefined
              ? post.content
                  .split(' ')
                  .slice(0, 7)
                  .join(' ')
              : null}
          </Card.Content>
          <Card.Content>
            Location: {post.location}
            <br />
            {post.category !== undefined ? (
              <p style={classes.categoryPill}> {post.category.name}</p>
            ) : null}
            <br />
            {post.city}, {post.state !== undefined ? post.state.name : null}{' '}
            {post.zip}
            <br />
          </Card.Content>
          {user.role === 'customer' ? (
            post.attends ? (
              <Card.Content>
                <h5>Attending: {post.attends.length}</h5>
                {user_ids.includes(userId) ? null : (
                  <Button onClick={() => this.addAttendee(this.props.user)}>
                    attend
                  </Button>
                )}
              </Card.Content>
            ) : null
          ) : null}
          <hr />
          <Card.Content>
            <p style={classes.commentsTitle}>Comments </p>
            {this.state.post.comments
              ? this.state.post.comments.length > 0
                ? this.state.post.comments.map(comment => (
                    <Segment key={comment.id}>
                      <p>{comment.content}</p>
                      {comment.user_id === userId ? (
                        <Button
                          color="red"
                          align="right"
                          onClick={event => this.deletePost(event, comment)}
                        >
                          Delete
                        </Button>
                      ) : null}
                    </Segment>
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
                  <Form.Button content="Submit" />
                  <Form.Button
                    onClick={this.props.changeDisplay}
                    content="Nevermind"
                  />
                </Form.Group>
              </Form>
            ) : (
              <Form.Button
                onClick={this.props.changeDisplay}
                content="Nevermind"
              />
            )}
          </Card.Content>
        </Card>
      )
    }
  }
}

export default ChosenPost
