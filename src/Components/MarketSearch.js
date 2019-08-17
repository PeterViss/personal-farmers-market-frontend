import React, {Component, Fragment} from 'react'
import {Input,  Checkbox, Grid, Segment} from 'semantic-ui-react'
import moment from 'moment'


export default class MarketSearch extends Component{
    state = {
        disabled: true,
        value: '',
        filtered: false,
        posts: [],
        categories: [],
        chooseCat: [],
        catNames: [],
        chooseZip: []
    }


    chosenCat = (e, {label}) => {
        let value = label.props.children
        if(this.state.catNames.includes(value)){
            let unchoose = this.state.catNames.filter(name => name !== value)
            let removed = this.state.chooseCat.filter(post => {return post.category.name !== value})
            this.setState({
                catNames: unchoose,
                chooseCat: removed,
                filtered: !this.state.filtered
            })
        } else {

       return this.state.chooseZip.filter(post => {
         if(post.category.name.toLowerCase().includes(value.toLowerCase())){
           return this.setState({
                catNames: [...this.state.catNames, post.category.name],
                chooseCat: [...this.state.chooseCat, post],
                filtered: !this.state.filtered
            })
             
         }else{ return
            //  debugger
            // this.setState({
            //     chooseCat:[...this.state.chooseCat, {message: `${post.category.name} does not exist within this area.`}]
            // })
         }
          
        })
    }
        

       
    }

    handleSearchChange = (e, {value}) => {
        const re = /^[0-9\b]+$/
        if(value === '' || re.test(value)){
        let zips = this.state.posts.filter(post => { 
            if(value === ''){this.setState({disabled: true})}
            else{
                if(post.zip.toString().includes(value)){
                    return post 
                }else{return}
        }})
        this.setState({
            value: value, 
            chooseZip: zips,
            disabled: false,
        })}else{}

    }

 
    componentDidMount(){
        fetch('http://localhost:3000/categories')
        .then(resp => resp.json())
        .then(data => 
            this.setState({
                categories: data
            })
            )
        fetch('http://localhost:3000/posts')
        .then(resp => resp.json())
        .then(data => 
            this.setState({
                posts: data
            }))
    }

    render(){
         console.log(this.state.filtered)
        // console.log(this.state.chooseZip)
        console.log()
        return(
            <Fragment>
            <Grid>
            <Grid.Row >
                <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={4}>
              <Input placeholder='Search By Zipcode...' value={this.state.value} onChange={this.handleSearchChange}/>
        
            <h3>Filter By Categories:</h3>
           
              {this.state.categories.map((category, i )=> 
              <Grid.Column disabled={this.state.disabled} key={category.id}>
                <Checkbox label={<label>{category.name}</label>} onClick={this.chosenCat} disabled={this.state.disabled}/>
                </Grid.Column> 
                )}
                
             
                </Grid.Column> 
            

            <Grid.Column width={4}>
            <h2>Farmers Markets Available:</h2>
                { this.state.filtered ? 
                   this.state.chooseCat.map(post => {
                      return   <Segment key={post.id} raised>
                            Title: Farmer Market
                            <br></br>
                            Market Date: {moment(post.startTime).format('MMM-D-YYYY hh:mm a')}
                            <br></br>
                            Category: {post.category.name}
                            
                   </Segment> })

                :
                    this.state.chooseZip.map(post => {
                   return <Segment key={post.id} raised>
                       Market Name: Farmer Market 
                       <br></br>
                       Market Date: {moment(post.startTime).format('MMM-D-YYYY hh:mm a')}
                       <br></br>
                        Category: {post.category.name}
                    </Segment>
                })}
            </Grid.Column>

            <Grid.Column width={6} align="center">
                <h1>Post</h1>
            </Grid.Column>
            </Grid.Row>
            
         
            </Grid>
            </Fragment>
        
        )
    }
}