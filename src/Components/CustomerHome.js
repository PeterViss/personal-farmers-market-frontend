import React, {Component} from 'react'
import { Card } from 'semantic-ui-react'
import { Container, Header } from 'semantic-ui-react'
export default class CustomerHome extends Component{
    render(){
      
        return (
            <Container text>
              <Card
                header='Who You Are Following'
                meta='Friend'
                description=
                 { this.props.customer.followees === undefined ? null
                  : 
                  <ul>
                    {this.props.customer.followees.map(followee =>    <li>
                            {followee.username} 
                            <button>View</button>
                      </li>)}
                  </ul>}
                
              />
             </Container>
        )
    }
}