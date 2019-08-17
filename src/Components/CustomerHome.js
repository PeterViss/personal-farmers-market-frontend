import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import { Card } from 'semantic-ui-react'
import { Segment, Grid, Dimmer} from 'semantic-ui-react'
import PostList from './PostList'
import ChosenPost from './ChosenPost'
export default class CustomerHome extends Component{
  state = {
    post: {},
    displayPost: null
  }
//////////////////////////////////////////////////////////////////////////////////////////////////// 
    showPost = (post) => {
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
    render(){
      // let post = this.state.post
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
                description=
                 {customer.followees === undefined ? null
                  : 
                  <ul>
                    {customer.followees.map(followee => <li key={followee.id}>
                            {followee.username} 
                           <Link to={'/FarmerProfile'}> <button onClick={() => this.props.chooseFarmer(followee)}>View</button> </Link>
                      </li>)}
                  </ul>}
              />
              </Grid.Column>
             <Grid.Column width={4}>

               <Dimmer.Dimmable as={Segment} dimmed={true}>
               <h2>Posts:</h2>
              { customer.followees === undefined ? null :
                customer.followees.map(farmer => {
                return <Dimmer.Dimmable as={Segment} dimmed={true} key={farmer.id}>
                        <h3>{farmer.biography.name}</h3>
                        <PostList posts={farmer.posts} clickHandler={this.showPost} show={"show"} />
                        {/* <Dimmer>
                          <ChosenPost post={this.state.post} user={this.props.customer} changeDisplay={this.changeDisplay}/>
                       </Dimmer> */}
                       </Dimmer.Dimmable>
              })}

            
              </Dimmer.Dimmable>



             </Grid.Column>
             <Grid.Column width={5}>
               {this.state.displayPost ?
               <ChosenPost post={this.state.post} user={this.props.customer} changeDisplay={this.changeDisplay}/> : null}
             </Grid.Column>
              <Grid.Column width={1}></Grid.Column>
             </Grid>
             </Fragment>
        )
    }
    
}