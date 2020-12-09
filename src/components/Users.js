import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import bkg from "../assets/repo.jpg";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "80%",
    marginBottom: "1em",
    opacity: "90%",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
  },
  content: {
    flex: "1 0 auto",
  },
  plantPic: {
    width: 151,
  },
  image: {
    minHeight: "100vh",
    backgroundImage: `url(${bkg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  plantsitting: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default function Users({
  setCurrUser,
  currUser,
  setCredentials,
  handleLogout,
  allUsers,
  setAllUsers,
}) {
  const classes = useStyles();

  console.log("Users from users", allUsers);

  const createUserCard = (el) => {
    const id = el._id;
    // console.log("EL FROM USERS", el);
    return (
      // <Card>
      <Card className={classes.root}>
        <CardMedia
          className={classes.plantPic}
          image={`http://localhost:3000/${el.profileImg}`}
          title="Plant Preview"
        />
        {/* <div> */}
        <div className={classes.details}>
          {/* <CardContent> */}
          <CardContent className={classes.content}>
            <div className={classes.plantsitting}>
              <Typography
                component="h5"
                variant="h5"
                style={{ backgroundColor: "", display: "inline" }}
              >
                {el.username}
                {/* <Button onClick={(e) => handleClickOpen(e)}>open details modal</Button> */}
              </Typography>
              {el.plantsitting === "yes" ? (
                <Typography
                  style={{ backgroundColor: "yellow", display: "inline" }}
                >
                  plantsitting ✓
                </Typography>
              ) : null}
            </div>
            <Typography>{el.city || "N/A"}</Typography>
            <Typography>
              currently owns {el.repository.length} plant(s)!
            </Typography>

            {/* <div style={{ width: "100%", backgroundColor: "salmon" }}>
              <Box display="flex" p={1}>
                <Button onClick={() => history.push(`/${el.plant._id}`)}>
                  care overview
                </Button>
                <Grid item>
                  <Button>edit</Button>
                  <Button>delete</Button>
                </Grid>
              </Box>
            </div> */}
          </CardContent>
        </div>
      </Card>
    );
  };

  return (
    <>
      <NavBar
        setCurrUser={setCurrUser}
        setCredentials={setCredentials}
        handleLogout={handleLogout}
      />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.image}
      >
        {allUsers.length ? (
          allUsers
            .filter((el) => el.username !== currUser.username)
            .map((el) => createUserCard(el))
        ) : (
          <Link to="/">
            <Typography style={{ backgroundColor: "yellow " }}>
              no other users available
            </Typography>
          </Link>
        )}
      </Grid>
    </>
  );
}
