import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { Form } from 'semantic-ui-react'
import moment from 'moment'
import {
    DateInput,
    TimeInput,
    DateTimeInput
  } from 'semantic-ui-calendar-react';

class Post extends Component{
   constructor(props){
       super(props)
    this.state = {
        startTime: this.props.post.startTime,
        test: []
    } 
   }

   

    // componentWillReceiveProps(props){
    //     debugger
    //     this.setState({
    //         startTime: props.post.startTime
    //     })
    // }
    //  const dayCount = (props.post.month) => {
    //     return "okay"
    // } 
    render(){
     
        let t = this
        
    return(
        
        <div>
        <div>
            <form>
            <input value={this.props.post.content || ""} name="content" onChange={this.props.handleChange}/>
          
            
        

            <input value={this.props.post.zip || ""} name="zip"  onChange={this.props.handleChange}/>
            

            {new Date(this.props.post.startTime).toDateString()}
        <DateTimeInput
          name="dateTime"
          placeholder="Date Time"
          value={moment(this.props.post.startTime).format('MM-D-YY hh:mm ')}
          iconPosition="left"
          onChange={this.props.changeDate}
        />
         <DateInput
          name="date"
          placeholder="Date"
          value={moment(this.props.post.startTime).format('MM-D-YY')}
          iconPosition="left"
          onChange={this.props.changeDate}
        />
        <TimeInput
          name="time"
          placeholder="Time"
          value={this.state.time}
          iconPosition="left"
          onChange={this.changeTime}
        />
        </form>
        </div>
        
            <Link to="/PostForm"><button>Create New Post</button></Link>  
        </div>
    )
}
}
export default Post