import React, {Component} from 'react'
import Navbar from '../Components/Navbar' 
import {Route} from 'react-router-dom'
import FarmerHome from '../Components/FarmerHome'
import Biography from '../Components/Biography'
import PostContainer from './PostContainer'
import PostForm from '../Components/PostForm'

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
              <FarmerHome farmer={this.props.farmer}/>
            }/>

            <Route exact path="/Bio" render={() =>
                <Biography bio={this.props.farmer.biography} bioHandler={this.props.bioHandler} sendBio={this.props.sendBio}/>     
            }/>

            <Route exact path="/Posts" render={() => 
                <PostContainer />
            }/>

            <Route exact path="/PostForm" render={() => 
                <PostForm />
            }/>
            </div>
        )
    }
}