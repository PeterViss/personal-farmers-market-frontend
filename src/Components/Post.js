import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import DatetimePicker from 'react-datetime-picker';
import moment from 'moment'
import { Form, TextArea, Segment} from 'semantic-ui-react'
  
class Post extends Component{
   constructor(props){
       super(props);
    this.state = {
        enabled: false,
        date: '',
        post: {},
    } 
}

   onChange = (date) => {
       let newDate = date.toISOString()
    this.setState({ 
        post: {
            ...this.state.post,
            startTime: newDate
        } , 
        date: date
    })}

    changePost = (e, {name, value}) => { 
        debugger
        this.setState({
            post: {
                ...this.state.post,
                [name]: value 
            }
        })
    }
    
    
    
    enableForm = (e) => {
        e.preventDefault()
        this.setState({
            enabled: !this.state.enabled
        })
    }


    componentDidMount(){
        let id = this.props.postId
    fetch( `http://localhost:3000/posts/${id}`)
    .then(resp => resp.json())
    .then(data => 
        this.setState({
        post: data
        })
    )}

    patchForm = (e) => {
        let post = this.state.post
        debugger
        e.preventDefault()
        let id = this.props.postId
        fetch(`http://localhost:3000/posts/${id}`, {
            method: 'PATCH',
            headers:{
                "Content-Type": "application/json", 
                Accept: "application/json"
            },
            body: JSON.stringify({
                post: {
                    id: post.id,
                    content: post.content, 
                    startTime: post.startTime,
                    location: post.location,
                    zip: post.zip,
                    state: post.state,
                    attending: post.attending, 
                    user_id: post.user_id,
                    comments: post.comments,
                }  
            })
    
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
    }


    render(){
       //console.log(this.state.post)
    //    console.log(this.props.postId)
        let post = this.state.post
        let options = null
    return(
        
    <div >
        <Segment>
        <Form> 
        
        <Form.Field
          id='form-textarea-control-opinion'
          control={TextArea}
          name="content"
          label='Content'
          value={post.content}
          onChange={this.changePost}
          placeholder='Your Content Here...'
        />
        <Form.Input fluid name='location' label='Location' placeholder='Location' value={post.location} onChange={this.changePost}/>
        <Form.Input fluid name='zip' label='Zip' placeholder='zipcode' value={post.zip} onChange={this.changePost}/>
        <Form.Input fluid name='state' label='State' placeholder='state' value={post.state} onChange={this.changePost}/>
        <Form.Select 
            label='Category' 
            name='category' 
            placeholder='Categories' 
            selected={post.category} 
            onChange={this.changePost}
            options={options}
        />
       
       {/* <Form.Group align='right'>
        <Form.Button onClick={this.patchForm}>Submit</Form.Button>
        <Form.Button onClick={this.props.falsifyPost}>Nevermind</Form.Button>
        <Form.Button>Delete</Form.Button>
        </Form.Group> */}
      </Form>
            
            <Segment>
                
            {moment(this.state.post.startTime).format('MMM-D-YYYY hh:mm a')} 
                <button onClick={this.enableForm}>edit</button>
            {/* <input name='content' value={this.state.post.content || ''} onChange={this.changePost}/>    
                <button onClick={this.props.falsifyPost}>nevermind</button>
                <button onClick={this.patchForm}>submit</button> */}
            </Segment> 
           
                {this.state.enabled ?
                <Segment> 
                    <DatetimePicker
                        value={this.state.date}
                        onChange={this.onChange}
                        disableClock={true}
                        disableCalendar={false}
                        clearIcon={null}
                    /> 
                    </Segment>
                :
                     null
                }
                
            <Form>
                <Form.Group align='right'>
                <Form.Button onClick={this.patchForm}>Submit</Form.Button>
                <Form.Button onClick={this.props.falsifyPost}>Nevermind</Form.Button>
                <Form.Button>Delete</Form.Button>
                </Form.Group>
            </Form>
        </Segment>
            <Link to="/PostForm"><button>Create New Post</button></Link>  
        </div>


    )
}
}
export default Post