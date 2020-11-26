import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import ModalRepo from "./ModalRepo";
import ModalWishlist from "./ModalWishlist";
import {
  CircularProgress,
  Grid,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  paperContainer: {
    width: "75%",
    padding: "1em",
    marginTop: "2em",
  },
});

export default function PlantDetail({ match }) {
  const classes = useStyles();
  const [singlePlant, setSinglePlant] = useState(null);
  const [isError, setIsError] = useState(false);
  // HANDLE MODAL FORM REPO
  const [openRepo, setOpenRepo] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);

  console.log(match.params.plantId);

  useEffect(() => {
    fetch(`http://localhost:3000/api/plants/${match.params.plantId}`)
      .then((res) => res.json())
      .then((data) => setSinglePlant(data))
      .catch((err) => setIsError(true));
  }, [match.params.plantId]); // why does this go here again?

  const handleClickOpen = (e) => {
    console.log(e.target.innerText);
    if (e.target.innerText.includes("REPO")) {
      setOpenRepo(true);
    } else if (e.target.innerText.includes("WISHLIST")) {
      setOpenWishlist(true);
    }
  };

  const createPlantDetail = (singlePlant) => {
    const {
      latin,
      common,
      srcImg,
      site,
      temp,
      water,
      feeding,
      tip,
    } = singlePlant;
    return (
      <Grid>
        <Typography variant="h4">{latin}</Typography>
        <Typography variant="h5">{common || "-"}</Typography>
        <Grid container>
          <Grid item xs={4}>
            <img
              src={srcImg}
              style={{ height: "200px" }}
              alt="detail pic of the plant"
            />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">HERE GOES PLANT DESCRIPTION</Typography>
          </Grid>
        </Grid>
        <Typography variant="body1">Site: {site}</Typography>
        <Typography variant="body1">Temp: {temp}</Typography>
        <Typography variant="body1">Water: {water}</Typography>
        <Typography variant="body1">Feeding: {feeding}</Typography>
        <Typography variant="body1">Tip: {tip || "-"}</Typography>
        <Button variant="outlined" onClick={(e) => handleClickOpen(e)}>
          Add to my repo
        </Button>
        <Button variant="outlined" onClick={(e) => handleClickOpen(e)}>
          Add to my wishlist
        </Button>
        <Link to="/">
          <Typography>Go back to all Plants</Typography>
        </Link>
      </Grid>
    );
  };

  return (
    <>
      <NavBar />
      <Grid container direction="column" justify="center" alignItems="center">
        {/* <Grid container> */}
        <Paper elevation={3} className={classes.paperContainer}>
          {!singlePlant && <CircularProgress />}
          {singlePlant && createPlantDetail(singlePlant)}
          {isError && <h1>this plant is not in our database</h1>}
        </Paper>
        <ModalRepo openRepo={openRepo} setOpenRepo={setOpenRepo} />
        <ModalWishlist
          openWishlist={openWishlist}
          setOpenWishlist={setOpenWishlist}
        />
      </Grid>
    </>
  );
}
