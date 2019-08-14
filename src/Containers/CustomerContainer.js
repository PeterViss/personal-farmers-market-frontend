import React, {Component} from 'react'
import Navbar from '../Components/Navbar'
import CustomerHome from '../Components/CustomerHome'
import {Route} from 'react-router-dom' 
import MarketSearch from '../Components/MarketSearch'
import FarmerSearch from '../Components/FarmerSearch'
import FarmerProfile from '../Components/FarmerProfile'
import { Grid } from 'semantic-ui-react'





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
            <Grid>
                <Grid.Column width={16}>
                <Grid.Row>
             <Navbar clickHandler={this.navigating} active={this.state.activeItem} names={["Search For Farmers", "Search For Markets", "Home"]} username={this.props.customer.username} logout={this.props.logout}/> 
             </Grid.Row>
             </Grid.Column>
           <Grid.Row>
            
            <Grid.Column width={16}>
            <Route exact path="/Home" render={() =>
              <CustomerHome customer={this.props.customer}/>
            }/>
            </Grid.Column>

            <Grid.Column width={16}>
            <Route exact path="/Search For Markets" render={() =>
                <MarketSearch />     
            }/>
            </Grid.Column>

            <Grid.Column width={16}>
            <Route exact path="/Search For Farmers" render={() => 
                <FarmerSearch />
            }/>
            </Grid.Column>

            <Grid.Column width={16}>
            <Route path="/FarmerProfile" exact component={FarmerProfile} 
            />
            </Grid.Column>
            </Grid.Row>
            </Grid>
            </div>
        )
    }
}