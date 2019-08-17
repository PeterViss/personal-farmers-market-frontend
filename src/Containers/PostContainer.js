import React, {Component} from 'react'
import PostList from '../Components/PostList'
import Post from '../Components/Post'
import {withRouter} from 'react-router-dom'

 class PostContainer extends Component{
    state = {
        post: false,
        onePost: {},
        //posts: []
    }

    showPost = (post) => { 
        this.setState({
            post: true,
            onePost: post
        })
    }

  
    resetPosts = (data) => {
        this.setState({
            post: false, 
        })
        this.props.changePosts(data)
    }

      renderRedirect = () => {
        this.props.history.push("/PostForm")
      }

   falsifyPost = (data) => {
       this.setState({
           post: false
       })
      return this.props.falsePost(data)
   }     


    // componentDidMount(){
    //     //debugger
    //     fetch(`http://localhost:3000/user/posts/${this.props.farmer.id}`)
    //     .then(resp => resp.json())
    //     .then(data => 
    //         this.setState({
    //         posts: data
    //         })
    //     )
    // }

    render(){
        let posts = this.props.posts
        //console.log(this.props.categories)
        return(
            <div className='center'> 
                <button onClick={this.renderRedirect}>Create New Post</button>
           
                { posts ? 
                    <PostList 
                        posts={posts} 
                        clickHandler={this.showPost} 
                        post={this.state.post} 
                        show={"edit"}
                    />
                : 
                    null
               }
       
            {this.state.post ? 
                <Post 
                    show={"edit"} 
                    postId={this.state.onePost.id} 
                    changeDate={this.changeDate} 
                    handleChange={this.changePost} 
                    falsifyPost={this.falsifyPost}
                    categories={this.props.categories}
                    states = {this.props.states}
                    changePosts={this.resetPosts}
                /> 
            : 
                null
            }
                {/* {this.state.form ? 
                    <PostForm categories={this.props.categories}/> 
                :  
                    null
                } */}
            </div>
        )
    }
}

export default withRouter(PostContainer) 




 // changeDate = (event, {name, value}) => {
    //     let nuArr = []
    //    let num1 = value.slice(0,2)
    //    let num2 = value.slice(3,5)
    //    let num3 = value.slice(6,10)
    //   let  num4 = value.slice(11)
    //    nuArr.push(num3, num2, num1)
    //    let dates = nuArr.join("-")
    //    let dating = dates + " " + num4
    //    let newDate = new Date(dating).toUTCString()
    //     this.setState({
    //         onePost: {
    //             ...this.state.onePost,
    //             startTime: newDate
    //         }
    //     })
    // }