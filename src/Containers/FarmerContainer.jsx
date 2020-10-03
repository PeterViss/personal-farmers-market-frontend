import React, { Component } from 'react'
import Navbar from '../Components/Navbar'
import { Route, withRouter } from 'react-router-dom'

import PostContainer from './PostContainer'
import PostForm from '../Components/PostForm'
import Post from '../Components/Post'

class FarmerContainer extends Component {
  state = {
    activeItem: 'Home',
    categories: [],
    states: [],
    posts: [],
    newPost: {}
  }

  falsePost = data => {
    let newPosts = this.state.posts.filter(post => post.id !== data.id)
    let newerPosts = [...newPosts, data]
    let sortedPosts = newerPosts.sort(function(a, b) {
      return a.id - b.id
    })
    this.setState({
      posts: [...sortedPosts]
    })
  }

  navigating = e => {
    this.setState({
      activeItem: e.target.innerText
    })
  }

  createPost = post => {
    this.setState({
      posts: [...this.state.posts, post]
    })
  }


  changePosts = data => {
    debugger
    let nuPosts = this.state.posts.filter(post => post.id !== data.id)
    this.setState({
      posts: nuPosts
    })
  }

  componentDidMount() {
    fetch('https://personal-farmers-market.herokuapp.com/categories')
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          categories: data
        })
      )
    fetch('https://personal-farmers-market.herokuapp.com/states')
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          states: data
        })
      )
    fetch(
      `https://personal-farmers-market.herokuapp.com/user/posts/${this.props.farmer.id}`
    )
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          posts: data
        })
      )
  }

  render() {
    let names = ['Home']
    return (
      <div>
        <Navbar
          clickHandler={this.navigating}
          active={this.state.activeItem}
          names={names}
          username={this.props.farmer.username}
          logout={this.props.logout}
        />

        <Route
          exact
          path="/Home"
          render={() => (
            <PostContainer
              categories={this.state.categories}
              states={this.state.states}
              farmer={this.props.farmer}
              posts={this.state.posts}
              changePosts={this.changePosts}
              falsePost={this.falsePost}
              bio={this.props.farmer.biography}
              bioHandler={this.props.bioHandler}
              sendBio={this.sendBio}
              createPost={this.createPost}
              farmerId={this.props.farmer.id}
              enableSelect={this.props.enableSelect}
              selectForm={this.props.selectForm}
              disableForm={this.props.disableForm}
              submitAvatar={this.props.submitAvatar}
              changeAvatar={this.props.changeAvatar}
            />
          )}
        />

        <Route
          exact
          path="/PostForm"
          render={() => (
            <PostForm
              categories={this.state.categories}
              states={this.state.states}
              farmerId={this.props.farmer.id}
              createPost={this.createPost}
            />
          )}
        />

        <Route exact path="/Post" render={() => <Post />} />
      </div>
    )
  }
}

export default withRouter(FarmerContainer)
