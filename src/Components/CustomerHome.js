import React, {Component, Fragment} from 'react'
import { Card } from 'semantic-ui-react'
import { Segment, Grid} from 'semantic-ui-react'
import PostList from './PostList'
export default class CustomerHome extends Component{
  state = {
    post: {}
  }

    showPost = (post) => {
      fetch(`http://localhost:3000/posts/${post.id}`)
      .then(resp => resp.json())
      .then(data => this.setState({
        post: data
      }))
    }

    render(){
      
      let post = this.state.post
     
      // let farmers = this.props.customer.followees.map(farmer => {return farmer})}
      
      console.log(this.state.post)
        return (
          <Fragment>
            <Grid >
              <Grid.Column width={1}></Grid.Column>
              <Grid.Column width={5}>
              <Card
                header='Who You Are Following'
                meta='Friend'
                description=
                 { this.props.customer.followees === undefined ? null
                  : 
                  <ul>
                    {this.props.customer.followees.map(followee => <li key={followee.id}>
                            {followee.username} 
                            <button>View</button>
                      </li>)}
                  </ul>}
              />
              </Grid.Column>
             <Grid.Column width={4}>
              { this.props.customer.followees === undefined ? null :
                this.props.customer.followees.map(farmer => {
                return <PostList key={farmer.id} posts={farmer.posts} clickHandler={this.showPost} show={"show"}/>
              })}
             </Grid.Column>
             <Grid.Column width={5}>
               { post.category === undefined ? null :
              <Segment>
              Title: Farmer Market
              <br></br>
              Location: {post.location}
              <br></br>
              Category: {post.category.name}
              <br></br>
              Content: {post.content.split(" ").slice(0,7).join(" ")}
              <br></br>
              Start Time: {new Date(post.startTime).toDateString()}
              <br></br>
              Zipcode: {post.zip}
              <br></br>
              State: {post.state}
              <br></br>
              Comments: {<ul>{post.comments.length > 0 ? post.comments.map(comment => <li key={comment.id}>{comment.content}</li>) : "No Comments Yet"}</ul>}
              </Segment>}
             </Grid.Column>
              <Grid.Column width={1}></Grid.Column>
             </Grid>
             </Fragment>
        )
    }
}