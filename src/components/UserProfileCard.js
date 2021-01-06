import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import event1 from "../assets/eventImages/event-1.jpg";
import event2 from "../assets/eventImages/event-2.jpg";
import event3 from "../assets/eventImages/event-3.jpg";
import event4 from "../assets/eventImages/event-4.jpg";
import event5 from "../assets/eventImages/event-5.jpg";
import event6 from "../assets/eventImages/event-6.jpg";
import event7 from "../assets/eventImages/event-7.jpg";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    width: 345,
    margin: "20px",
    transition: "all 0.4s ease",
    "&:hover": {
      transform: "translateY(-7px)",
      boxShadow: "2px 3px 15px 2px rgba(0,0,0,0.1)",
      zIndex: 100,
    },
  },
  media: {
    height: 140,
  },
});

export default function UserProfileCard({
  el,
  setMyEvents,
  myEvents,
  currUser,
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
        // res is the id of the deleted event
        setMyEvents((prevEvents) =>
          [...prevEvents].filter((el) => el._id !== res.data)
        );
        console.log("myEvents", myEvents);
      })
      .catch((err) => console.log(err.message));
  };

  // CANCEL AN EVENT
  // FE: delete from myEvents & allEvents
  // BE: delete event and pull from each attendees events array
  const handleCancel = (el) => {
    console.log("event to be cancelled:", el._id);
  };

  // CANCEL AN EVENT
  // FE: delete from myEvents & allEvents
  // BE: delete event and pull from each attendees events array
  const handleEdit = (el) => {
    console.log("event to be cancelled:", el._id);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => history.push("/events")}>
        <CardMedia
          className={classes.media}
          image={`${eventPics[el.img]}`}
          title="detail view of a plant"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {el.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {el.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {currUser && currUser.username === el.host ? (
          <Box>
            <Button size="small" color="primary" onClick={() => handleEdit(el)}>
              Edit
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => handleCancel(el)}
            >
              Cancel
            </Button>
          </Box>
        ) : (
          <Button size="small" color="primary" onClick={() => handleLeave(el)}>
            Leave
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
