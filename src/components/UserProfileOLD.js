import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import UserProfileCard from "./UserProfileCard";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  ListItem,
  ListItemText,
  List,
} from "@material-ui/core";
import noData from "../assets/noData.png";
import bkg from "../assets/repo.jpg";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
const axios = require("axios");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    backgroundColor: "pink",
  },
  paper: {
    padding: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    opacity: "90%",
  },
  image: {
    marginTop: "0.5px",
    backgroundImage: `url(${bkg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));

export default function UserProfile({
  currUser,
  setCurrUser,
  setCredentials,
  handleLogout,
  myRepo,
  myWishlist,
  setMyWishlist,
  myEvents,
  setMyEvents,
  needsCare,
  setNeedsCare,
}) {
  const classes = useStyles();

  // PROFILE PIC STATES
  const [selectedPic, setSelectedPic] = useState(null);
  const [pathToImg, setPathToImg] = useState(null);

  // HANDLE PROFILE PIC UPLOAD
  const handleChange = (e) => {
    console.log(e.target.files[0]);
    setSelectedPic(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("profile_pic", selectedPic);
    axios
      .post("http://localhost:3000/api/users/upload-profile-pic", data, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        // SET STATE IN PROFILE
        setPathToImg(res.data.pathToImage);
        // UPDATE CURR USER PIC IN APP
        setCurrUser((prev) => ({
          ...prev,
          profileImg: res.data.pathToImage,
        }));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // DELETE A PLANT FROM CURR USER WISHLIST
  const handleDelete = (name) => {
    console.log("to be deleted from list:", name);
    axios
      .delete(`http://localhost:3000/api/users/wish`, { data: { name } })
      .then((res) => {
        setMyWishlist((prevWish) => [...prevWish].filter((el) => el !== name));
      })
      .catch((err) => console.log(err.message));
  };

  const plantDetails = (name) => {
    return myRepo.filter((el) => el.plant.latin === name)[0].nickname;
  };

  return (
    <>
      <NavBar
        setCurrUser={setCurrUser}
        setCredentials={setCredentials}
        handleLogout={handleLogout}
      />
      <Grid
        className={classes.image}
        container
        spacing={3}
        display="flex"
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12} style={{ width: "800px " }}>
          <Paper className={classes.paper}>
            <Typography variant="h2">
              {currUser ? (
                <span> hi there, {currUser.username}</span>
              ) : (
                <span>no one is logged in</span>
              )}
            </Typography>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SentimentSatisfiedOutlinedIcon fontSize="large" />
              {currUser ? (
                <div
                  style={{
                    width: "300px",
                    height: "300px",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={`http://localhost:3000/${currUser.profileImg}`}
                    alt="profile-pic"
                  />
                </div>
              ) : (
                <div>Loading...</div>
              )}
              <SentimentSatisfiedOutlinedIcon fontSize="large" />
            </Box>
            <TextField
              type="file"
              name="profile_pic"
              onChange={(e) => handleChange(e)}
            />
            <Button onClick={handleUpload}>upload</Button>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            <Box
              display="flex"
              direction="column"
              justifyContent="space-between"
              style={{ width: "200px" }}
            >
              <img src={noData} style={{ width: "30px" }} />
              <Typography variant="h2">wishlist</Typography>
              <img src={noData} style={{ width: "30px" }} />
            </Box>
            <Grid container display="flex" justify="center">
              {myWishlist.length ? (
                myWishlist.map((el) => (
                  <ListItem>
                    <ListItemText>{el}</ListItemText>
                    <Button onClick={() => handleDelete(el)}>x</Button>
                  </ListItem>
                ))
              ) : (
                <Box>
                  <Typography>start by adding some plants</Typography>
                  <Link to="/catalog">
                    <Button>browse our catalog for inspiration</Button>
                  </Link>
                </Box>
              )}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} style={{ width: "600px" }}>
          <Paper className={classes.paper}>
            <Typography variant="h2">care calendar</Typography>
            <Typography>babies that need your attention today:</Typography>
            {!myRepo.length ? (
              <Box>
                <img src={noData} style={{ width: "100px" }} />
                <Typography>start by adding some plants</Typography>
              </Box>
            ) : null}
            {myRepo.length && !needsCare.length ? (
              <Box>
                <img src={noData} style={{ width: "100px" }} />
                <Typography>no plant care today!</Typography>
              </Box>
            ) : null}
            {needsCare.length ? (
              <List>
                {needsCare.length &&
                  myRepo.length &&
                  needsCare.map((el) => (
                    <ListItemText style={{ color: "#0000EE" }}>
                      <img src={noData} style={{ width: "20px" }} />{" "}
                      {plantDetails(el) || el}{" "}
                      <img src={noData} style={{ width: "20px" }} />
                    </ListItemText>
                  ))}
              </List>
            ) : null}
            <Box>
              <Link to="/repo">
                <Button>show me my plant repo</Button>
              </Link>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} style={{ maxWidth: "80%" }}>
          <Paper className={classes.paper}>
            <Typography variant="h2">your events</Typography>
            <Typography>time to mingle with other plant parents</Typography>
            <Grid container display="flex" justify="center">
              {myEvents ? (
                myEvents.map((el) => (
                  <UserProfileCard
                    el={el}
                    setMyEvents={setMyEvents}
                    myEvents={myEvents}
                    currUser={currUser}
                  />
                ))
              ) : (
                <Box display="flex" flexDirection="column" alignItems="center">
                  <SentimentVeryDissatisfiedIcon fontSize="large" />
                  <Link to="/events">
                    <Button>show me all events</Button>
                  </Link>
                </Box>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
