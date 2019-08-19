import React, { Component } from 'react'
import { Form, Segment } from 'semantic-ui-react'
export default class Biography extends Component {
  sendBio = event => {
    let bio = this.props.bio
    debugger
    let num = bio.id
    fetch(`http://localhost:3000/biographies/${num}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        biography: bio
      })
    })
      .then(resp => resp.json())
      .then(data => console.log(data))
    return this.props.falseBio()
  }
  render() {
    return (
      <div>
        <h3>This Is What Is Shown To Your Customers</h3>

        <Form id={this.props.bio.id} onSubmit={this.sendBio}>
          <Form.Group>
            <Form.Input
              fluid
              label="Co. Name"
              name="name"
              placeholder="Name you would like your customers to see"
              value={this.props.bio.name}
              onChange={event => this.props.bioHandler(event)}
            />

            <Form.TextArea
              fluid
              label="About"
              name="description"
              placeholder="What your customer will see about you"
              value={this.props.bio.description}
              onChange={this.props.bioHandler}
            />

            <Form.Button onClick={this.sendBio}>Submit</Form.Button>
            <Form.Button onClick={this.props.falseBio}>Nevermind</Form.Button>
          </Form.Group>
        </Form>
      </div>
    )
  }
}
