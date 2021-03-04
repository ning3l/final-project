import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import bkg from "../assets/repo.jpg";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(8),
    width: "60%",
    opacity: "80%",
    textAlign: "center",
  },
  root: {
    height: "100vh",
    backgroundImage: `url(${bkg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
}));

export default function NotFound() {
  const classes = useStyles();

  const history = useHistory();
  const handleClick = () => {
    history.goBack();
  };

  return (
    <Grid container className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h1" component="h1" gutterBottom>
          4✿4
        </Typography>
        <Typography variant="h6" component="h1" gutterBottom>
          can't see the forest for the trees?
        </Typography>
        <Button onClick={handleClick}>get back</Button>
      </Paper>
    </Grid>
  );
}
