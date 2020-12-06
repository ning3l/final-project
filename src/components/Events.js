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
import SearchCatalog from "./SearchCatalog";
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
  //   root: {
  //     maxWidth: 345,
  //   },
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
  const [plantSearch, setPlantSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  // MODAL FORM STATES
  const [openAddEvent, setOpenAddEvent] = useState(false);

  // HANDLE PAGINATION
  const handleChangePage = (_, page) => {
    setPage(page);
  };

  const idxLastPlant = page * 15;
  const idxFirstPlant = idxLastPlant - 15;

  // HANDLE MODAL FORM REPO
  const handleClickOpen = (e) => {
    setOpenAddEvent(true);
  };

  // ATTEND AN EVENT
  const handleAttend = (el) => {
    const eventId = el._id;
    console.log("EVENT ID", eventId);
    axios
      .post("http://localhost:3000/api/events/attend", { eventId })
      .then((res) => {
        console.log(res.data);
        setMyEvents((prevEvents) => [...prevEvents, res.data]);
        // push event to your curr user repo array
      })
      .catch((err) => console.log(err.message));
    // make axios.post on this specific event and add person to attendees arr
  };

  //   const handleSubmit = (e) => {
  //     axios
  //       .post(`http://localhost:3000/api/plants/${plantId}`, plantInstanceInput)
  //       .then((res) => {
  //         setMyRepo((prevRepo) => [...prevRepo, res.data]);
  //         history.push("/repo");
  //       })
  //       .catch((err) => console.log(err));
  //   };

  // UNATTEND AN EVENT > only in profile component
  // CREATE EVENT THUMBNAILS
  const eventPics = [event1, event2, event3, event4, event5, event6, event7];

  // CREATE EACH PLANT PREVIEW CARD
  const createEventCard = (el) => {
    return (
      <Grid item xs={12} sm={6} key={el._id}>
        {/* <img src={event1} /> */}
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              // image={`${event1}`}
              // image={`${hi[Math.floor(Math.random() * hi.length)]}`}
              image={`${eventPics[el.img]}`}
              title="Contemplative Reptile"
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
            <Button
              size="small"
              color="primary"
              onClick={() => handleAttend(el)}
            >
              Attend
            </Button>
            <Button size="small" color="primary">
              Learn More
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
              style={{ backgroundColor: "salmon" }}
              onClick={(e) => handleClickOpen(e)}
            >
              add your own
            </Button>
          </Grid>
          <SearchCatalog
            setPlantSearch={setPlantSearch}
            setIsSearch={setIsSearch}
          />
          {isSearch
            ? allEvents
                .sort((a, b) => a.latin - b.latin)
                .map(
                  (el) => el.latin.includes(plantSearch) && createEventCard(el)
                )
            : allEvents
                .sort((a, b) => a.latin - b.latin)
                .slice(idxFirstPlant, idxLastPlant)
                .map((el) => createEventCard(el))}
          <Grid container direction="row" justify="center" alignItems="center">
            {!isSearch && (
              <Pagination
                shape="rounded"
                count={Math.ceil(allEvents.length / 15)}
                page={page}
                onChange={handleChangePage}
              />
            )}
          </Grid>
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
