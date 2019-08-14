import React, {Component} from 'react'
import {Input, Grid, Segment} from 'semantic-ui-react'
export default class FarmerSearch extends Component{
    state = {
        value: '',
        farmers: [],
        filtered: []
    }

    handleSearchChange = (e, {value}) => { 
       let filtered = this.state.farmers.filter(farmer => {
           if(value = ''){return}
           else{
           if(farmer.biography.name.toLowerCase().includes(value.toLowerCase())){
                return farmer
            }else{return }
        }})
        this.setState({
            value: value,
            filtered: filtered
        })
    }

    componentDidMount(){
        fetch('http://localhost:3000/user/farmers')
        .then(resp => resp.json())
        .then(data => this.setState({
            farmers: data
        }))
    }

    
    render(){
        console.log(this.state.filtered)
        return(
            <div>
                <div className="center">
                <Input placeholder='Search Farmers...' value={this.state.value} onChange={this.handleSearchChange}/>
                </div>
                <div className="center">
                {this.state.filtered.length === 0 ?  null
                //   this.state.farmers.map(
                //     farmer => {
                //         return <Segment key={farmer.id} raised>
                //          Title: {farmer.biography.name}
                //          <br></br>
                //          <br></br>
                //          Categories: 
                //          <ul>
                //          {farmer.categories.map(category => 
                //              <li key={category.id}>{category.name}</li>)}
                //          </ul>
                // </Segment> })
                : this.state.filtered.map(farmer => {
                   return <Segment key={farmer.id} raised>
                    Title: {farmer.biography.name}
                    <br></br>
                    <br></br>
                    Categories: 
                    <ul>
                    {farmer.categories.map(category => 
                        <li key={category.id}>{category.name}</li>)}
                    </ul>
           </Segment> })
                }
                </div>
            </div>
        )
    }
}