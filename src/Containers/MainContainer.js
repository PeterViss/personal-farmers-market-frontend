import React, {Component} from 'react'
import FarmerContainer from './FarmerContainer'
import CustomerContainer from './CustomerContainer'
import {Route,Redirect} from 'react-router-dom'
export default class MainContainer extends Component {
    state = {
        user: {}
    }
    componentDidMount(){
      let  t = this
        fetch("http://localhost:3000/users/58")
        .then(resp => resp.json())
        .then(data => t.setState({
            user: data
        }))
    
    }

    render(){
        
        return(
            <div>
                { this.state.user.role === "farmer" ?
                <FarmerContainer farmer={this.state.user}/>
            :
                <CustomerContainer customer={this.state.user}/>
            }
            </div>
        )
    }
}