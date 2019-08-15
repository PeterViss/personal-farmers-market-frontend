import React, {Component} from 'react'
import {Grid, Segment, Card} from 'semantic-ui-react' 
import PostList from './PostList'
import ChosenPost from './ChosenPost'

export default class FarmerProfile extends Component {
    state = {
        length: 0,
        post: {},
        displayPost: null
    }
    showPost = (post) => {
        fetch(`http://localhost:3000/posts/${post.id}`)
        .then(resp => resp.json())
        .then(data => this.setState({
          displayPost: true,
          post: data,
          
        }))
      }


      changeDisplay = () => {
        this.setState({
          displayPost: false
        })
      }


    render(){
        let post = this.state.post
        let farmer = this.props.farmer 
        let customer = this.props.customer
        // console.log(farmer)
        // console.log(customer)
        return (
         
             farmer ?
            <Grid celled>
                <Grid.Row>
                    <Grid.Column align="center">
                    <h2><Segment compact>{farmer.biography.name}</Segment></h2>
                    </Grid.Column>
                </Grid.Row>
                        <Grid.Row>
                        
                            <Grid.Column align="center" className='center'>
                        <Card.Group  className='center' itemsPerRow={2} width={2}>
                        <Card fluid={false}>
                        <Card.Content >
                        <Card.Header>Biography</Card.Header>
                        <Card.Description>{farmer.biography.description}</Card.Description>
                       
                        </Card.Content>
                        </Card>
                        
                        
                        <Card fluid>
                        <Card.Content >
                        <Card.Header>Posts:</Card.Header>
                        <Card.Description>
                            <PostList  key={farmer.id} posts={farmer.posts} clickHandler={this.showPost} show={"show"}/>
                        </Card.Description>
                        </Card.Content>
                        </Card>

                        <Card>
                        <Card.Content >
                        <Card.Header>Categories:</Card.Header>
                        <Card.Description>
                            <ul>
                            {farmer.categories.map(category => {
                              return  <li key={category.id}>{category.name}</li>
                            })}
                            </ul>
                        </Card.Description>
                        </Card.Content>
                        </Card>

                        <Card fluid>
                        <Card.Content >
                        <Card.Header>Followers:</Card.Header>
                        <Card.Description>
                           <h4>{this.props.length === null ? farmer.followers.length : this.props.length}</h4> 
                           <br></br>
                          { this.props.following ? <button onClick={() => this.props.toggleUnFollow(customer, farmer)}>Unfollow</button> : <button onClick={() => this.props.toggleFollow(customer, farmer)}>Follow</button>} 
                         
                        </Card.Description>
                        </Card.Content>
                        </Card>
                        </Card.Group>
                        </Grid.Column>   
                </Grid.Row>

                <Grid.Row>
                <Grid.Column width={5}>
               { this.state.displayPost ? 
               <ChosenPost post={post} user={customer} changeDisplay={this.changeDisplay}/>
               : null 
             }
             </Grid.Column>
              <Grid.Column width={1}></Grid.Column>
                </Grid.Row>
                
            </Grid>
    :
    <h1>Farmer Does Not Exist</h1>
            )
    }

}