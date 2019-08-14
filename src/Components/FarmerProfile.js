import React, {Component, Fragment} from 'react'
import {Grid, Segment, Card, Container} from 'semantic-ui-react' 
import PostList from './PostList'
import ChosenPost from './ChosenPost'

export default class FarmerProfile extends Component {
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
        let farmer = this.props.history.location.state.farmer
        let showPost = this.showPost
        console.log(farmer)
        return (
             farmer ?
            <Grid celled>
                <Grid.Row>
                    <Grid.Column align="center">
                    <h2><Segment compact>Brooding Bee and Honey Co.</Segment></h2>
                    </Grid.Column>
                </Grid.Row>
                        <Grid.Row>
                        
                            <Grid.Column align="center" className='center'>
                        <Card.Group  className='center' itemsPerRow={2} width={2}>
                        <Card fluid>
                        <Card.Content >
                        <Card.Header>Biography</Card.Header>
                        <Card.Description>{farmer.biography.description}</Card.Description>
                        <Card.Description align='right'><button></button></Card.Description>
                        </Card.Content>
                        </Card>
                        
                        
                        <Card fluid>
                        <Card.Content >
                        <Card.Header>Posts:</Card.Header>
                        <Card.Description>
                            <PostList  key={farmer.id} posts={farmer.posts} clickHandler={showPost} show={"show"}/>
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

                       
                        </Card.Group>
                        </Grid.Column>   
                </Grid.Row>

                <Grid.Row>
                <Grid.Column width={5}>
               {post.category === undefined ? null :
               <ChosenPost post={post}/>
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