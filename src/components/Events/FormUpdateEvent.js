import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles({
  formInputs: {
    width: "100%",
  },
});

export default function FormUpdateEvent({
  setMyEvents,
  selectedEvent,
  setSelectedEvent,
  setOpenEditEvent,
  setAllEvents,
}) {
  const classes = useStyles();

  // HANDLE FORM INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    // changing the state here prevents the "controlled input" warning
    setSelectedEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // EDIT AN EVENT
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/api/events/edit`, {
        selectedEvent: selectedEvent,
      })
      .then((res) => {
        // filter old event info from all events AND curr user's event arr
        setAllEvents((prevEvents) =>
          [...prevEvents].filter((el) => el._id !== selectedEvent._id)
        );
        setMyEvents((prevEvents) =>
          [...prevEvents].filter((el) => el._id !== selectedEvent._id)
        );
        // put new updated event back in all events && into curr user's event arr
        setAllEvents((prevEvents) => [...prevEvents, res.data]);
        setMyEvents((prevEvents) => [...prevEvents, res.data]);
        // close modal
        setOpenEditEvent(false);
      })
      .catch((err) => console.log(err));
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
            value={selectedEvent.title}
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
            value={selectedEvent.description}
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
            value={selectedEvent.date}
            onChange={handleChange}
            InputProps={{
              inputProps: { min: new Date().toISOString().slice(0, 10) },
            }}
          />
        </Grid>
        <TextField
          className={classes.formInputs}
          name="time"
          label="Time"
          variant="outlined"
          type="time"
          margin="dense"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
            step: 300, // 5min
          }}
          value={selectedEvent.time}
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
            value={selectedEvent.address.street}
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
            value={selectedEvent.address.number}
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
            value={selectedEvent.address.zip}
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
            value={selectedEvent.address.city}
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
