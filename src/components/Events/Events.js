import React, { useState } from "react";
import NavBar from "../NavBar";
import event1 from "../../assets/eventImages/event-1.jpg";
import event2 from "../../assets/eventImages/event-2.jpg";
import event3 from "../../assets/eventImages/event-3.jpg";
import event4 from "../../assets/eventImages/event-4.jpg";
import event5 from "../../assets/eventImages/event-5.jpg";
import event6 from "../../assets/eventImages/event-6.jpg";
import event7 from "../../assets/eventImages/event-7.jpg";
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
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchEvents from "./SearchEvents";
import ModalAddEvent from "./ModalAddEvent";
import ModalUpdateEvent from "./ModalUpdateEvent";
import axios from "axios";
import moment from "moment";

const useStyles = makeStyles({
  catalogContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  card: {
    transition: "all 0.4s ease",
    "&:hover": {
      transform: "translateY(-7px)",
      boxShadow: "2px 3px 15px 2px rgba(0,0,0,0.1)",
      zIndex: 100,
    },
  },
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
  },
  cardDescription: {
    overflow: "hidden",
  },
  root: {
    maxWidth: 600,
    height: 550,
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
  currUser,
  setCurrUser,
  setCredentials,
  handleLogout,
  history,
}) {
  const classes = useStyles();

  // SEARCH STATE (only enable pagination if !isSearch, otherwise hide)
  const [eventSearch, setEventSearch] = useState("");
  const [isEventSearch, setIsEventSearch] = useState(false);
  // MODAL FORM STATES
  const [openAddEvent, setOpenAddEvent] = useState(false);

  // HANDLE MODAL FORM EVENT EDIT
  const [openEditEvent, setOpenEditEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // state is updated in formUpdate

  const handleClickOpenEdit = (singleEvent) => {
    setOpenEditEvent(true);
    setSelectedEvent(singleEvent);
  };

  // HANDLE MODAL ADD EVENT
  const handleClickOpen = (e) => {
    setOpenAddEvent(true);
  };

  // ATTEND AN EVENT
  const handleAttend = (el) => {
    const eventId = el._id;
    // prevent user from attending more than 9 events
    if (myEvents.length === 9)
      return alert("you can't attend more than 9 events");
    // check if user attends already
    let attendAlready = myEvents.filter((event) => event._id === eventId);
    if (attendAlready.length) return alert("you already attend this event!");
    axios
      .post("/api/events/attend", { eventId })
      .then((res) => {
        setMyEvents((prevEvents) => [...prevEvents, res.data]);
      })
      .catch((err) => console.log(err.message));
  };

  // LEAVE AN EVENT
  const handleLeave = (el) => {
    const eventId = el._id;
    axios
      .post("/api/events/leave", { eventId })
      .then((res) => {
        setMyEvents(
          (prevEvents) => [...prevEvents].filter((el) => el._id !== res.data) // res.data is eventId
        );
      })
      .catch((err) => console.log(err.message));
  };

  // CANCEL AN EVENT
  const handleCancel = (event) => {
    const eventId = event._id;
    axios
      .delete(`/api/events/cancel`, { data: { eventId } })
      .then((res) => {
        let del = res.data;
        setMyEvents((prev) => [...prev].filter((el) => el._id !== del._id));
        setAllEvents((prev) => [...prev].filter((el) => el._id !== del._id));
      })
      .catch((err) => console.log(err.message));
  };

  // CREATE EVENT THUMBNAILS
  const eventPics = [event1, event2, event3, event4, event5, event6, event7];

  // CREATE EACH PLANT PREVIEW CARD
  const createEventCard = (card) => {
    return (
      <Grid item key={card._id} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardActionArea onClick={() => history.push(`/event/${card._id}`)}>
            <CardMedia
              className={classes.media}
              image={`${eventPics[card.img]}`}
              title="plant pic"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h6" component="h2">
                {moment(card.date).format("MMM Do YYYY")}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {card.title}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            {currUser && currUser.username === card.host ? (
              <Box>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleClickOpenEdit(card)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleCancel(card)}
                >
                  Cancel
                </Button>
              </Box>
            ) : myEvents.find((el) => el._id === card._id) ? (
              <Button
                size="small"
                color="primary"
                onClick={() => handleLeave(card)}
              >
                Leave
              </Button>
            ) : (
              <Button
                size="small"
                color="primary"
                onClick={() => handleAttend(card)}
              >
                Attend
              </Button>
            )}
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
        <Grid container spacing={4} className={classes.catalogContainer}>
          <Container
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid item>
              <SearchEvents
                setEventSearch={setEventSearch}
                setIsEventSearch={setIsEventSearch}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => handleClickOpen(e)}
              >
                add your own
              </Button>
            </Grid>
          </Container>
          {isEventSearch
            ? allEvents
                .sort((a, b) => a.date - b.date)
                .map(
                  (el) =>
                    el.description
                      .toLowerCase()
                      .includes(eventSearch.toLowerCase()) ||
                    (el.title
                      .toLowerCase()
                      .includes(eventSearch.toLowerCase()) &&
                      createEventCard(el))
                )
            : allEvents
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((el) => createEventCard(el))}
        </Grid>
      ) : (
        <CircularProgress />
      )}
      <ModalAddEvent
        openAddEvent={openAddEvent}
        setOpenAddEvent={setOpenAddEvent}
        setMyEvents={setMyEvents}
        setAllEvents={setAllEvents}
      />
      <ModalUpdateEvent
        openEditEvent={openEditEvent}
        setOpenEditEvent={setOpenEditEvent}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        setMyEvents={setMyEvents}
        setAllEvents={setAllEvents}
      />
    </>
  );
}
