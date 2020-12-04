import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  formInputs: {
    width: "100%",
  },
});

export default function FormAddPlant({setMyRepo}) {
  // console.log({setMyRepo})
  const history = useHistory()
  const { plantId } = useParams();
  const classes = useStyles();

  // STATE FORM INPUT
  const [plantInstanceInput, setPlantInstanceInput] = useState({
    nickname: "",
    waterDate: "",
    waterInterval: "",
    fertilizeDate: "",
    fertilizeInterval: "",
    repotDate: "",
    repotInterval: "",
    happiness: "",
  });

  // HANDLE FORM INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlantInstanceInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ADD PLANT TO PLANT INSTANCE DB
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(plantInstanceInput);
    console.log(plantId);
    axios
      .post(`http://localhost:3000/api/plants/${plantId}`, plantInstanceInput)
      .then((res) => {
        setMyRepo(prevRepo => [...prevRepo, res.data])
        history.push("/repo")
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </Grid>
        <Grid container direction="column" justify="center" alignItems="center">
          <Typography style={{ marginTop: "1em" }}>
            current plant happiness:
          </Typography>
          <ToggleButtonGroup
            value={plantInstanceInput.happiness}
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
