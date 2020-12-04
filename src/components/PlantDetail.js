import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import ModalRepo from "./ModalRepo";
import ModalWishlist from "./ModalWishlist";
import bkg from "../assets/detailPage.png";
import {
  CircularProgress,
  Grid,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAlt";

const useStyles = makeStyles({
  paperContainer: {
    width: "75%",
    padding: "2em",
    margin: "auto",
  },
  image: {
    // height: "100vh",
    backgroundImage: `url(${bkg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    fontWeight: "600",
  },
  body: {
    color: "#0000ff",
  },
}))(TableCell);

export default function PlantDetail({ match }) {
  const classes = useStyles();
  // SET SINGLE PLANT
  const [singlePlant, setSinglePlant] = useState(null);
  const [isError, setIsError] = useState(false);
  // HANDLE MODAL FORM REPO
  const [openRepo, setOpenRepo] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);

  console.log(match.params.plantId);

  // FETCH DETAIL INFO FOR PLANT ARCHETYPE
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
      description,
      srcImg,
      site,
      temp,
      water,
      feeding,
      tip,
    } = singlePlant;
    return (
      <Grid>
        <Grid>
          <Typography variant="h1" color="primary">
            {latin}
          </Typography>
          <Typography
            variant="h2"
            style={{ backgroundColor: "yellow" }}
            display="inline"
          >
            {common || "-"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{description}</Typography>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={6} md={4}>
            <img
              src={srcImg}
              style={{ maxHeight: "400px" }}
              alt="detail pic of the plant"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <TableContainer>
              <Table
                className={classes.table}
                size="medium"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow className={classes.row}>
                    <StyledTableCell align="left">Category</StyledTableCell>
                    <StyledTableCell align="left">Instructions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <StyledTableCell component="th" scope="row">
                      Site
                    </StyledTableCell>
                    <TableCell align="left">{site}</TableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell component="th" scope="row">
                      Temperature
                    </StyledTableCell>
                    <TableCell align="left">{temp}</TableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell component="th" scope="row">
                      Water
                    </StyledTableCell>
                    <TableCell align="left">{water}</TableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell component="th" scope="row">
                      Feeding
                    </StyledTableCell>
                    <TableCell align="left">{feeding}</TableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell component="th" scope="row">
                      Tip
                    </StyledTableCell>
                    <TableCell align="left">{tip}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="flex-end"
        >
          <Grid item>
            <Button variant="outlined" onClick={(e) => handleClickOpen(e)}>
              Add to repo
            </Button>
            <Button
              variant="outlined"
              onClick={(e) => {
                handleClickOpen(e);
              }}
            >
              ♡ Wishlist ♡
            </Button>
          </Grid>
          <Typography>
            <Link to="/catalog">See all Plants</Link>
          </Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <NavBar />
      <Grid
        container
        align="center"
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.image}
      >
        <Grid item>
          <SentimentSatisfiedAltIcon fontSize="large" />
          <Paper elevation={3} square={true} className={classes.paperContainer}>
            {!singlePlant && <CircularProgress />}
            {singlePlant && createPlantDetail(singlePlant)}
            {isError && <h1>this plant is not in our database</h1>}
          </Paper>
          <SentimentSatisfiedAltIcon fontSize="large" />
        </Grid>
        <ModalRepo openRepo={openRepo} setOpenRepo={setOpenRepo} />
        <ModalWishlist
          openWishlist={openWishlist}
          setOpenWishlist={setOpenWishlist}
          plantId={match.params.plantId}
          singlePlant={singlePlant}
        />
      </Grid>
    </>
  );
}
