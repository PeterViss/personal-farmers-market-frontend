import React, { Component } from 'react'
import PostList from '../Components/PostList'
import Post from '../Components/Post'
import ChosenPost from '../Components/ChosenPost'
import PostForm from '../Components/PostForm'
import BiographyEdit from '../Components/BiographyEdit'
import { withRouter } from 'react-router-dom'
import { Segment, Grid, Card, Button, Form } from 'semantic-ui-react'
import MyAvatar from '../Components/myAvatar'
import FormSelect from '../Components/FormSelect'
const classes = {
  followersNumber: {
    fontSize: '24px'
  },
  newPostButton: {
    marginBottom: '15px'
  }
}
class PostContainer extends Component {
  state = {
    create: false,
    display: false,
    chosenPost: {},
    post: false,
    bio: false,
    newBio: false
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  changeDisplay = post => {
    this.setState({
      display: true,
      post: false,
      create: false,
      chosenPost: post
    })
  }

  falsifyDisplay = () => {
    this.setState({
      display: false
    })
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  onePost = post => {
    this.setState({
      post: true,
      display: false,
      create: false,
      onePost: post
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  resetPosts = data => {
    this.setState({
      post: false
    })
    this.props.changePosts(data)
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  renderRedirect = () => {
    this.setState({
      create: true,
      display: false,
      post: false
    })
  }

  noCreate = () => {
    this.setState({
      create: false
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  falsifyPost = data => {
    this.setState({
      post: false
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  changePost = data => {
    this.setState({
      post: false
    })
    return this.props.falsePost(data)
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  choosePost = post => {
    this.setState({
      chosenPost: post
    })
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  changeSelect = (e, { name, value }) => {
    debugger
    this.setState({
      topType: value
    })
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  editBio = () => {
    this.setState({
      bio: true
    })
  }

  falseBio = () => {
    this.setState({
      bio: false
    })
  }

  createBio = () => {
    this.setState({
      newBio: true
    })
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    let posts = this.props.posts
    let newCategories = posts ? posts.map(post => post.category.name) : null
    let newerCats = newCategories.sort()
    let cats = Array.from(new Set(newerCats))
    //debugger
    let places = this.props.posts.map(post => post.state.name)
    let states = Array.from(new Set(places))
    console.log(this.props.farmer.avatar)

    //console.log(this.props.categories)
    return (
      <Grid>
        <Grid.Row />
        <Grid.Row>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Segment>
              <Card.Group itemsPerRow={1}>
                <Card>
                  <Card.Content align="center">
                    <MyAvatar avatar={this.props.farmer.avatar} />
                  </Card.Content>
                  <Button onClick={this.props.enableSelect}>edit</Button>
                </Card>

                {this.props.selectForm ? (
                  <Card>
                    <Card.Content>
                      <FormSelect
                        avatar={this.props.farmer.avatar}
                        changeAvatar={this.props.changeAvatar}
                        submitAvatar={this.props.submitAvatar}
                        disableForm={this.props.disableForm}
                        selectForm={this.props.selectForm}
                      />
                    </Card.Content>
                  </Card>
                ) : null}
                <Card
                  centered
                  header="Biography:"
                  meta={
                    this.props.farmer.biography
                      ? this.props.farmer.biography.name
                      : null
                  }
                  description={
                    this.props.farmer.biography
                      ? this.props.farmer.biography.description
                      : 'Please Create Biography'
                  }
                  extra={
                    this.props.farmer.biography ? (
                      <Button onClick={this.editBio}>edit</Button>
                    ) : (
                      <Button onClick={this.createBio}>create</Button>
                    )
                  }
                />
                {this.state.bio ? (
                  <Segment>
                    <BiographyEdit
                      bio={this.props.farmer.biography}
                      bioHandler={this.props.bioHandler}
                      falseBio={this.falseBio}
                    />
                  </Segment>
                ) : null}

                <Card
                  centered
                  header="Followers:"
                  meta="How many people follow you"
                  description={this.props.farmer.followers.length}
                />
                <Card
                  header="Categories"
                  meta={'Categories you have used in the past'}
                  description={
                    cats.length === 0 ? (
                      'Create a post to show categories'
                    ) : (
                      <ul>
                        {cats.map((category, i) => (
                          <li key={i}>{category}</li>
                        ))}
                      </ul>
                    )
                  }
                />
                <Card
                  color="olive"
                  header="States"
                  meta="States you have sold you products in."
                  description={
                    states.length === 0 ? (
                      'Create a post to show states'
                    ) : (
                      <ul>
                        {states.map((state, i) => (
                          <li key={i}>{state}</li>
                        ))}
                      </ul>
                    )
                  }
                />
              </Card.Group>
            </Segment>
          </Grid.Column>
          <Grid.Column width={5}>
            <Segment>
              <Button
                primary
                onClick={this.renderRedirect}
                style={classes.newPostButton}
              >
                Create New Post
              </Button>
              {posts ? (
                <PostList
                  posts={posts}
                  clickHandler={this.onePost}
                  post={this.state.post}
                  show={'edit'}
                  changeDisplay={this.changeDisplay}
                  pick={'show'}
                />
              ) : null}
            </Segment>
          </Grid.Column>
          {this.state.post ? (
            <Grid.Column width={5}>
              <Post
                show={'edit'}
                postId={this.state.onePost.id}
                changeDate={this.changeDate}
                handleChange={this.changePost}
                falsifyPost={this.falsifyPost}
                categories={this.props.categories}
                states={this.props.states}
                changePosts={this.resetPosts}
                changePost={this.changePost}
              />
            </Grid.Column>
          ) : null}
          {this.state.display ? (
            <Grid.Column width={5}>
              <ChosenPost
                post={this.state.chosenPost}
                changeDisplay={this.falsifyDisplay}
                commenting={false}
                user={this.props.farmer}
              />
            </Grid.Column>
          ) : null}
          {this.state.create ? (
            <Grid.Column width={5}>
              <PostForm
                noCreate={this.noCreate}
                categories={this.props.categories}
                states={this.props.states}
                createPost={this.props.createPost}
                farmerId={this.props.farmerId}
              />
            </Grid.Column>
          ) : null}
          }
        </Grid.Row>
      </Grid>
    )
  }
}

export default withRouter(PostContainer)
