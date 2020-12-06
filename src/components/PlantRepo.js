import React from "react";
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
  setMyRepo,
  setCurrUser,
  setCredentials,
  handleLogout,
  history,
  needsCare,
  setNeedsCare,
}) {
  const classes = useStyles();

  // HANDLE PLANT DELETE
  const handleDelete = (id, plant) => {
    console.log("from handleDelete", id);
    axios
      .delete(`http://localhost:3000/api/plants/del`, { data: { id } })
      .then((res) => {
        console.log("EL to be deleted", res.data);
        let del = res.data;
        // manually delete both from repo and care tracker arr
        setMyRepo((prevRepo) => [...prevRepo].filter((el) => el._id !== del));
        setNeedsCare((prev) =>
          [...prev].filter((el) => el !== plant.plant.latin)
        );
      })
      .catch((err) => console.log(err.message));
  };

  console.log("user repo content from repo", myRepo);

  const createRepoCard = (el) => {
    const id = el._id;
    // console.log("EL FROM REPO", el);
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
            <Typography>Next Watering: {el.water.date}</Typography>
            <Typography>Next fertilizing: {el.fertilize.date}</Typography>
            <Typography>Next repotting: {el.repot.date}</Typography>
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
            <div style={{ width: "100%", backgroundColor: "salmon" }}>
              <Box display="flex" p={1}>
                <Button onClick={() => history.push(`/${el.plant._id}`)}>
                  care overview
                </Button>
                <Grid item>
                  <Button>edit</Button>
                  <Button onClick={() => handleDelete(id, el)}>delete</Button>
                </Grid>
              </Box>
            </div>
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
          <Link to="/catalog">
            <Typography style={{ backgroundColor: "yellow " }}>
              add some plant babies
            </Typography>
          </Link>
        )}
      </Grid>
    </>
  );
}
