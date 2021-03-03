import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import { CardActions, CardActionArea } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography, Box, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import event1 from "../../assets/eventImages/event-1.jpg";
import event2 from "../../assets/eventImages/event-2.jpg";
import event3 from "../../assets/eventImages/event-3.jpg";
import event4 from "../../assets/eventImages/event-4.jpg";
import event5 from "../../assets/eventImages/event-5.jpg";
import event6 from "../../assets/eventImages/event-6.jpg";
import event7 from "../../assets/eventImages/event-7.jpg";
import ModalUpdateEvent from "../Events/ModalUpdateEvent";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "all 0.4s ease",
    "&:hover": {
      transform: "translateY(-7px)",
      boxShadow: "2px 3px 15px 2px rgba(0,0,0,0.1)",
      zIndex: 100,
    },
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function UserEventSection({
  card,
  currUser,
  setAllEvents,
  setMyEvents,
  myEvents,
}) {
  const classes = useStyles();
  const history = useHistory();
  const eventPics = [event1, event2, event3, event4, event5, event6, event7];

  // LEAVE AN EVENT
  const handleLeave = (el) => {
    const eventId = el._id;
    axios
      .post("http://localhost:3000/api/events/leave", { eventId })
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
    console.log(eventId);
    axios
      .delete(`http://localhost:3000/api/events/cancel`, { data: { eventId } })
      .then((res) => {
        let del = res.data;
        setMyEvents((prev) => [...prev].filter((el) => el._id !== del._id));
        setAllEvents((prev) => [...prev].filter((el) => el._id !== del._id));
      })
      .catch((err) => console.log(err.message));
  };

  // HANDLE MODAL FORM EVENT EDIT
  const [openEditEvent, setOpenEditEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // state is updated in formUpdate

  const handleClickOpenEdit = (singleEvent) => {
    setOpenEditEvent(true);
    setSelectedEvent(singleEvent);
  };

  return (
    <>
      <Grid item key={card} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardActionArea onClick={() => history.push(`/event/${card._id}`)}>
            <CardMedia
              className={classes.cardMedia}
              image={`${eventPics[card.img]}`}
              title="plant image"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h6" component="h2">
                {card.date}
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
            ) : (
              <Button
                size="small"
                color="primary"
                onClick={() => handleLeave(card)}
              >
                Leave
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>
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
