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

export default function FormUpdatePlant({
  selectedPlant,
  setMyRepo,
  myRepo,
  setNeedsCare,
  setOpenEdit,
}) {
  // console.log({setMyRepo})
  const history = useHistory();
  const { plantId } = useParams();
  const classes = useStyles();

  // STATE FORM UPDATE INPUT
  const [plantUpdateInput, setPlantUpdateInput] = useState({
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
    setPlantUpdateInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // HANDLE PLANT UPDATE
  // care array !!
  // setMyRepo((prevRepo) => [...prevRepo, res.data]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("update", selectedPlant.plant.latin);
    axios
      .put(`http://localhost:3000/api/plants/update`, {
        plantUpdateInput: plantUpdateInput,
        id: selectedPlant._id,
      })
      .then((res) => {
        console.log(res.data);
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
    console.log("MY REPO FROM FORM UPDATE PLANT", myRepo);
  };

  // HANDLE PLANT UPDATE
  // const handleUpdate = (id, plant) => {
  //   console.log("id from update", id);
  //   axios
  //     .put(`http://localhost:3000/api/plants/update`, { id })
  //     .then((res) => console.log("EL to be updatet", res.data))
  //     .catch((err) => console.log(err.message));
  //   // manually update repo AND care tracker arr
  // };

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
            // value={selectedPlant.nickname || selectedPlant.latin}
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
            // value={selectedPlant.waterDate}
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
            // value={selectedPlant.waterInterval}
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
            // value={selectedPlant.fertilizeDate}
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
            // value={selectedPlant.fertilizeInterval}
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
            // value={selectedPlant.repotDate}
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
            // value={selectedPlant.repotInterval}
            onChange={handleChange}
          />
        </Grid>
        <Grid container direction="column" justify="center" alignItems="center">
          <Typography style={{ marginTop: "1em" }}>
            current plant happiness:
          </Typography>
          <ToggleButtonGroup
            value={plantUpdateInput.happiness}
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
