import React from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
const Navbar = (props) => {

    
    return( 
     <div>
        { props.names ? 
        <Menu pointing secondary>
        {props.names.map((info, i)=> {
            return <Menu.Item
            as={Link}
            to={`/${info}`}
            key={i}
          name={info}
          active={props.active === info}
          onClick={(event) => props.clickHandler(event)}
        />})} 
        <Menu.Menu position='right'>
          <Menu.Item
            name={props.username}
            
          />
        </Menu.Menu>
        </Menu>
        :
        null
        }

        {/* <Menu.Menu position='right'>
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={props.clickHandler}
          />
        </Menu.Menu> */}
     

      
       </div>
    )
}

export default Navbar