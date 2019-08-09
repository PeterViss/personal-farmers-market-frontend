import React, {Component} from 'react'
import FarmerContainer from './FarmerContainer'
import CustomerContainer from './CustomerContainer'
import {Route,Redirect} from 'react-router-dom'
export default class MainContainer extends Component {
    state = {
        user: {}
    }

    setBio = (event) => {
        
        this.setState({
            user: { 
                ...this.state.user, 
                biography: {
                    ...this.state.user.biography,
                    [event.target.name]: event.target.value
                }
            }
        })
    }

    sendBio = (event) => {
        let bio = this.state.user.biography 
        let num = parseInt(event.target.id)
        debugger
        fetch(`http://localhost:3000/biographies/${num}`, {
            method: 'PATCH',
            headers:{
                "Content-Type": "application/json", 
                Accept: "application/json"
            },
            body: JSON.stringify({
                biography: bio
            })
    
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
    
    }

    componentDidMount(){
      let  t = this
        fetch("http://localhost:3000/users/1")
        .then(resp => resp.json())
        .then(data => t.setState({
            user: data
        })) 
    }

    render(){
        
        return(
            <div>
                { this.state.user.role === "farmer" ?
                <FarmerContainer farmer={this.state.user} bioHandler={this.setBio} sendBio={this.sendBio}/>
            :
                <CustomerContainer customer={this.state.user}/>
            }
            </div>
        )
    }
}