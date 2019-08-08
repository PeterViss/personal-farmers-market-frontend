import React, {Component} from 'react'
import PostList from './PostList'
import Post from './Post'
export default class PostContainer extends Component{
    state = {
        posts: [],
        onePost: {}
    }

    showPost = (post) => {
        this.setState({
            onePost: post
        })
    }

    changePost = (event) => {
        debugger
       
        
        this.setState({
            onePost: {
                ...this.state.onePost,
                [event.target.name]: event.target.value 
            }
        })
    }

    changeDate = (event) => {
        debugger
        this.setState({
            onePost: {
                ...this.state.onePost,
                [event.target.name]: event.target.value
            }
        })
    }

    componentDidMount(){
        fetch('http://localhost:3000/user/posts/58')
        .then(resp => resp.json())
        .then(data => this.setState({
            posts: data 
            })
        )
    }
    render(){
        return(
            <div>
               <PostList posts={this.state.posts} clickHandler={this.showPost}/>
               <Post post={this.state.onePost} onChangeHandler={this.changePost}/>
            </div>
        )
    }
}