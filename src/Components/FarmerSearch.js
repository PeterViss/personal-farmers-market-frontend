import React, { Component } from 'react'
import { Input, Segment, Grid, Button, Card, Divider } from 'semantic-ui-react'

export default class FarmerSearch extends Component {
  state = {
    value: '',
    farmers: [],
    filtered: []
  }

  handleSearchChange = (e, { value }) => {
    if (value === '') {
      this.setState({ value: value, filtered: [] })
    } else {
      let filtered = this.state.farmers.filter(farmer => {
        if (farmer.biography.name.toLowerCase().includes(value.toLowerCase())) {
          return farmer
        } else {
          return null
        }
      })
      this.setState({
        value: value,
        filtered: filtered
      })
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/user/farmers')
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          farmers: data
        })
      )
  }

  render() {
    debugger
    return (
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column width={4} />
          <Grid.Column width={7}>
            <Segment textAlign="center">
              <h1 floated="center">Search For Farmers</h1>

              <Input
                icon="search"
                placeholder="Search Farmers..."
                value={this.state.value}
                onChange={this.handleSearchChange}
              />

              <div className="center">
                {this.state.filtered.length === 0
                  ? this.state.farmers.map(farmer => {
                      return (
                        <Segment key={farmer.id} align="center" basic>
                          <Card>
                            <Card.Content
                              header={<h3>{farmer.biography.name}</h3>}
                            />

                            <Card.Description>
                              <Card>
                                <ul>
                                  {Array.from(
                                    new Set(
                                      farmer.categories.map(
                                        category => category.name
                                      )
                                    )
                                  ).map((category, i) => (
                                    <Card.Description key={i} align="left">
                                      <li>{category}</li>
                                    </Card.Description>
                                  ))}
                                </ul>
                              </Card>
                            </Card.Description>
                            <Button
                              color="vk"
                              onClick={() => this.props.chooseFarmer(farmer)}
                            >
                              View
                            </Button>
                          </Card>
                        </Segment>
                      )
                    })
                  : this.state.filtered.map(farmer => {
                      return (
                        <Segment key={farmer.id} align="center" basic>
                          <Card>
                            <Card.Content
                              header={<h3>{farmer.biography.name}</h3>}
                            />
                            <Divider />
                            {/* <h5>Categories</h5> */}
                            <Card.Description textAlign="left">
                              <ul>
                                {Array.from(
                                  new Set(
                                    farmer.categories.map(
                                      category => category.name
                                    )
                                  )
                                ).map((category, i) => (
                                  <li key={i}>{category}</li>
                                ))}
                              </ul>
                            </Card.Description>
                            <Card.Description />
                            <Button
                              color="vk"
                              onClick={() => this.props.chooseFarmer(farmer)}
                            >
                              View
                            </Button>
                          </Card>
                        </Segment>
                      )
                    })}
              </div>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
