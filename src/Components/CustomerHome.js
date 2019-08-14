import React, {Component, Fragment} from 'react'
import {Link, Route, Redirect} from 'react-router-dom'
import { Card } from 'semantic-ui-react'
import { Segment, Grid} from 'semantic-ui-react'
import PostList from './PostList'
import ChosenPost from './ChosenPost'
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
      let customer = this.props.customer
      // let farmers = this.props.customer.followees.map(farmer => {return farmer})}
      // console.log(this.props.customer)
      // console.log(this.state.post)
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
                           <Link to={
                             {
                             pathname: '/FarmerProfile',
                             state: {farmer: followee}, 
                             showPost: this.showPost
                           }
                           }> <button>View</button> </Link>
                      </li>)}
                  </ul>}
              />
              </Grid.Column>
             <Grid.Column width={4}>
               <Segment>
               <h2>Posts:</h2>
              { this.props.customer.followees === undefined ? null :
                this.props.customer.followees.map(farmer => {
                return <Segment key={farmer.id}>
                        <h3>{farmer.biography.name}</h3>
                        <PostList posts={farmer.posts} clickHandler={this.showPost} show={"show"}/>
                       </Segment>
              })}
              </Segment>
             </Grid.Column>
             <Grid.Column width={5}>
               {post.content !== undefined ?
               <ChosenPost post={this.state.post} /> : null}
             </Grid.Column>
              <Grid.Column width={1}></Grid.Column>
             </Grid>
             </Fragment>
        )
    }
    
}