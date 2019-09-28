import React, { Component, Fragment } from 'react'
import MyAvatar from './myAvatar'
import { Card } from 'semantic-ui-react'
import { Segment, Grid, Button } from 'semantic-ui-react'
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
    fetch(`https://personal-farmers-market.herokuapp.com/posts/${post.id}`)
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
    //console.log(this.props.customer)
    // console.log(this.state.post)
    return (
      <Fragment>
        <Grid>
          <Grid.Column width={2} />
          <Grid.Column width={4}>
            <Segment>
              <Card>
                <Card.Content>
                  <MyAvatar avatar={this.props.customer.avatar} />
                </Card.Content>
                <Button onClick={this.props.enableSelect} color="vk">
                  edit
                </Button>
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
              <Segment basic>
                <h3>
                  {customer.followees === undefined
                    ? 'Who You Are Following'
                    : 'Follow Someone!'}
                </h3>
                {customer.followees === undefined
                  ? null
                  : customer.followees.map(followee => (
                      <Segment key={followee.id}>
                        <h5>
                          {followee.biography.name}
                          <Button
                            style={{ color: 'black' }}
                            floated="right"
                            size="mini"
                            color="yellow"
                            onClick={() => this.props.chooseFarmer(followee)}
                          >
                            View
                          </Button>
                        </h5>
                      </Segment>
                    ))}
              </Segment>
            </Segment>
          </Grid.Column>
          <Grid.Column width={4}>
            <Segment>
              <h2 textAlign="center">
                {customer.followees === undefined
                  ? 'Follow a Farmer To See Their Posts!'
                  : 'Posts'}
              </h2>
              {customer.followees === undefined
                ? null
                : customer.followees.map(farmer => {
                    return (
                      <Fragment key={farmer.id}>
                        {/* <Segment basic>
                          <Segment textAlign="center">
                            <h3 key={farmer.id}>{farmer.biography.name}</h3>
                          </Segment>
                        </Segment> */}
                        <PostList
                          farmer={farmer.biography.name}
                          posts={farmer.posts}
                          clickHandler={this.showPost}
                          show={'show'}
                        />
                      </Fragment>
                    )
                  })}
            </Segment>
          </Grid.Column>
          {/* <Grid.Column width={1} /> */}
          <Grid.Column width={5}>
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
