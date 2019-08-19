import React, { Fragment } from 'react'
import { Menu, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
const Navbar = props => {
  return (
    <div>
      <Grid.Row width={16}>
        {props.names ? (
          <Fragment>
            <Menu pointing secondary width={16}>
              <Menu.Item
                position="right"
                name="logout"
                active={props.active === 'logout'}
                onClick={props.logout}
              />
              {props.names.map((info, i) => {
                return (
                  <Menu.Item
                    position="right"
                    as={Link}
                    to={`/${info}`}
                    key={i}
                    name={info}
                    active={props.active === info}
                    onClick={event => props.clickHandler(event)}
                  />
                )
              })}

              <Menu.Menu>
                <Menu.Item position="left" name={props.username} />
              </Menu.Menu>
            </Menu>
          </Fragment>
        ) : null}
      </Grid.Row>
    </div>
  )
}

export default Navbar
