import React, { Component } from 'react';

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';

const styles = {
  logo: {
    height: '50px',
    pointerEvents: 'none'
  },
  button: {
    background: 'blue',
    borderRadius: '6px',
    border: 0,
    color: 'blue',
    height: 48,
    fontWeight: 'bold',
  },
  list: {
    width: 250,
  },
};

export default class CustomHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false,
      logged: false,
    };

  };

  componentDidMount() {
    

  }

  toggleDrawer = (open) => {
    this.setState({
      isDrawerOpen: open
    });
  };

  render() {

    let isDrawerOpen = this.state.isDrawerOpen;

    let homeButton = (
      <NavLink to="/" style={{ textDecoration: 'none' }}>
        <Button style={styles.button}>Home</Button>
      </NavLink>
    );

    let loginButton = this.state.logged ? (
      <NavLink to="/logout" style={{ textDecoration: 'none' }}>
        <Button style={styles.button}>Logout</Button>
      </NavLink>
    ) : null;

    let drawerHomeButton = (
      <NavLink to="/" style={{ textDecoration: 'none', color: 'blue' }} >
        <ListItem button key="Home" >
          <ListItemText primary="Home" />
        </ListItem>
      </NavLink>
    );

    let drawerLoginButton = this.state.logged ? (
      <NavLink to="/logout" style={{ textDecoration: 'none', color: 'blue' }}>
        <ListItem button key="Logout">
          <ListItemText primary="Logout" />
        </ListItem>
      </NavLink>
    ) : null;

    let sideList =
      <div
        style={styles.list}
        role="presentation"
        onClick={() => { this.toggleDrawer(false) }}
        onKeyDown={() => { this.toggleDrawer(false) }}
      >
        <List>
          {drawerHomeButton}
          {drawerLoginButton}
        </List>
      </div>;

    /**
     * <AppBar> is a component of material-ui library.
     * The top App Bar provides content and actions related to the current screen. It’s used for branding, screen titles, navigation, and actions.
     */
    return (
      <div>
          <div style={{ flexGrow: 1, }}>
            <AppBar style={{ backgroundColor: 'black'}} position="static" >
              <Toolbar>
                <div style={{ flexGrow: 1, }}></div>
                
              </Toolbar>
            </AppBar>
          </div>
      </div>
    );
  }

}