import React, { useState } from "react";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import axios from "axios";
import moment from "moment";

const useStyles = makeStyles({
  formInputs: {
    width: "100%",
  },
});

export default function FormUpdatePlant({
  selectedPlant,
  setSelectedPlant,
  setMyRepo,
  myRepo,
  setNeedsCare,
  setOpenEdit,
}) {
  const classes = useStyles();

  // HANDLE FORM INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedPlant((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // HANDLE PLANT UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/api/plants/update`, {
        selectedPlant: selectedPlant,
      })
      .then((res) => {
        setMyRepo((prevRepo) =>
          [...prevRepo].filter((el) => el._id !== selectedPlant._id)
        );
        setMyRepo((prevRepo) => [...prevRepo, res.data]);
        setNeedsCare((prev) =>
          [...prev].filter((el) => el !== selectedPlant.plant.latin)
        );
        setOpenEdit(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <TextField
            className={classes.formInputs}
            name="nickname"
            label="Nickname (optional)"
            variant="outlined"
            type="text"
            margin="dense"
            value={selectedPlant.nickname}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.formInputs}
            name="waterDate"
            label="Next watering?"
            variant="outlined"
            type="date"
            margin="dense"
            value={
              selectedPlant.waterDate
                ? selectedPlant.waterDate
                : moment(selectedPlant.water.date, "MM/DD/YYYY").format(
                    "YYYY-MM-DD"
                  )
            }
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.formInputs}
            name="waterInterval"
            variant="outlined"
            label="Preferred interval"
            type="number"
            margin="dense"
            value={selectedPlant.waterInterval}
            onChange={handleChange}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.formInputs}
            name="fertilizeDate"
            label="Next fertilizing?"
            variant="outlined"
            type="date"
            margin="dense"
            value={
              selectedPlant.fertilizeDate
                ? selectedPlant.fertilizeDate
                : moment(selectedPlant.fertilize.date, "MM/DD/YYYY").format(
                    "YYYY-MM-DD"
                  )
            }
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.formInputs}
            name="fertilizeInterval"
            variant="outlined"
            label="Preferred interval"
            type="number"
            margin="dense"
            value={selectedPlant.fertilizeInterval}
            onChange={handleChange}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.formInputs}
            name="repotDate"
            label="Next repotting?"
            variant="outlined"
            type="date"
            margin="dense"
            value={
              selectedPlant.repotDate
                ? selectedPlant.repotDate
                : moment(selectedPlant.repot.date, "MM/DD/YYYY").format(
                    "YYYY-MM-DD"
                  )
            }
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.formInputs}
            name="repotInterval"
            variant="outlined"
            label="Preferred interval"
            type="number"
            margin="dense"
            value={selectedPlant.repotInterval}
            onChange={handleChange}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          />
        </Grid>
        <Grid container direction="column" justify="center" alignItems="center">
          <Typography style={{ marginTop: "1em" }}>
            current plant happiness:
          </Typography>
          <ToggleButtonGroup
            value={selectedPlant.happiness}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="good" name="happiness">
              <SentimentSatisfiedOutlinedIcon />
            </ToggleButton>
            <ToggleButton value="medium" name="happiness">
              <SentimentSatisfiedIcon />
            </ToggleButton>
            <ToggleButton value="bad" name="happiness">
              <SentimentVeryDissatisfiedIcon />
            </ToggleButton>
          </ToggleButtonGroup>
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
