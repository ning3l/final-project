import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import bkg from "../assets/repo.jpg";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";

const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "80%",
    marginBottom: "1em",
  },
  details: {
    display: "flex",
    flexDirection: "column",
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
});

export default function PlantRepo({
  myRepo,
  setCurrUser,
  setCredentials,
  handleLogout,
}) {
  const classes = useStyles();

  // HANDLE PLANT DELETE
  const handleDelete = (id) => {
    console.log("from handleDelete", id); // why is this triggered on a page load, without me even pressing the button?
    axios
      .delete(`http://localhost:3000/api/plants/del`, { data: { id } })
      .then((res) => console.log(res.data)) // what do you actually wanna do after deletion?
      .catch((err) => console.log(err.message));
  };

  console.log("user repo content from repo", myRepo);

  const createRepoCard = (el) => {
    const id = el._id;
    return (
      // <Card>
      <Card className={classes.root}>
        <CardMedia
          className={classes.plantPic}
          image={el.plant.srcImg}
          title="Plant Preview"
        />
        <div>
          {/* <div className={classes.details}> */}
          <CardContent>
            {/* <CardContent className={classes.content}> */}
            <Typography component="h5" variant="h5">
              {el.nickname || el.plant.latin}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {el.plant.common}
            </Typography>
            <Typography>Next Watering: ...</Typography>
            <Typography>Next fertilizing: </Typography>
            <Typography>Next repotting: ...</Typography>
            <Typography>
              Happiness:{" "}
              {el.happiness === "good" ? (
                <SentimentSatisfiedOutlinedIcon />
              ) : el.happiness === "bad" ? (
                <SentimentVeryDissatisfiedIcon />
              ) : (
                <SentimentSatisfiedIcon />
              )}
            </Typography>
            <Button>care overview</Button>
            <Button>edit</Button>
            <Button onClick={() => handleDelete(id)}>delete</Button>
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
        {myRepo.length ? (
          myRepo.map((el) => createRepoCard(el))
        ) : (
          <Typography style={{ backgroundColor: "yellow " }}>
            add some damn plants
          </Typography>
        )}
      </Grid>
    </>
  );
}
