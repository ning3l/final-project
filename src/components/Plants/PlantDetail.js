import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../NavBar";
import ModalRepo from "./ModalRepo";
import ModalWishlist from "./ModalWishlist";
import bkg from "../../assets/detailPage.png";
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
  Container,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAlt";
import axios from "axios";

const useStyles = makeStyles({
  paperContainer: {
    width: "80%",
    padding: "2em",
    margin: "auto",
    textAlign: "center",
  },
  image: {
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

export default function PlantDetail({
  match,
  setMyRepo,
  currUser,
  setAllUsers,
  myWishlist,
  setMyWishlist,
  handleLogout,
  allPlants,
}) {
  const classes = useStyles();
  // SET SINGLE PLANT
  const [singlePlant, setSinglePlant] = useState(null);
  const [isError, setIsError] = useState(false);
  // HANDLE MODAL FORM REPO
  const [openRepo, setOpenRepo] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);

  // FETCH DETAIL INFO FOR PLANT ARCHETYPE
  useEffect(() => {
    if (!allPlants.find((el) => el._id === match.params.plantId)) {
      setIsError(true);
      return;
    }
    axios
      .get(`http://localhost:3000/api/plants/${match.params.plantId}`)
      .then((res) => setSinglePlant(res.data))
      .catch((err) => setIsError(err));
  }, [match.params.plantId, allPlants]);

  const handleClickOpen = (e) => {
    if (e.target.innerText.includes("REPO")) {
      setOpenRepo(true);
    } else if (e.target.innerText.includes("WISHLIST")) {
      if (myWishlist.length === 3)
        return alert(
          "Your wishlist already contains 3 plants, pls delete one first!"
        );
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
      <Grid container>
        <Grid item xs={12} style={{ marginBottom: "20px" }}>
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
        <Grid container display="flex" alignItems="center">
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            style={{ width: 300, margin: "auto" }}
          >
            <img
              src={`http://localhost:3000/images/plants/${srcImg}`}
              style={{ maxWidth: "90%" }}
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
          <Grid item style={{ marginTop: "20px" }}>
            <Button variant="outlined" onClick={(e) => handleClickOpen(e)}>
              Add to repo
            </Button>
            <Button
              variant="outlined"
              onClick={(e) => {
                handleClickOpen(e);
              }}
            >
              ♡ WISHLIST ♡
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
      <NavBar handleLogout={handleLogout} />
      <Grid
        className={classes.image}
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Container display="flex" align="center">
          <SentimentSatisfiedAltIcon fontSize="large" />
          <Paper elevation={3} className={classes.paperContainer}>
            {!singlePlant && !isError && <CircularProgress />}
            {singlePlant && createPlantDetail(singlePlant)}
            {isError && !singlePlant && (
              <h1>sorry, this plant is not in our database</h1>
            )}
          </Paper>
          <SentimentSatisfiedAltIcon fontSize="large" />
        </Container>
        <ModalRepo
          openRepo={openRepo}
          setOpenRepo={setOpenRepo}
          setMyRepo={setMyRepo}
          setAllUsers={setAllUsers}
          currUser={currUser}
        />
        <ModalWishlist
          openWishlist={openWishlist}
          setOpenWishlist={setOpenWishlist}
          plantId={match.params.plantId}
          singlePlant={singlePlant}
          setMyWishlist={setMyWishlist}
        />
      </Grid>
    </>
  );
}
