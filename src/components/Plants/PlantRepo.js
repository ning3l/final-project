import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../NavBar";
import ModalUpdatePlant from "./ModalUpdatePlant";
import axios from "axios";
import bkg from "../../assets/myRepo.jpg";
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
    marginTop: "1rem",
    marginBottom: "1em",
    opacity: "90%",
  },
  plantPic: {
    width: 200,
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
  currUser,
  setCurrUser,
  setCredentials,
  handleLogout,
  history,
  setNeedsCare,
  setAllUsers,
}) {
  const classes = useStyles();

  // HANDLE MODAL FORM REPO
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null); // state is updated in formUpdate

  const handleClickOpen = (plant) => {
    setOpenEdit(true);
    setSelectedPlant(plant);
  };

  // HANDLE PLANT DELETE
  const handleDelete = (id, plant) => {
    axios
      .delete(`/api/plants/del`, { data: { id } })
      .then((res) => {
        let del = res.data;
        // manually delete both from repo and care tracker arr
        setMyRepo((prevRepo) => [...prevRepo].filter((el) => el._id !== del));
        setNeedsCare((prev) =>
          [...prev].filter((el) => el !== plant.plant.latin)
        );
        // also delete from all users
        setAllUsers((prev) => {
          let userToUpdate = [...prev].find((el) => el._id === currUser._id);
          let idx = userToUpdate.repository.indexOf(id);
          userToUpdate.repository.splice(idx, 1);
          return [
            ...prev.filter((el) => el._id !== currUser._id),
            userToUpdate,
          ];
        });
      })
      .catch((err) => console.log(err.message));
  };

  const createRepoCard = (el) => {
    const id = el._id;
    return (
      <Card className={classes.root} key={el._id}>
        <CardMedia
          className={classes.plantPic}
          image={`${process.env.REACT_APP_BACKEND_API_HEROKU}/images/plants/${el.plant.srcImg}`}
          title="Plant Preview"
        />
        <div>
          <CardContent>
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
            <div>
              <Box display="flex" p={1}>
                <Button onClick={() => history.push(`/plant/${el.plant._id}`)}>
                  care overview
                </Button>
                <Grid item>
                  <Button onClick={() => handleClickOpen(el)}>edit</Button>
                  <Button onClick={() => handleDelete(id, el)}>R.I.P.</Button>
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
      <ModalUpdatePlant
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        selectedPlant={selectedPlant}
        setSelectedPlant={setSelectedPlant}
        setMyRepo={setMyRepo}
        myRepo={myRepo}
        setNeedsCare={setNeedsCare}
      />
    </>
  );
}
