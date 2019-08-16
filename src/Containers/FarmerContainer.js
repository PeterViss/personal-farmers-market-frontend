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
        categories: [],
        states: []
    }

    navigating = (e) => {
        this.setState({
            activeItem: e.target.innerText
        })
    }

    componentDidMount(){
        fetch('http://localhost:3000/categories')
        .then(resp => resp.json())
        .then(data => 
            this.setState({
                categories: data
            })
            )
            fetch('http://localhost:3000/states')
            .then(resp => resp.json())
            .then(data => 
                this.setState({
                    states: data
                })
                )    
    }

    render(){
      console.log(this.state.states)
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
                <PostContainer categories={this.state.categories} states={this.state.states} farmer={this.props.farmer}/>
            }/>

            <Route exact path="/PostForm" render={() => 
                <PostForm categories={this.state.categories} states={this.state.states}/>
            }/>

            <Route exact path="/Post" render={() =>
                <Post />
            }/>
            </div>
        )
    }
}