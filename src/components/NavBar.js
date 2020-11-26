import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

const useStyles = makeStyles({
  navBar: {
    backgroundColor: "pink",
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
  { title: `find users`, path: `/find-users` },
  { title: `plantindex`, path: `/plantindex` },
  { title: `logout`, path: `/logout` },
  { title: `me`, path: `/me` },
];

export default function NavBar() {
  const classes = useStyles();
  return (
    <>
      <AppBar position="static" className={classes.navBar}>
        <Toolbar>
          <Container className={classes.navContainer}>
            <Typography>HOME</Typography>
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
            </List>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}
