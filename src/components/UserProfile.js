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
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import noData from "../assets/noData.png";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
const axios = require("axios");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "pink",
    height: "100vh",
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
    // color: theme.palette.text.secondary,
  },
  // profilePic: {
  //   padding: theme.spacing(2),
  //   marginRight: theme.spacing(2),
  //   marginLeft: theme.spacing(2),
  //   textAlign: "center",
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  // },
  wish: {
    padding: theme.spacing(4),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
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

  // HANDLE PROFILE PIC
  const [selectedPic, setSelectedPic] = useState(null);
  const [pathToImg, setPathToImg] = useState(null);

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

  const handleChange = (e) => {
    console.log(e.target.files[0]);
    setSelectedPic(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    console.log(selectedPic);
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
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // {myRepo.map((el) => (
  //   <>
  //     {new Date(Date.now()).toLocaleDateString("en-US") ===
  //       new Date(el.water.date).toLocaleDateString("en-US") && (
  //       <>
  //         <Typography color="primary">
  //           {el.nickname || el.plant.latin}
  //         </Typography>
  //         {/* <span>{el.water.date}</span> */}
  //       </>
  //     )}
  //   </>
  // ))}

  return (
    <div className={classes.root}>
      <NavBar
        setCurrUser={setCurrUser}
        setCredentials={setCredentials}
        handleLogout={handleLogout}
      />
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item md={6} xs={12}>
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
              <img
                src="https://www.nationalgeographic.com/content/dam/news/2018/05/17/you-can-train-your-cat/02-cat-training-NationalGeographic_1484324.jpg"
                alt=""
                style={{ width: "80%" }}
              />
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
        <Grid item md={6} xs={12}>
          <Paper className={classes.wish}>
            {/* <Box> */}
            <Typography color="primary">plants i need in my life</Typography>
            <div>
              <ul styl={{ display: "inline-block", textAlign: "left" }}>
                {myWishlist &&
                  myWishlist.map((el) => (
                    <li>
                      {el}
                      <Button onClick={() => handleDelete(el)}>x</Button>
                    </li>
                  ))}
              </ul>
            </div>
            <Typography color="primary">contact me for plantsitting</Typography>
            {/* </Box> */}
          </Paper>
        </Grid>

        <Grid item xs={12}>
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
              <ul>
                {needsCare.map((el) => (
                  <li>{el}</li>
                ))}
              </ul>
            ) : null}

            <Box>
              <Link to="/repo">
                <Button>show me my plant repo</Button>
              </Link>
            </Box>
          </Paper>
        </Grid>

        {/* <Grid item xs={3}>
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
        </Grid> */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h2">your events</Typography>
            <Typography>time to mingle with other plant parents</Typography>
            <Grid container display="flex" justify="center">
              {myEvents.length ? (
                myEvents.map((el) => <UserProfileCard el={el} />)
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
    </div>
  );
}
