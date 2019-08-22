import React, { Component } from 'react'
import { Grid, Segment, Card, Button, Divider } from 'semantic-ui-react'
import PostList from './PostList'
import ChosenPost from './ChosenPost'
import MyAvatar from './myAvatar'

export default class FarmerProfile extends Component {
  state = {
    length: 0,
    post: {},
    displayPost: null,
    farmer: {}
  }
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    let post = this.state.post
    let farmer = this.props.farmer
    let customer = this.props.customer
    let cats = farmer.categories
      ? farmer.categories.map(category => category.name)
      : null
    let newCats = cats.sort()
    let catNames = Array.from(new Set(newCats))
    //debugger
    //console.log(farmer)
    // console.log(customer)
    return farmer ? (
      <Grid>
        <Grid.Row>
          <Grid.Column align="center">
            <h2>
              <Segment compact>{farmer.biography.name}</Segment>
            </h2>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={16}>
          <Grid.Column width={2} />
          <Grid.Column width={4}>
            <Segment>
              <Card.Group itemsPerRow={1} width={2}>
                <Card fluid>
                  <Card.Content textAlign="center">
                    <MyAvatar avatar={farmer.avatar} />
                  </Card.Content>
                </Card>
                <Card fluid>
                  <Card.Content>
                    <Card.Header textAlign="center">Biography</Card.Header>
                    <Card.Description>
                      {farmer.biography.description}
                    </Card.Description>
                  </Card.Content>
                </Card>
                <Card fluid>
                  <Card.Content>
                    <Card.Header textAlign="center">Categories:</Card.Header>
                    <Card.Description>
                      <ul>
                        {catNames.map((category, i) => {
                          return <li key={i}>{category}</li>
                        })}
                      </ul>
                    </Card.Description>
                  </Card.Content>
                </Card>
                <Card fluid>
                  <Card.Content textAlign="center">
                    <Card.Header>Followers:</Card.Header>
                    <Card.Description style={{ color: 'black' }}>
                      <h4>
                        {this.props.length === null
                          ? farmer.followers.length
                          : this.props.length}
                      </h4>
                      <br />
                      {this.props.following ? (
                        <Button
                          color="vk"
                          onClick={() =>
                            this.props.toggleUnFollow(customer, farmer)
                          }
                        >
                          Unfollow
                        </Button>
                      ) : (
                        <Button
                          color="vk"
                          onClick={() =>
                            this.props.toggleFollow(customer, farmer)
                          }
                        >
                          Follow
                        </Button>
                      )}
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Card.Group>
            </Segment>
          </Grid.Column>
          <Grid.Column width={4}>
            <Card fluid>
              <Card.Content>
                <Card.Header textAlign="center">
                  <h2>Posts</h2>
                </Card.Header>
                <Divider />
                <Card.Description>
                  <PostList
                    key={farmer.id}
                    posts={farmer.posts}
                    clickHandler={this.showPost}
                    show={'show'}
                  />
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={4}>
            {this.state.displayPost ? (
              <ChosenPost
                post={post}
                user={customer}
                changeDisplay={this.changeDisplay}
                commenting={true}
              />
            ) : null}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={1} />
        </Grid.Row>
      </Grid>
    ) : (
      <h1>Farmer Does Not Exist</h1>
    )
  }
}
