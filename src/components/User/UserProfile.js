import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import noData from "../../assets/noData.png";
import bkg from "../../assets/detailPage.png";
import axios from "axios";
import NavBar from "../NavBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Box,
  ListItem,
  Paper,
  ListItemText,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Hidden,
} from "@material-ui/core";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import UserEventSection from "./UserEventSection";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundImage: `url(${bkg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: theme.spacing(2),
  },
  heroButtons: {
    margin: theme.spacing(1),
  },
  container: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  picContainer: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    opacity: "80%",
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
  },
  eventContainer: {
    paddingTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
  careCardContainer: {
    marginTop: theme.spacing(2),
  },
  wishlistContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  card: {
    height: "250px",
    marginBottom: theme.spacing(2),
  },
  cardMedia: {
    height: "75%",
  },
  cardContent: {
    flexGrow: 1,
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
  setAllEvents,
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

  // FILL REPO PLANTS WITH ARCHETYPE DATA
  const plantDetails = (name) => {
    console.log(
      "PLANT DETAILS",
      myRepo.filter((el) => el.plant.latin === name)
    );
    return myRepo.filter((el) => el.plant.latin === name)[0];
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar
        setCurrUser={setCurrUser}
        setCredentials={setCredentials}
        handleLogout={handleLogout}
      />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            {/* Profile Picture */}
            <Paper className={classes.picContainer}>
              <Typography variant="h2">
                {currUser ? (
                  <span> hi there, {currUser.username}</span>
                ) : (
                  <span>no one is logged in</span>
                )}
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Hidden smDown>
                  <SentimentSatisfiedOutlinedIcon fontSize="large" />
                </Hidden>
                {currUser ? (
                  <div
                    style={{
                      width: "200px",
                      height: "200px",
                      marginTop: "10px",
                      marginLeft: "20px",
                      marginRight: "20px",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={`http://localhost:3000/images/user/${currUser.profileImg}`}
                      alt="profile-pic"
                    />
                  </div>
                ) : (
                  <div>Loading...</div>
                )}
                <Hidden smDown>
                  <SentimentSatisfiedOutlinedIcon fontSize="large" />
                </Hidden>
              </Box>
              <label htmlFor="file-upload" className="custom-file-upload">
                change pic
              </label>
              <TextField
                id="file-upload"
                type="file"
                name="profile_pic"
                onChange={(e) => handleChange(e)}
              />
              <Button onClick={handleUpload}>upload</Button>
            </Paper>
            {/* Button to Plant Repo */}
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Link to="/repo" style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="primary">
                      my plants
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/messenger" style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="primary">
                      messages
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* CARE CALENDAR */}
          <Grid item xs={12}>
            <Paper className={classes.container}>
              <Typography variant="h2">care calendar</Typography>
              <Typography>babies that need your attention today:</Typography>
              {!myRepo.length ? (
                <Box>
                  <img
                    src={noData}
                    style={{ width: "100px" }}
                    alt="plant pot"
                  />
                  <Typography>start by adding some plants</Typography>
                </Box>
              ) : null}
              {myRepo.length && !needsCare.length ? (
                <Box>
                  <img
                    src={noData}
                    style={{ width: "100px" }}
                    alt="plant pot"
                  />
                  <Typography>no plant care today!</Typography>
                </Box>
              ) : null}
              {needsCare.length ? (
                <Container className={classes.careCardContainer}>
                  {needsCare.length &&
                    myRepo.length &&
                    needsCare.map((el, idx) => (
                      <Card className={classes.card} key={idx}>
                        <CardMedia
                          className={classes.cardMedia}
                          image={` http://localhost:3000/images/plants/${
                            plantDetails(el).plant.srcImg
                          }`}
                          title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {plantDetails(el).nickname || el}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                </Container>
              ) : null}
              <Box>
                <Link to="/repo">
                  <Button>show me my plant repo</Button>
                </Link>
              </Box>
            </Paper>
          </Grid>

          {/* WISHLIST */}
          <Grid item xs={12}>
            <Paper className={classes.container}>
              <Box
                display="flex"
                direction="column"
                justifyContent="space-between"
              >
                <img
                  src={noData}
                  style={{ width: "30px", marginRight: "10px" }}
                  alt="plant pot"
                />
                <Typography variant="h2">wishlist</Typography>
                <img
                  src={noData}
                  style={{ width: "30px", marginLeft: "10px" }}
                  alt="plant pot"
                />
              </Box>
              <Grid item xs={12} sm={4} className={classes.wishlistContainer}>
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
                      <Button>inspiration</Button>
                    </Link>
                  </Box>
                )}
              </Grid>
            </Paper>
          </Grid>

          {/* EVENTS */}
          <Box textAlign="center">
            <Typography variant="h2">your events</Typography>
            <Typography>time to mingle with other plant parents</Typography>
            {myEvents.length ? (
              <Grid container spacing={4} className={classes.eventContainer}>
                {myEvents.map((card) => (
                  <UserEventSection
                    card={card}
                    currUser={currUser}
                    setAllEvents={setAllEvents}
                    setMyEvents={setMyEvents}
                    myEvents={myEvents}
                  />
                ))}
              </Grid>
            ) : (
              <Box
                className={classes.eventContainer}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <SentimentVeryDissatisfiedIcon fontSize="large" />
                <Link to="/events">
                  <Button>show me all events</Button>
                </Link>
              </Box>
            )}
          </Box>
        </Container>
      </main>
    </React.Fragment>
  );
}
