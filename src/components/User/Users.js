import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../NavBar";
import bkg from "../../assets/repo.jpg";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "80%",
    marginBottom: "1em",
    opacity: "90%",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
  },
  content: {
    flex: "1 0 auto",
  },
  plantPic: {
    width: 151,
  },
  cardContainer: {
    minHeight: "100vh",
    backgroundImage: `url(${bkg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    paddingTop: "20px",
  },
  plantsitting: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default function Users({
  setCurrUser,
  currUser,
  setCredentials,
  handleLogout,
  allUsers,
  history,
}) {
  const classes = useStyles();

  const createUserCard = (el) => {
    return (
      <Card
        className={classes.root}
        key={el._id}
        onClick={() => history.push(`/user/${el._id}`)}
      >
        <CardMedia
          className={classes.plantPic}
          image={`http://localhost:3000/images/user/${el.profileImg}`}
          title="Plant Preview"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <div className={classes.plantsitting}>
              <Typography
                component="h5"
                variant="h5"
                style={{ backgroundColor: "", display: "inline" }}
              >
                {el.username}
              </Typography>
              {el.plantsitting === "yes" ? (
                <Typography
                  style={{ backgroundColor: "yellow", display: "inline" }}
                >
                  plantsitting ✓
                </Typography>
              ) : null}
            </div>
            <Typography>Location: {el.city || "N/A"}</Typography>
            <Typography>
              currently owns {el.repository.length} plant(s)!
            </Typography>
          </CardContent>
        </div>
      </Card>
    );
  };

  return (
    <>
      <NavBar
        setCurrUser={setCurrUser}
        setCredentials={setCredentials}
        handleLogout={handleLogout}
      />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.cardContainer}
      >
        {allUsers.length ? (
          allUsers
            .filter((el) => el.username !== currUser.username)
            .map((el) => createUserCard(el))
        ) : (
          <Link to="/">
            <Typography style={{ backgroundColor: "yellow " }}>
              no other users available
            </Typography>
          </Link>
        )}
      </Grid>
    </>
  );
}
