import React, {Component} from 'react'
import {Search} from 'semantic-ui-react'
import _ from 'lodash'
export default class MarketSearch extends Component{
    state = {
        isLoading: false,
        categories: [],
        choose: []
    }


    handleSearchChange = (e) => {
        let t = this 
      let chosen =  this.state.categories.filter(category => {
       
         if(category.name.includes(e.target.value)){
             return category.name
         }else{}
          
        })
    
        this.setState({
            choose: chosen
        })
    }

    getResults = (e) => {
        
    }

    handleResultSelect = () => {
        console.log("hello")
        debugger
    }
    componentDidMount(){
        fetch('http://localhost:3000/categories')
        .then(resp => resp.json())
        .then(data => 
            this.setState({
                categories: data
            })
            )
    }

    render(){
        console.log(this.state.choose)
        return(
            <div>
              <Search
                category
                    loading={this.state.isLoading}
                    onResultSelect={this.handleResultSelect}
                     onSearchChange={_.debounce(this.handleSearchChange, 500, {
                        leading: true,
                      })}
                // results={this.getResults}
                // value={value}
                // {...this.props}
                //resultRenderer={resultRenderer}
          />
            </div>
        )
    }
}