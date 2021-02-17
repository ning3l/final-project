import React from "react";
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

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
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
  allUsers,
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

  const user = allUsers.find((user) => user._id === match.params.userId);
  console.log("THIS USER", user);

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

  const createCards = (card) => {
    console.log(card);
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
              Here goes either event date OR plant name
            </Typography>
            <Typography>
              Here goes either event title OR plant subname
            </Typography>
          </CardContent>
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
      {user && (
        <Container className={classes.cardGrid} maxWidth="md">
          {/* <Grid container style={{ backgroundColor: "pink" }}>
            <Typography variant="h2">this is {user.username}</Typography>
            <Typography>up for plantsitting?</Typography>
            <Typography>{user.plantsitting}</Typography>
            <div style={{ display: "flex" }}>
              <img
                src={`http://localhost:3000/images/user/${user.profileImg}`}
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
              <img src={smile} alt="yellow smiley" style={{ width: "100px" }} />
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpenMessenger(user)}
            >
              Send a message
            </Button>
          </Grid> */}
          <main>
            <div className={classes.heroContent}>
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  Album layout
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  paragraph
                >
                  Something short and leading about the collection below—its
                  contents, the creator, etc. Make it short and sweet, but not
                  too short so folks don&apos;t simply skip over it entirely.
                </Typography>
                <div className={classes.heroButtons}>
                  <Grid container spacing={2} justify="center">
                    <Grid item>
                      <Button variant="contained" color="primary">
                        Main call to action
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" color="primary">
                        Secondary action
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Container>
            </div>

            <Grid container spacing={4}>
              <Box textAlign="center">
                <Typography variant="h2">
                  plants {user.username} currently owns
                </Typography>
                {user.repository.length ? (
                  <Grid
                    container
                    spacing={4}
                    className={classes.eventContainer}
                  >
                    {user.repository.map((card) => createCards(card))}
                  </Grid>
                ) : (
                  <div>{user.username} has not yet added any plants</div>
                )}
              </Box>
              <Box textAlign="center">
                <Typography variant="h2">
                  events {user.username} attends
                </Typography>
                {user.events.length ? (
                  <Grid
                    container
                    spacing={4}
                    className={classes.eventContainer}
                  >
                    {user.events.map((card) => createCards(card))}
                  </Grid>
                ) : (
                  <div>
                    {user.username} is currently not attending any events
                  </div>
                )}
              </Box>
            </Grid>
          </main>
        </Container>
      )}
    </>
  );
}
