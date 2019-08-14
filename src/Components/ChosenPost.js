import React, {Component} from 'react'
import {Segment, Form} from 'semantic-ui-react'
class ChosenPost extends Component {
    state = {
        value: '',
        post: {}

    }


    handleChange = (e, {value}) => {
        this.setState({
            value: value,
            post: {}
        })
    }
    componentDidMount(){
    
        fetch(`http://localhost:3000/posts/${this.props.post.id}`)
        .then(resp => resp.json())
        .then(data =>
            
             this.setState({
            post: data
        })
        )
    }
    render(){
        console.log(this.state.post)
        let post = this.props.post 
if(post === undefined){return null}else{
    return(
    
    <Segment>
              Title: Farmer Market
              <br></br>
              Location: {post.location}
              <br></br>
              Category: {post.category !== undefined ? post.category.name : null}
              <br></br>
              Content: {post.content !== undefined ? post.content.split(" ").slice(0,7).join(" ") : null}
              <br></br>
              Start Time: {new Date(post.startTime).toDateString()}
              <br></br>
              Zipcode: {post.zip}
              <br></br>
              State: {post.state}
              <br></br>
              Comments: {<ul>{ post.comments ? post.comments.length > 0 ? post.comments.map(comment => <li key={comment.id}>{comment.content}</li>) : "No Comments Yet" : null}</ul>}
              <br></br>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Input placeholder='Add A Comment' name='comment' value={this.state.value} onChange={this.handleChange} />
                    <Form.Button content='Submit' />
                </Form.Group>
            </Form>
     </Segment>
    )}}

}

export default ChosenPost