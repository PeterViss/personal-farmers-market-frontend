import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import { Form } from 'semantic-ui-react' 
export default class Login extends Component{
    state = {
        username: '',
        password: '', 
        loggedIn: false
    }


    handleChange = (event, {value, name}) => {
        let newValue = value.trim()
        this.setState({
            [name]: newValue
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        e.persist();
        const data = this.state
        fetch("http://localhost:3000/login",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(info => {
            
            if (info.authenticated === "true"){
                this.setState({
                    loggedIn : true
                })
                let userinfo = JSON.parse(info.userinfo)
                this.props.updateLoggedInUser(userinfo)
                
            }else{
                alert(info.message)
            }
        })
    }    
render(){
    return(
        this.state.loggedIn ? <Redirect to="/Home"/>
        : 
        <Form onSubmit={this.handleSubmit} postition='right'>
        <Form.Group>
          <Form.Input placeholder='Username' name='username' value={this.state.username} onChange={this.handleChange} />
          <Form.Input placeholder='Password' name='password' type="password"value={this.state.password} onChange={this.handleChange} />
          <Form.Button content='Submit' />
        </Form.Group>
      </Form>

    )
}
}