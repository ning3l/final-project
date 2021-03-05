import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "../NavBar";
import ReactMapGL, { Marker } from "react-map-gl";
import "../../App.css";
import bkg from "../../assets/detailPage.png";
import {
  Avatar,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  Container,
  Box,
} from "@material-ui/core";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAlt";
import LocalFloristIcon from "@material-ui/icons/LocalFlorist";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paperContainer: {
    width: "80%",
    padding: "2em",
    margin: "auto",
    textAlign: "center",
  },
  image: {
    backgroundImage: `url(${bkg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  avatars: {
    padding: "5px",
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function EventDetail({ match, handleLogout, allEvents }) {
  const classes = useStyles();

  // STATES FOR SINGLE EVENT
  const [singleEvent, setSingleEvent] = useState(null);
  const [isError, setIsError] = useState(false);

  // INITIAL STATE FOR EVENT MAP > BERLIN
  const [viewport, setViewport] = useState({
    latitude: 52.52,
    longitude: 13.4049,
    zoom: 12,
    width: "100%",
    height: "30vh",
  });

  const [longLat, setLongLat] = useState({
    long: 0,
    lat: 0,
  });

  // FORWARD GEOCODING TO GET COORDINATES FOR EVENT LOCATION
  const geoCoder = (address) => {
    const { street, number } = address;
    axios
      // .get(
      //   `  https://api.mapbox.com/geocoding/v5/mapbox.places/${street}%20${number}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}&cachebuster=1609931617105&autocomplete=true`
      // )
      .get(
        `${process.env.REACT_APP_MAPBOX}${street}%20${number}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}&cachebuster=1609931617105&autocomplete=true`
      )
      .then((data) => {
        setViewport((prev) => ({
          ...prev,
          latitude: data.data.features[0].center[1],
          longitude: data.data.features[0].center[0],
        }));
        setLongLat((prev) => ({
          ...prev,
          lat: data.data.features[0].center[1],
          long: data.data.features[0].center[0],
        }));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!allEvents.find((el) => el._id === match.params.eventId)) {
      setIsError(true);
      return;
    }
    axios
      .get(`/api/events/event/${match.params.eventId}`)
      .then((data) => {
        setSingleEvent(data.data);
        geoCoder(data.data.address);
      })
      .catch((err) => setIsError(true));
  }, [match.params.eventId, allEvents]);

  const createEventDetail = (singleEvent) => {
    let { title, date, time, description, address, host } = singleEvent;
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h1" color="primary">
              {title}
            </Typography>
            <Typography
              variant="h2"
              style={{ backgroundColor: "yellow" }}
              display="inline"
            >
              {address.city}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography gutterBottom variant="h5" component="h2">
              Event Infos
            </Typography>
            <Box>
              <Typography style={{ fontWeight: "bold" }}>
                Date & Time
              </Typography>
              <Typography>{moment(date).format("MMM Do YYYY")}</Typography>
              <Typography>{time}</Typography>
            </Box>
            <RemoveIcon />
            <Box>
              <Typography style={{ fontWeight: "bold" }}>Address</Typography>
              <Typography>
                {address.street} {address.number}
              </Typography>
              <Typography>
                {address.zip} {address.city}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              {singleEvent && (
                <ReactMapGL
                  {...viewport}
                  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                  onViewportChange={(viewport) => {
                    setViewport(viewport);
                  }}
                >
                  <Marker
                    latitude={longLat.lat}
                    longitude={longLat.long}
                    offsetLeft={-20}
                    offsetTop={-10}
                  >
                    <LocalFloristIcon />
                  </Marker>
                </ReactMapGL>
              )}
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ paddingRight: "6em", paddingLeft: "6em" }}
          >
            <Typography gutterBottom variant="h5" component="h2">
              Details
            </Typography>
            <Typography style={{ fontWeight: "bold" }}>Host: {host}</Typography>
            <Typography>{description}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h5" component="h2">
              Attendees
            </Typography>
            {singleEvent.attendees &&
              singleEvent.attendees.map((user) => (
                <Grid item className={classes.avatars} key={user._id}>
                  <Link to={`/user/${user._id}`}>
                    <Avatar
                      alt="✿"
                      src={`${process.env.REACT_APP_BACKEND_API_HEROKU}/images/user/${user.profileImg}`}
                    />
                  </Link>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </div>
    );
  };

  return (
    <>
      <NavBar handleLogout={handleLogout} />
      <Grid
        className={classes.image}
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Container display="flex" align="center">
          <SentimentSatisfiedAltIcon fontSize="large" />
          <Paper elevation={3} className={classes.paperContainer}>
            {!singleEvent && !isError && <CircularProgress />}
            {singleEvent && createEventDetail(singleEvent)}
            {isError && !singleEvent && (
              <h1>sorry, this event does not exist</h1>
            )}
          </Paper>
          <SentimentSatisfiedAltIcon fontSize="large" />
        </Container>
      </Grid>
    </>
  );
}
