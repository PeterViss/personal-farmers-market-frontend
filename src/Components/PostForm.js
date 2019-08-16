import React, {Component} from 'react'
import { Form, TextArea } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import DateTimePicker from 'react-datetime-picker'


export default class PostForm extends Component{
    state = {
        date: '', 
        time: '',
        dateTime: '',
        post: {}
    }


    onChange = date => this.setState({ date })

    render(){
    
      let newCategories = this.props.categories ? this.props.categories.map(category => 
        { return {key: category.id, text: category.name, value: category.name}}
        ) : null
        debugger
      console.log(newCategories)
      //What a post needs: 
      //content, startTime, location, zip, state, attending, user_id, category_id
    return(
        <div className='center'>
          <DateTimePicker
          onChange={this.onChange}
          value={this.state.date}
          />
        <div></div>
       <Form> 
        
        <Form.Field
          id='form-textarea-control-opinion'
          control={TextArea}
          label='Opinion'
          placeholder='Opinion'
        />
        <Form.Input fluid label='Location' placeholder='Location' />
        <Form.Input fluid label='Zip' placeholder='zipcode'/>
        <Form.Input fluid label='State' placeholder='state'/>
        <Form.Select label='Category' options={newCategories} placeholder='Categories'/>
       
       <Link to='/Posts'><Form.Button>Go Back</Form.Button></Link> 
        <Form.Button>Submit</Form.Button>
      </Form>
     
    </div>
    )
    }
}


{/* <DateInput
          name="date"
          placeholder="Date"
          value={this.state.date}
          iconPosition="left"
          onChange={this.handleChange}
        />
        <TimeInput
          name="time"
          placeholder="Time"
          value={this.state.time}
          iconPosition="left"
          onChange={this.handleChange}
        />
        <DateTimeInput
          name="dateTime"
          placeholder="Date Time"
          value={this.state.dateTime}
          iconPosition="left"
          onChange={this.handleChange}
        /> */}
       
