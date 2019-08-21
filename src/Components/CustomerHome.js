import React, { Component, Fragment } from 'react'
import MyAvatar from './myAvatar'
import { Card } from 'semantic-ui-react'
import { Segment, Grid, Dimmer, Button } from 'semantic-ui-react'
import PostList from './PostList'
import ChosenPost from './ChosenPost'
import FormSelect from '../Components/FormSelect'
export default class CustomerHome extends Component {
  state = {
    post: {},
    displayPost: null
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  showPost = post => {
    fetch(`http://localhost:3000/posts/${post.id}`)
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          displayPost: true,
          post: data
        })
      )
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  changeDisplay = () => {
    this.setState({
      displayPost: false
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    // let post = this.state.post
    let customer = this.props.customer
    // let farmers = this.props.customer.followees.map(farmer => {return farmer})}
    console.log(this.props.customer)
    // console.log(this.state.post)
    return (
      <Fragment>
        <Grid>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Segment>
              <Card>
                <Card.Content align="center">
                  <MyAvatar avatar={this.props.customer.avatar} />
                </Card.Content>
                <Button onClick={this.props.enableSelect}>edit</Button>
              </Card>
              {this.props.selectForm ? (
                <FormSelect
                  avatar={this.props.customer.avatar}
                  changeAvatar={this.props.changeAvatar}
                  submitAvatar={this.props.submitAvatar}
                  disableForm={this.props.disableForm}
                  selectForm={this.props.selectForm}
                />
              ) : null}
              <Card
                fluid
                header="Who You Are Following"
                description={
                  customer.followees === undefined ? null : (
                    <ul>
                      {customer.followees.map(followee => (
                        <li key={followee.id}>
                          {followee.username}
                          <button
                            onClick={() => this.props.chooseFarmer(followee)}
                          >
                            View
                          </button>
                        </li>
                      ))}
                    </ul>
                  )
                }
              />
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              <h2>Posts By:</h2>
              {customer.followees === undefined
                ? null
                : customer.followees.map(farmer => {
                    return (
                      <Segment key={farmer.id}>
                        <h3>{farmer.biography.name}</h3>
                        <PostList
                          posts={farmer.posts}
                          clickHandler={this.showPost}
                          show={'show'}
                        />
                      </Segment>
                    )
                  })}
            </Segment>
          </Grid.Column>
          <Grid.Column width={4}>
            {this.state.displayPost ? (
              <ChosenPost
                post={this.state.post}
                user={this.props.customer}
                changeDisplay={this.changeDisplay}
                commenting={true}
              />
            ) : null}
          </Grid.Column>
          <Grid.Column width={1} />
        </Grid>
      </Fragment>
    )
  }
}
