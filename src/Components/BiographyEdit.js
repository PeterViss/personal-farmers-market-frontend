import React, {Component} from 'react'
import { Form } from 'semantic-ui-react'
export default class Biography extends Component{
    render(){
      
        return(
            <div>
                <h3>This Is What Is Shown To Your Customers</h3>
                <Form id={this.props.bio.id} onSubmit={this.props.sendBio}>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Name' name="name" placeholder='Name you would like your customers to see' value={this.props.bio.name} onChange={(event) => this.props.bioHandler(event)}/>
          <Form.TextArea label='About' name="description" placeholder='What your customer will see about you' value={this.props.bio.description} onChange={this.props.bioHandler}/>
        <Form.Button>Submit</Form.Button>
        </Form.Group>
        </Form>
            </div>
        )
    }
}