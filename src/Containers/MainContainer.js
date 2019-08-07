import React, {Component} from 'react'
import FarmerContainer from './FarmerContainer'
import NavBar from './Components/NavBar'
export default class MainContainer extends Component {
    state = {

    }
    componentDidMount(){
        fetch("")
    }

    render(){
        return(
            <div>
                <NavBar />
                <FarmerContainer />
            </div>
        )
    }
}