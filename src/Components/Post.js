import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import DatetimePicker from 'react-datetime-picker';
import moment from 'moment'

  
class Post extends Component{
   constructor(props){
       super(props);
    this.state = {
        enabled: false,
        date: new Date(),
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

    changePost = (event) => { 
        debugger
        this.setState({
            post: {
                ...this.state.post,
                [event.target.name]: event.target.value 
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
        let t = this
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
       console.log(this.state.post)
    //    console.log(this.props.postId)
        
    return(
        
        <div>
            <form>
        <div>
            
            {moment(this.state.post.startTime).format('MMM-D-YYYY hh:mm a')} 
                <button onClick={this.enableForm}>edit</button>

            <input name='content' value={this.state.post.content} onChange={this.changePost}/>    
                <button onClick={this.props.falsifyPost}>nevermind</button>
                <button onClick={this.patchForm}>submit</button>


            <div>
                {this.state.enabled ? 
                    <DatetimePicker
                        value={this.state.date}
                        onChange={this.onChange}
                        disableClock={true}
                        disableCalendar={false}
                        clearIcon={null}
                    /> 
                :
                     null
                }
          </div>      
        </div>
        </form>
            <Link to="/PostForm"><button>Create New Post</button></Link>  
        </div>
    )
}
}
export default Post