import React, {Component} from 'react'
import Navbar from '../Components/Navbar' 
import {Route} from 'react-router-dom'
import FarmerHome from '../Components/FarmerHome'
import Biography from '../Components/BiographyEdit'
import PostContainer from './PostContainer'
import PostForm from '../Components/PostForm'
import Post from '../Components/Post'

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
      
       let names = ["Posts", "Bio", "Home"]
        return(
            <div>
              <Navbar clickHandler={this.navigating} active={this.state.activeItem} names={names} username={this.props.farmer.username} logout={this.props.logout}/> 
             
             
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

            <Route exact path="/Post" render={() =>
                <Post/>
            }/>
            </div>
        )
    }
}