import React, {Component} from 'react'
import {Segment, Form} from 'semantic-ui-react'
class ChosenPost extends Component {
    state = {
        value: '',
        post: {}
    }
/////////////////////////////////////////////////////////////////////////////////////////
    handleSubmit = (e) => {
      let value = this.state.value
      let postId = this.props.post.id
      let userId = this.props.user.id 
        fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                content: value,
                user_id: userId,
                post_id: postId
            })
        })
        .then(resp => resp.json())
        .then(data => 
            this.setState({
                value: '',
                post: {
                    ...this.state.post, 
                    comments: [
                        ...this.state.post.comments, 
                        data
                    ]
                }
            })
        )
    }
//////////////////////////////////////////////////////////////////////////////////////////////
    deletePost = (e, comment) => {
    fetch(`http://localhost:3000/comments/${comment.id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
        })
    .then(resp => resp.json())
    .then(data => console.log(data))
    }

///////////////////////////////////////////////////////////////////////////////////////////////////
    handleChange = (e, {value}) => {
        this.setState({
            value: value,
        })
    }
///////////////////////////////////////////////////////////////////////////////////////////////////
    componentDidMount(){
        let id = this.props.post.id
        fetch(`http://localhost:3000/posts/${id}`)
        .then(resp => resp.json())
        .then(data =>
             this.setState({
            post: data
        })
        )
    }
///////////////////////////////////////////////////////////////////////////////////////////////////
    render(){
        
        console.log(this.state.post)
        let userId = this.props.user.id
        let post = this.state.post 
        if(post === undefined){return null}else{
            return(
                <Segment>
                      
                        Title: {post.title}
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
                        State: {post.state !== undefined ? post.state.name : null}
                        <br></br>
                        Comments: {<ul>
                                        { this.state.post.comments ? this.state.post.comments.length > 0 ? 
                                            this.state.post.comments.map(comment => 
                                            <Segment key={comment.id}>{comment.content} { comment.user_id === userId ? <button align="right" onClick={(event) => this.deletePost(event, comment)}>Delete</button> : null}</Segment>)
                                        : "No Comments Yet" : null}
                                    </ul>}
                        <br></br>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Input placeholder='Add A Comment' name='comment' value={this.state.value} onChange={this.handleChange} />
                                <Form.Button content='Submit' />
                                <Form.Button onClick={this.props.changeDisplay} content='Nevermind'/> 
                            </Form.Group>
                        </Form>
                        
                </Segment>
    )}}

}

export default ChosenPost