import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography, Box, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
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

  // LEAVE AN EVENT
  const handleLeave = (el) => {
    const eventId = el._id;
    axios
      .post("http://localhost:3000/api/events/leave", { eventId })
      .then((res) => {
        setMyEvents(
          (prevEvents) => [...prevEvents].filter((el) => el._id !== res.data) // res.data is eventId
        );
        console.log("myEvents", myEvents);
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
        console.log("EL to be deleted", res.data);
        let del = res.data;
        setMyEvents((prev) => [...prev].filter((el) => el._id !== del._id));
        setAllEvents((prev) => [...prev].filter((el) => el._id !== del._id));
      })
      .catch((err) => console.log(err.message));
  };

  // not yet implemented server-side
  // EDIT AN EVENT
  const handleEdit = (event) => {
    console.log("event to be edited:", event._id);
    // you get back an updatet event item
    // use it to update setAllEvents manually
  };

  return (
    <Grid item key={card} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image="https://source.unsplash.com/random"
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {card.title}
          </Typography>
          <Typography>{card.content || "tba"}</Typography>
        </CardContent>
        <CardActions>
          {currUser && currUser.username === card.host ? (
            <Box>
              <Button
                size="small"
                color="primary"
                onClick={() => handleEdit(card)}
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
  );
}
