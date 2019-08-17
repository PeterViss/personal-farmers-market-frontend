import React, {Component} from 'react'
import DatetimePicker from 'react-datetime-picker';
import moment from 'moment'
import { Form, TextArea, Segment} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
class Post extends Component{
   constructor(props){
       super(props);
    this.state = {
        enabled: false,
        date: '',
        post: {},
    } 
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   onChange = (date) => {
       let newDate = date.toISOString()
    this.setState({ 
        post: {
            ...this.state.post,
            startTime: newDate
        } , 
        date: date
    })}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    changePost = (e, {name, value}) => { 
        this.setState({
            post: {
                ...this.state.post,
                [name]: value 
            }
        })
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    changeSelect = (e, {name, value}) => {
        let item = {}
         this.props.categories.forEach(category => {
            if(category.name === value){
                return item = category
            }else{}
        })
        this.setState({
            post: {
                ...this.state.post,
                [name]: item
            }
        })
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    changeState = (e, {name, value}) => {
        let item = {}
        this.props.states.forEach(state => {
            if(state.name === value){
                return item = state
            }else{} 
        })
        this.setState({
            post: {
                ...this.state.post,
                [name]: item
            }
        })
    }
    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    enableForm = (e) => {
        e.preventDefault()
        this.setState({
            enabled: !this.state.enabled
        })
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    componentDidMount(){
        let id = this.props.postId
    fetch( `http://localhost:3000/posts/${id}`)
    .then(resp => resp.json())
    .then(data => 
        this.setState({
        post: data
        })
    )}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    patchForm = (e) => {
        let post = this.state.post
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
                    title: post.title,
                    content: post.content, 
                    startTime: post.startTime,
                    location: post.location,
                    zip: post.zip,
                    state_id: post.state.id,
                    attending: post.attending, 
                    user_id: post.user_id,
                    comments: post.comments,
                    category_id: post.category.id
                }  
            })
    
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
        this.props.falsifyPost()
     
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    deletePost = () => { 
        debugger
        let id = this.props.postId
        fetch(`http://localhost:3000/posts/${id}`, {
            method: 'DELETE'})
        .then(resp => resp.json())
        .then(data => this.props.changePosts(data))
      
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    render(){
        let newCategories = this.props.categories ? 
            this.props.categories.map(category => {
                 return {
                    key: category.id, 
                    text: category.name, 
                    value: category.name
                }
            }) 
        : null

        let newStates = this.props.states ? 
            this.props.states.map(state => {
                return {
                    key: state.id, 
                    text: state.name, 
                    value: state.name
                }
            }) 
        : null 
        //console.log(this.props.states)
        let post = this.state.post
       //console.log(post)
    return(
        
    <div >
        <Segment>
        <Form> 
        <Form.Input
          name="title"
          label='Title'
          value={post.title || ''}
          onChange={this.changePost}
          placeholder='Your Title Here...'
        />
        <Form.Field
          id='form-textarea-control-opinion'
          control={TextArea}
          name="content"
          label='Content'
          value={post.content || ''}
          onChange={this.changePost}
          placeholder='Your Content Here...'
        />
        <Form.Input 
            fluid name='location' 
            label='Location' 
            placeholder='Location' 
            value={post.location || ''} 
            onChange={this.changePost}
        />
        <Form.Input 
            fluid name='zip' 
            label='Zip' 
            placeholder='zipcode' 
            value={post.zip || ''} 
            onChange={this.changePost}
        />
        <Form.Select 
            label='State' 
            name='state' 
            placeholder='States' 
            //selected={} 
            value={post.state !== undefined ? post.state.name : null}
            onChange={this.changeState}
            options={newStates}
        />
        <Form.Select 
            label='Category' 
            name='category' 
            placeholder='Categories' 
            //value={this.state.category}
            //selected={post.category.name} 
            onChange={this.changeSelect}
            value={ post.category !== undefined ? post.category.name : null}
            options={newCategories}
        />
       
      </Form>
            
            <Segment>
                {moment(this.state.post.startTime).format('MMM-D-YYYY hh:mm a')} 
                    <button onClick={this.enableForm}>edit</button>
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
                <Form.Button onClick={this.deletePost}>Delete</Form.Button>
                </Form.Group>
            </Form>
        </Segment>  
        </div>


    )
}
}
export default withRouter(Post)