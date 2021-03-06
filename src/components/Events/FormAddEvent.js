import React, { useState } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles({
  formInputs: {
    width: "100%",
  },
});

export default function FormAddEvent({
  setMyEvents,
  handleClose,
  setAllEvents,
}) {
  const classes = useStyles();

  // STATE FORM INPUT
  const [eventInput, setEventInput] = useState({
    title: "",
    date: "",
    time: "15:30",
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
      .post(`/api/events`, eventInput)
      .then((res) => {
        setAllEvents((prevEvents) => [...prevEvents, res.data]);
        setMyEvents((prevEvents) => [...prevEvents, res.data]);
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
            required={true}
            inputProps={{ maxLength: 24 }}
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
            required={true}
            inputProps={{ maxLength: 400 }}
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
            InputProps={{
              inputProps: { min: new Date().toISOString().slice(0, 10) },
            }}
            required={true}
          />
        </Grid>
        <TextField
          className={classes.formInputs}
          name="time"
          label="Time"
          variant="outlined"
          type="time"
          margin="dense"
          defaultValue="15:30"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
            step: 300, // 5min
          }}
          // inputProps={{
          //   step: 300, // 5 min
          // }}
          onChange={handleChange}
          required={true}
        />
        <Grid item xs={6}>
          <TextField
            className={classes.formInputs}
            name="street"
            label="Street"
            variant="outlined"
            type="text"
            margin="dense"
            onChange={handleChange}
            required={true}
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
            inputProps={{
              pattern: "^[0-9]*$",
            }}
            onChange={handleChange}
            required={true}
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
            inputProps={{
              pattern: "^[0-9]*$",
            }}
            onChange={handleChange}
            required={true}
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
            required={true}
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
