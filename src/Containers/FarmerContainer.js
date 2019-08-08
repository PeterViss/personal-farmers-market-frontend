import React, {Component} from 'react'
import Navbar from '../Components/Navbar' 
import {Route} from 'react-router-dom'
import FarmerHome from '../Components/FarmerHome'
import Biography from '../Components/Biography'
import PostContainer from '../Components/PostContainer'

export default class FarmerContainer extends Component{
    state = {
        activeItem: 'Home',
        
    }

    navigating = (e) => {
        this.setState({
            activeItem: e.target.innerText
        })
    }


    render(){
       let names = ["Home", "Bio", "Posts"]
        return(
            <div>
              <Navbar clickHandler={this.navigating} active={this.state.activeItem} names={names} username={this.props.farmer.username}/> 
             
             
             <Route exact path="/Home" render={() =>
              <FarmerHome customer={this.props.customer}/>
            }/>

            <Route exact path="/Bio" render={() =>
                <Biography />     
            }/>

            <Route exact path="/Posts" render={() => 
                <PostContainer />
            }/>
            </div>
        )
    }
}