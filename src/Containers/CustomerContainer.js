import React, {Component} from 'react'
import Navbar from '../Components/Navbar'
import CustomerHome from '../Components/CustomerHome'
import {Route} from 'react-router-dom' 
import MarketSearch from '../Components/MarketSearch'
import FarmerSearch from '../Components/FarmerSearch'



export default class CustomerContainer extends Component{
    state = {
        activeItem: 'Home',
      
       
    }

    navigating = (e) => {
        this.setState({
            activeItem: e.target.innerText,
            
        })
        

    }

    

    render(){
        return(
            <div>
             <Navbar clickHandler={this.navigating} active={this.state.activeItem} names={["Home", "Search For Markets", "Search For Farmers"]} username={this.props.customer.username}/> 
             
             
            <Route exact path="/Home" render={() =>
              <CustomerHome customer={this.props.customer}/>
            }/>

            <Route exact path="/Search For Markets" render={() =>
                <MarketSearch />     
            }/>

            <Route exact path="/Search For Farmers" render={() => 
                <FarmerSearch />
            }/>
            </div>
        )
    }
}