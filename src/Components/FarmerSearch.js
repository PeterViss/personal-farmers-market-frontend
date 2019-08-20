import React, { Component } from 'react'
import { Input, Segment } from 'semantic-ui-react'

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
    return (
      <div>
        <div className="center">
          <Input
            placeholder="Search Farmers..."
            value={this.state.value}
            onChange={this.handleSearchChange}
          />
        </div>
        <div className="center">
          {this.state.filtered.length === 0
            ? null
            : this.state.filtered.map(farmer => {
                return (
                  <Segment key={farmer.id} raised>
                    Title: {farmer.biography.name}
                    <br />
                    {/* <Link to={'/FarmerProfile'}>  */}
                    <button onClick={() => this.props.chooseFarmer(farmer)}>
                      View
                    </button>
                    {/* </Link> */}
                    <br />
                    Categories:
                    <ul>
                      {Array.from(
                        new Set(
                          farmer.categories.map(category => category.name)
                        )
                      ).map((category, i) => (
                        <li key={i}>{category}</li>
                      ))}
                    </ul>
                  </Segment>
                )
              })}
        </div>
      </div>
    )
  }
}
