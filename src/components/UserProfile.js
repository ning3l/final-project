import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { userContext } from "../utils/auth";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Button, Box } from "@material-ui/core";
const axios = require("axios");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function UserProfile({
  currUser,
  setCurrUser,
  setCredentials,
  handleLogout,
  myRepo,
}) {
  const classes = useStyles();

  const [myWishlist, setMyWishlist] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users/wish")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className={classes.root}>
      <NavBar
        setCurrUser={setCurrUser}
        setCredentials={setCredentials}
        handleLogout={handleLogout}
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography>Here goes the name</Typography>
            <Box>
              <img
                src="https://www.nationalgeographic.com/content/dam/news/2018/05/17/you-can-train-your-cat/02-cat-training-NationalGeographic_1484324.jpg"
                alt=""
                style={{ width: "30%" }}
              />
            </Box>
            <Link to="/repo">
              <Button>GO TO REPO</Button>
            </Link>
            <Typography>
              {currUser ? (
                <span>{currUser.username}</span>
              ) : (
                <span>no one is logged in</span>
              )}
            </Typography>
            <Button>change</Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Button to My Repo</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>see 3 next care dates</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {myRepo.map((el) => (
              <span>{el.nickname}</span>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>here goes the messages</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
