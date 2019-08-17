import React, {Component} from 'react'
import { Form, TextArea } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import DateTimePicker from 'react-datetime-picker'
import {withRouter} from 'react-router-dom'

class PostForm extends Component{
    state = {
        title: '',
        date: '', 
        post: {},
        content: '',
        location: '',
        zipcode: '',
        state: '',
        category: '',
        attending: 0
    }

////////////////////////////////////////////////////////////////////////////////////////////////
    changeValue = (e, {name, value}) => { 
      this.setState({
              [name]: value 
      })
    }

/////////////////////////////////////////////////////////////////////////////////////////////
  changeZip = (e, {name, value}) => {
    const re = /^[0-9\b]+$/
    
        if(value === '' || re.test(value)){
          this.setState({
            [name]: value 
          })
        }else{}
  }

////////////////////////////////////////////////////////////////////////////////////////////
    changeSelect = (e, {name, value}) => {
      let item = {}
       this.props.categories.forEach(category => {
          if(category.name === value){
              return item = category
          }else{}
      })
      this.setState({
              [name]: item 
      })
    }

/////////////////////////////////////////////////////////////////////////////////////////////////
  changeState = (e, {value}) => {
      let item = {}
      this.props.states.forEach(state => {
          if(state.name === value){
              return item = state
          }else{} 
      })
      this.setState({
              state: item 
      })
  }

///////////////////////////////////////////////////////////////////////////////////////////////////
    onDateChange = date => this.setState({ date })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
  submitPost = () => {
    fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            title: this.state.title,
            content: this.state.content,
            startTime: this.state.date,
            location: this.state.location,
            zip: this.state.zipcode, 
            state_id: this.state.state.id, 
            attending: 0, 
            user_id: this.props.farmerId,
            category_id: this.state.category.id

        })
    })
    .then(resp => resp.json())
    .then(data => {this.props.createPost(data)})
    this.props.history.push("/Posts")
  }



////////////////////////////////////////////////////////////////////////////////////////////////////
    render(){
      let newCategories = this.props.categories ? this.props.categories.map(category => 
        { return {key: category.id, text: category.name, value: category.name}}
        ) : null
        let newStates = this.props.states ? this.props.states.map(state => {
          return {key: state.id, text: state.name, value: state.name}
      }) : null 
        //debugger
      //console.log(newCategories)
      //What a post needs: 
      //content, startTime, location, zip, state_id, attending, user_id, category_id
    return(
        <div className='center'>
          <DateTimePicker
          onChange={this.onDateChange}
          value={this.state.date}
          />
        <div></div>
       <Form onSubmit={this.submitPost}> 
       <Form.Input
          value={this.state.title || ''}
          label='Title'
          name='title'
          placeholder='Title'
          onChange={this.changeValue}
        />
        <Form.Field
          id='form-textarea-control-opinion'
          control={TextArea}
          value={this.state.content || ''}
          label='Content'
          name='content'
          placeholder='Content here'
          onChange={this.changeValue}
        />
        <Form.Input 
          fluid label='Location' 
          name='location' 
          placeholder='Location' 
          value={this.state.location || ''} 
          onChange={this.changeValue}
        />
        <Form.Input 
          fluid label='Zip' 
          placeholder='zipcode' 
          value={this.state.zipcode || ''} 
          name='zipcode' 
          onChange={this.changeZip}
        />
        <Form.Select 
          label='State' 
          name='state' 
          options={newStates} 
          placeholder='States' 
          onChange={this.changeState}
        />
        <Form.Select 
          label='Category' 
          name='category' 
          options={newCategories} 
          placeholder='Categories' 
          onChange={this.changeSelect}
        />
       
       <Link to='/Posts'><Form.Button>Go Back</Form.Button></Link> 
        <Form.Button>Submit</Form.Button>
      </Form>
     
    </div>
    )
    }
}


export default withRouter(PostForm)


       
