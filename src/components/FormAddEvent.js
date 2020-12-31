import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  formInputs: {
    width: "100%",
  },
});

export default function FormAddEvent({
  setMyEvents,
  myEvents,
  handleClose,
  setAllEvents,
}) {
  // console.log({setMyRepo})
  const history = useHistory();
  const classes = useStyles();

  // STATE FORM INPUT
  const [eventInput, setEventInput] = useState({
    title: "",
    date: "",
    description: "",
    street: "",
    number: "",
    zip: "",
    city: "",
    img: Math.floor(Math.random() * 6) + 1,
  });

  // HANDLE FORM INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ADD NEW EVENT TO DB
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/api/events`, eventInput)
      .then((res) => {
        setAllEvents((prevEvents) => [...prevEvents, res.data]); // add to all events client
        setMyEvents((prevEvents) => [...prevEvents, res.data]); // add to currUser events client
      })
      .catch((err) => console.log(err));
    handleClose(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <TextField
            className={classes.formInputs}
            name="title"
            label="Title"
            variant="outlined"
            type="text"
            margin="dense"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.formInputs}
            id="outlined-multiline-static"
            name="description"
            label="Description"
            multiline
            rows={4}
            margin="dense"
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.formInputs}
            name="date"
            label="Date"
            variant="outlined"
            type="date"
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.formInputs}
            name="street"
            label="Street"
            variant="outlined"
            type="text"
            margin="dense"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.formInputs}
            name="number"
            label="Number"
            variant="outlined"
            type="text"
            margin="dense"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.formInputs}
            name="zip"
            label="Zip code"
            variant="outlined"
            type="text"
            margin="dense"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.formInputs}
            name="city"
            label="City"
            variant="outlined"
            type="text"
            margin="dense"
            onChange={handleChange}
          />
        </Grid>
        <Button
          variant="outlined"
          type="submit"
          className={classes.formInputs}
          style={{ marginTop: "2em" }}
        >
          Submit
        </Button>
      </Grid>
    </form>
  );
}
