import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../assets/logo.png";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Button,
  Hidden,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles({
  navBar: {
    backgroundColor: "white",
    border: "1px solid black",
  },
  navContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navLinkContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const navLinks = [
  { title: `events`, path: `/events` },
  { title: `users`, path: `/users` },
  { title: `plants`, path: `/catalog` },
];

export default function NavBar({ setCurrUser, setCredentials, handleLogout }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <>
      <AppBar position="static" className={classes.navBar}>
        <Toolbar>
          <Container className={classes.navContainer}>
            <Typography>
              <Link to="/">
                <img src={logo} alt="logo" style={{ width: "150px" }} />
              </Link>
            </Typography>
            <Hidden xsDown>
              <List
                component="nav"
                aria-labelledby="main navigation"
                className={classes.navLinkContainer}
              >
                {navLinks.map(({ title, path }) => (
                  <Link to={path} key={title}>
                    <ListItem button>
                      <ListItemText primary={title} />
                    </ListItem>
                  </Link>
                ))}
                <Link to="/login">
                  <ListItem onClick={() => handleLogout()}>
                    <ListItemText primary="bye" />
                  </ListItem>
                </Link>
              </List>
            </Hidden>
            <Hidden smUp>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <AddIcon />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link to="/events">events</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/users">users</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/catalog">plants</Link>
                </MenuItem>
                <MenuItem onClick={() => handleLogout()}>
                  <Link to="/login">bye</Link>
                </MenuItem>
              </Menu>
            </Hidden>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}
