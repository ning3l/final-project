import React, { useState, useEffect } from "react";
import { useConversations } from "../../contexts/ConversationsProvider";
import NavBar from "../NavBar";
import {
  Grid,
  Box,
  Button,
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import event1 from "../../assets/eventImages/event-1.jpg";
import event2 from "../../assets/eventImages/event-2.jpg";
import event3 from "../../assets/eventImages/event-3.jpg";
import event4 from "../../assets/eventImages/event-4.jpg";
import event5 from "../../assets/eventImages/event-5.jpg";
import event6 from "../../assets/eventImages/event-6.jpg";
import event7 from "../../assets/eventImages/event-7.jpg";
import smile from "../../assets/smile.png";
import axios from "axios";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 4),
  },
  heroButton: {
    margin: theme.spacing(1),
    display: "block",
  },
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
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function VisitedProfile({
  match,
  history,
  setCurrUser,
  setCredentials,
  handleLogout,
}) {
  const classes = useStyles();
  const eventPics = [event1, event2, event3, event4, event5, event6, event7];

  const {
    myMessages,
    setMyMessages,
    setSelectedConversationID,
  } = useConversations();

  // GET INFOS FOR THIS USER
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/users/${match.params.userId}`)
      .then((res) => {
        console.log("DATA", res.data);
        setUserDetails(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // MESSENGER
  const handleOpenMessenger = (user) => {
    let oldConvo = myMessages.find((el) => el.contact === user._id);
    if (!oldConvo) {
      let newConvo = {
        contact: user._id,
        messages: [],
      };
      setMyMessages((prev) => [...prev, newConvo]);
    }
    setSelectedConversationID(user._id);
    history.push({
      pathname: `/messenger/${user._id}`,
      state: { detail: user },
    });
  };

  const createPlantCards = (plant) => {
    return (
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardActionArea onClick={() => history.push(`/plant/${plant._id}`)}>
            <CardMedia
              className={classes.cardMedia}
              image={plant.srcImg}
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {plant.common || "-"}
              </Typography>
              <Typography>{plant.latin || "-"}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  };

  const createEventCards = (event) => {
    console.log("EEVENt", event);
    return (
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardActionArea onClick={() => history.push(`/event/${event._id}`)}>
            <CardMedia
              className={classes.cardMedia}
              image={`${eventPics[event.img]}`}
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h6" component="h2">
                {event.date}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {event.title}
              </Typography>
            </CardContent>
          </CardActionArea>
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
      {userDetails && (
        <main>
          {/* user info */}
          <img
            src={smile}
            alt="yellow smiley"
            style={{
              width: "100px",
              position: "absolute",
              marginLeft: "25%",
              marginTop: "5%",
            }}
          />
          <div className={classes.heroContent}>
            <Container maxWidth="sm" align="center">
              <Typography
                component="h1"
                variant="h2"
                color="textPrimary"
                gutterBottom
              >
                this is {userDetails.username}
              </Typography>
              <img
                src={`http://localhost:3000/images/user/${userDetails.profileImg}`}
                alt="user profile pic"
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
              />
              <Typography>up for plantsitting?</Typography>
              <Typography
                style={{ backgroundColor: "yellow", display: "inline" }}
              >
                {userDetails.plantsitting}
              </Typography>
              <Button
                className={classes.heroButton}
                variant="contained"
                color="primary"
                onClick={() => handleOpenMessenger(userDetails)}
              >
                send a message
              </Button>
            </Container>
          </div>
          {/* plant and event section */}
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid
              container
              spacing={4}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box textAlign="center" mb={2}>
                <Typography variant="h2" gutterBottom>
                  plants {userDetails.username} currently owns
                </Typography>
                {userDetails.repository.length ? (
                  <Grid
                    container
                    spacing={4}
                    className={classes.eventContainer}
                  >
                    {userDetails.repository.map((card) =>
                      createPlantCards(card.plant)
                    )}
                  </Grid>
                ) : (
                  <Box>
                    <Typography>
                      {userDetails.username} has not yet added any plants
                    </Typography>
                    <SentimentVeryDissatisfiedIcon fontSize="large" />
                  </Box>
                )}
              </Box>
              <Box textAlign="center" mb={2}>
                <Typography variant="h2" gutterBottom>
                  events {userDetails.username} attends
                </Typography>
                {userDetails.events.length ? (
                  <Grid
                    container
                    spacing={4}
                    className={classes.eventContainer}
                  >
                    {userDetails.events.map((card) => createEventCards(card))}
                  </Grid>
                ) : (
                  <Box>
                    <Typography>
                      {userDetails.username} is currently not attending any
                      events
                    </Typography>
                    <SentimentVeryDissatisfiedIcon fontSize="large" />
                  </Box>
                )}
              </Box>
            </Grid>
          </Container>
        </main>
      )}
    </>
  );
}
