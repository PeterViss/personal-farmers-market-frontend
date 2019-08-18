import React, {Component} from 'react'
import Navbar from '../Components/Navbar' 
import {Route, withRouter} from 'react-router-dom'

import Biography from '../Components/BiographyEdit'
import PostContainer from './PostContainer'
import PostForm from '../Components/PostForm'
import Post from '../Components/Post'


 class FarmerContainer extends Component{
    state = {
        // post: false,
        activeItem: 'Home',
        categories: [],
        states: [],
        posts: [], 
        newPost: {}
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    falsePost = (data) => {
        let newPosts = this.state.posts.filter(post => post.id !== data.id)
        let newerPosts = [...newPosts, data]
        let sortedPosts = newerPosts.sort(function(a, b) { 
            return a.id - b.id;
          })
          debugger
        this.setState({
            //post: !this.state.post,
            posts: [...sortedPosts]
        })
    } 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    navigating = (e) => {
        
        this.setState({
            activeItem: e.target.innerText
        })
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    createPost = (post) => {
        this.setState({
            posts: [...this.state.posts, post]
        })
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    changePosts = (data) => {
        let nuPosts = this.state.posts.filter(post => post.id !== data.id)
        this.setState({
            posts: nuPosts
        })
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    sendBio = (event) => {
        let bio = this.props.farmer.biography 
        let num = parseInt(event.target.id)
        fetch(`http://localhost:3000/biographies/${num}`, {
            method: 'PATCH',
            headers:{
                "Content-Type": "application/json", 
                Accept: "application/json"
            },
            body: JSON.stringify({
                biography: bio
            })
    
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
        this.setState({
            activeItem: 'Home'
        })
        this.props.history.push("/Home")
    }    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    componentDidMount(){
        fetch('http://localhost:3000/categories')
        .then(resp => resp.json())
        .then(data => 
            this.setState({
                categories: data
            })
            )
        fetch('http://localhost:3000/states')
        .then(resp => resp.json())
        .then(data => 
            this.setState({
                states: data
            })
            ) 
        fetch(`http://localhost:3000/user/posts/${this.props.farmer.id}`)
        .then(resp => resp.json())
        .then(data => 
            this.setState({
            posts: data
            })
        )
                
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////
    render(){
        //debugger
      console.log(this.state.posts)
       let names = ["Bio", "Home"]
        return(
            <div>
              <Navbar 
                clickHandler={this.navigating} 
                active={this.state.activeItem} 
                names={names} 
                username={this.props.farmer.username} 
                logout={this.props.logout}
              /> 
             
            <Route exact path="/Home" render={() => 
                <PostContainer 
                    categories={this.state.categories} 
                    states={this.state.states} 
                    farmer={this.props.farmer} 
                    posts={this.state.posts}
                    changePosts={this.changePosts}
                    falsePost={this.falsePost}/>
            }/>

            <Route exact path="/Bio" render={() =>
                <Biography 
                    bio={this.props.farmer.biography} 
                    bioHandler={this.props.bioHandler} 
                    sendBio={this.sendBio}/>     
                }/>

            

            <Route exact path="/PostForm" render={() => 
                <PostForm 
                    categories={this.state.categories} 
                    states={this.state.states} 
                    farmerId={this.props.farmer.id} 
                    createPost={this.createPost}/>
            }/>

            <Route exact path="/Post" render={() =>
                <Post />
            }/>
            </div>
        )
    }
}

export default withRouter(FarmerContainer)