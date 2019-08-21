import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import MyAvatar from './myAvatar'
import FormSelect from './FormSelect'
import { Form, Grid, Segment, Divider, Button, Radio } from 'semantic-ui-react'
export default class Login extends Component {
  state = {
    role: null,
    username: '',
    password: '',
    newUsername: '',
    newPassword: '',
    loggedIn: false,
    signUp: false,
    bioName: '',
    bioDescription: '',
    avatar: {
      avatar_style: 'Transparent',
      top: 'NoHair',
      accessories: 'Blank',
      hair_color: '',
      hat_color: '',
      facial_hair: 'Blank',
      facial_hair_color: '',
      clothes: 'ShirtVNeck',
      color_fabric: 'Black',
      graphic: '',
      eyes: 'Default',
      eyebrow: 'Default',
      mouth: 'Default',
      skin: 'Brown'
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  handleChange = (event, { value, name }) => {
    let newValue = value.trim()
    this.setState({
      [name]: newValue
    })
  }

  settingBio = (event, { value, name }) => {
    this.setState({
      [name]: value
    })
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  changeAvatar = (e, { name, value }) => {
    this.setState({
      avatar: {
        ...this.state.avatar,
        [name]: value
      }
    })
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  handleSubmit = e => {
    // e.preventDefault()
    // e.persist()
    const data = this.state
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(info => {
        //console.log(info)
        if (info.authenticated === 'true') {
          this.setState({
            loggedIn: true
          })
          let userinfo = JSON.parse(info.userinfo)
          this.props.updateLoggedInUser(userinfo)
          //store token in local storage
          localStorage.setItem('token', info.token)
        } else {
          alert(info.message)
        }
      })
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  signingUp = () => {
    this.setState({
      signUp: !this.state.signUp
    })
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  handleModal = (e, value) => {
    if (value.value === 'customer') {
      this.setState({
        modal: value.value,
        role: 1
      })
    } else {
      this.setState({
        modal: value.value,
        role: 0
      })
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  createBio = data => {
    let nuData = data
    //debugger
    fetch('http://localhost:3000/biographies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        biography: {
          name: this.state.bioName,
          description: this.state.bioDescription,
          user_id: data.userinfo.id
        }
      })
    })
      .then(resp => resp.json())
      .then(data => {
        // console.log(data)
      })
    return this.createAvatar(nuData)
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  createUser = () => {
    //debugger
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: this.state.newUsername,
          password: this.state.newPassword,
          role: this.state.role
        }
      })
    })
      .then(resp => resp.json())
      .then(data => {
        let nudata = data
        if (data.authenticated === 'false') {
          alert('Username Already Created')
        } else {
          this.setState({
            username: this.state.newUsername,
            password: this.state.newPassword
          })
        }
        return this.createBio(nudata)
      })
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  createAvatar = data => {
    debugger
    let nuId = data.userinfo.id
    let theAvatar = this.state.avatar
    fetch('http://localhost:3000/avatars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        avatar: { ...theAvatar, user_id: nuId }
      })
    })
      .then(resp => resp.json())
      .then(data => {
        return this.handleSubmit()
      })
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    return this.state.loggedIn ? (
      <Redirect to="/Home" />
    ) : (
      <Fragment>
        <Grid columns={12}>
          <Grid.Row columns={5} />
          <Grid.Row columns={5}>
            <Grid.Column width={4} />
            <Grid.Column width={9} postion="right">
              <h1>Welcome to My Farmer's Market Application!</h1>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={5} />
          <Grid.Row columns={5} />
          <Grid.Row columns={5} position="center">
            <Grid.Column width={4} />
            <Grid.Column width={7}>
              <Segment placeholder position="left">
                <Grid columns={2} relaxed="very" stackable>
                  <Grid.Column>
                    {this.state.signUp ? (
                      <div>
                        <MyAvatar avatar={this.state.avatar} />
                        <Segment>
                          <FormSelect
                            avatar={this.state.avatar}
                            changeAvatar={this.changeAvatar}
                          />
                        </Segment>
                      </div>
                    ) : (
                      <Form onSubmit={this.handleSubmit}>
                        <Form.Input
                          icon="user"
                          iconPosition="left"
                          label="Username"
                          placeholder="Username"
                          name="username"
                          value={this.state.username}
                          onChange={this.handleChange}
                        />
                        <Form.Input
                          icon="lock"
                          iconPosition="left"
                          label="Password"
                          type="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.handleChange}
                        />

                        <Button content="Login" primary />
                      </Form>
                    )}
                  </Grid.Column>
                  {this.state.signUp ? (
                    <Grid.Column>
                      <Form onSubmit={this.createUser}>
                        <Form.Input
                          icon="user"
                          iconPosition="left"
                          label="Create Username"
                          placeholder="Username"
                          name="newUsername"
                          value={this.state.newUsername}
                          onChange={this.handleChange}
                        />
                        <Form.Input
                          icon="lock"
                          iconPosition="left"
                          label="Create Password"
                          type="password"
                          name="newPassword"
                          value={this.state.newPassword}
                          onChange={this.handleChange}
                        />
                        <Form.Field>
                          <h4>You are a {this.state.modal}</h4>
                        </Form.Field>
                        <Form.Field>
                          <Radio
                            label="Customer"
                            name="radioGroup"
                            value="customer"
                            checked={this.state.modal === 'customer'}
                            onClick={this.handleModal}
                          />
                        </Form.Field>
                        <Form.Field>
                          <Radio
                            label="Farmer"
                            name="radioGroup"
                            value="farmer"
                            checked={this.state.modal === 'farmer'}
                            onClick={this.handleModal}
                          />
                        </Form.Field>
                        {this.state.modal === 'farmer' ? (
                          <Form.Field>
                            <Form.Input
                              label="Company Name for Clientel"
                              placeholder="My Farm Name"
                              name="bioName"
                              value={this.state.bioName}
                              onChange={this.settingBio}
                            />
                            <Form.TextArea
                              label="Tell Your Customers About You!"
                              placeholder="My Biography"
                              name="bioDescription"
                              value={this.state.bioDescription}
                              onChange={this.settingBio}
                            />
                          </Form.Field>
                        ) : null}
                        <Form.Button onClick={this.signingUp}>
                          Nevermind
                        </Form.Button>
                        <Form.Button>Submit</Form.Button>
                      </Form>
                    </Grid.Column>
                  ) : (
                    <Grid.Column verticalAlign="middle">
                      <Button
                        content="Sign up"
                        icon="signup"
                        size="big"
                        onClick={this.signingUp}
                      />
                    </Grid.Column>
                  )}
                </Grid>
                <Divider vertical>{this.state.signUp ? '&' : 'Or'}</Divider>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/* <Button
                content="Sign up"
                icon="signup"
                size="big"
                onClick={this.signUP}
              /> */}
      </Fragment>
    )
  }
}
