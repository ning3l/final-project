import React, { useState } from "react";
import NavBar from "./NavBar";
import bkg from "../assets/detailPage.png";
import {
  CardContent,
  Grid,
  Card,
  CardMedia,
  CircularProgress,
  Typography,
  Box,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import SearchCatalog from "./SearchCatalog";

const useStyles = makeStyles({
  catalogContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
  },
});

export default function PlantCatalog({
  allPlants,
  history,
  setCurrUser,
  setCredentials,
  handleLogout,
}) {
  const classes = useStyles();

  // PAGINATION STATE
  const [page, setPage] = useState(1);
  // SEARCH STATE (only enable pagination if !isSearch, otherwise hide)
  const [plantSearch, setPlantSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  // HANDLE PAGINATION
  const handleChangePage = (_, page) => {
    setPage(page);
  };

  const idxLastPlant = page * 15;
  const idxFirstPlant = idxLastPlant - 15;

  // CREATE EACH PLANT PREVIEW CARD
  const createPlantCard = (el) => {
    return (
      <Grid item xs={12} sm={4} key={el._id}>
        <Card onClick={() => history.push(`/${el._id}`)} square={true}>
          <Box display="flex">
            <CardMedia
              className={classes.cardMedia}
              image={el.srcImg}
              style={{ width: "130px", height: "130px" }}
            ></CardMedia>
            <CardMedia
              className={classes.cardMedia}
              image={el.srcImg}
              style={{ width: "130px", height: "130px" }}
            ></CardMedia>
            <CardMedia
              className={classes.cardMedia}
              image={el.srcImg}
              style={{ width: "130px", height: "130px" }}
            ></CardMedia>
          </Box>
          <CardContent className={classes.cardContent}>
            <Typography style={{ fontWeight: 700 }}>
              {el.latin || "-"}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <NavBar
        setCurrUser={setCurrUser}
        setCredentials={setCredentials}
        handleLogout={handleLogout}
      />
      {allPlants ? (
        <Grid container spacing={2} className={classes.catalogContainer}>
          <SearchCatalog
            setPlantSearch={setPlantSearch}
            setIsSearch={setIsSearch}
          />
          {isSearch
            ? allPlants
                .sort((a, b) => a.latin - b.latin)
                .map(
                  (el) => el.latin.includes(plantSearch) && createPlantCard(el)
                )
            : allPlants
                .sort((a, b) => a.latin - b.latin)
                .slice(idxFirstPlant, idxLastPlant)
                .map((el) => createPlantCard(el))}

          <Grid container direction="row" justify="center" alignItems="center">
            {!isSearch && (
              <Pagination
                shape="rounded"
                count={Math.ceil(allPlants.length / 15)}
                page={page}
                onChange={handleChangePage}
              />
            )}
          </Grid>
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}
