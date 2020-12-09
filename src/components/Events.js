import React, { useState } from "react";
import NavBar from "./NavBar";
import event1 from "../assets/eventImages/event-1.jpg";
import event2 from "../assets/eventImages/event-2.jpg";
import event3 from "../assets/eventImages/event-3.jpg";
import event4 from "../assets/eventImages/event-4.jpg";
import event5 from "../assets/eventImages/event-5.jpg";
import event6 from "../assets/eventImages/event-6.jpg";
import event7 from "../assets/eventImages/event-7.jpg";
import {
  CardContent,
  CardActionArea,
  CardActions,
  Grid,
  Card,
  CardMedia,
  CircularProgress,
  Typography,
  Box,
  Button,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import SearchEvents from "./SearchEvents";
import ModalAddEvent from "./ModalAddEvent";
import axios from "axios";

const useStyles = makeStyles({
  catalogContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
  },
  root: {
    maxWidth: 600,
    height: 500,
  },
  media: {
    height: 240,
  },
});

export default function Events({
  allEvents,
  setAllEvents,
  myEvents,
  setMyEvents,
  history,
  setCurrUser,
  setCredentials,
  handleLogout,
}) {
  const classes = useStyles();

  // PAGINATION STATE
  const [page, setPage] = useState(1);
  // SEARCH STATE (only enable pagination if !isSearch, otherwise hide)
  const [eventSearch, setEventSearch] = useState("");
  const [isEventSearch, setIsEventSearch] = useState(false);
  // MODAL FORM STATES
  const [openAddEvent, setOpenAddEvent] = useState(false);

  // HANDLE PAGINATION
  const handleChangePage = (_, page) => {
    setPage(page);
  };

  const idxLastPlant = page * 15;
  const idxFirstPlant = idxLastPlant - 15;

  // HANDLE MODAL ADD EVENT
  const handleClickOpen = (e) => {
    setOpenAddEvent(true);
  };

  // ATTEND AN EVENT
  const handleAttend = (el) => {
    const eventId = el._id;
    // fix this so you can't attend if you're already attending
    axios
      .post("http://localhost:3000/api/events/attend", { eventId })
      .then((res) => {
        console.log(res.data);
        setMyEvents((prevEvents) => [...prevEvents, res.data]);
      })
      .catch((err) => console.log(err.message));
  };

  // CREATE EVENT THUMBNAILS
  const eventPics = [event1, event2, event3, event4, event5, event6, event7];

  // CREATE EACH PLANT PREVIEW CARD
  const createEventCard = (el) => {
    return (
      <Grid item xs={12} sm={4} key={el._id}>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={`${eventPics[el.img]}`}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography variant="h6" style={{ fontWeight: 700 }}>
              {el.title}
            </Typography>
            <Typography
              style={{ backgroundColor: "yellow", display: "inline" }}
            >
              <b>Host</b>: {el.host}
            </Typography>
            <Typography color="primary">
              {/* <Typography variant="body2" color="primary" component="p"> */}
              <b>Date</b>: {el.date}
            </Typography>
            {/* <Typography variant="body2" color="primary" component="p"> */}
            <Typography color="primary">
              <b>Address</b>: {el.address.street} {el.address.number},{" "}
              {el.address.zip} {el.address.city}
            </Typography>
            <Typography>{el.description}</Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => handleAttend(el)}
            >
              Attend
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <NavBar
        setCurrUser={setCurrUser}
        setCredentials={setCredentials}
        handleLogout={handleLogout}
      />
      {allEvents ? (
        <Grid container spacing={2} className={classes.catalogContainer}>
          <Grid item xs={12}>
            <Button
              style={{ backgroundColor: "pink" }}
              onClick={(e) => handleClickOpen(e)}
            >
              add your own
            </Button>
          </Grid>
          <SearchEvents
            setEventSearch={setEventSearch}
            setIsEventSearch={setIsEventSearch}
          />
          {isEventSearch
            ? allEvents
                .sort((a, b) => a.date - b.date)
                .map(
                  (el) =>
                    el.description.includes(eventSearch) && createEventCard(el)
                )
            : allEvents
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                // .slice(idxFirstPlant, idxLastPlant)
                .map((el) => createEventCard(el))}
          {/* <Grid container direction="row" justify="center" alignItems="center">
            {!isSearch && (
              <Pagination
                shape="rounded"
                count={Math.ceil(allEvents.length / 15)}
                page={page}
                onChange={handleChangePage}
              />
            )}
          </Grid> */}
        </Grid>
      ) : (
        <CircularProgress />
      )}
      <ModalAddEvent
        openAddEvent={openAddEvent}
        setOpenAddEvent={setOpenAddEvent}
        setMyEvents={setMyEvents}
        setAllEvents={setAllEvents}
        myEvents={myEvents}
      />
    </>
  );
}
