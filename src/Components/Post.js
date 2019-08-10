import React, {Component} from 'react'
import {Link} from 'react-router-dom'


 import DatetimePicker from 'react-datetime-picker';
import moment from 'moment'

  
class Post extends Component{
   constructor(props){
       super(props);
    this.state = {
        disabled: false,
        date: new Date(),
        post: {},
    } 
   }

   

   onChange = date => {
    let nuDate = Date(moment(date))  
    this.setState({ 
        post: {
            ...this.state.post,
            startTime: date
        } , 
        date: date
 
    })}

    enableForm = (e) => {
        
        this.setState({
            disabled: true
        })
    }
    componentDidMount(){
    fetch('http://localhost:3000/posts/1')
    .then(resp => resp.json())
    .then(data => this.setState({
        post: data

        })
    )}

    render(){
       console.log(moment(this.state.post.startTime).format())
        
    return(
        
        <div>
        <div>
            
            {moment(this.state.post.startTime).format('MMM-D-YYYY hh:mm a')} <button onClick={this.enableForm}>edit</button>
            <div>
                {this.state.disabled ? 
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
            
  {/* moment(this.props.post.startTime).format('MM-D-YYYY hh:mm a')

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
        /> */}
        
        
        </div>
        
            <Link to="/PostForm"><button>Create New Post</button></Link>  
        </div>
    )
}
}
export default Post