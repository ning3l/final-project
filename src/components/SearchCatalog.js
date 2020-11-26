import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Grid, Toolbar, Container, TextField } from "@material-ui/core";

export default function SearchCatalog({ setPlantSearch, setIsSearch }) {
  const handleSearch = (e) => {
    console.log(e.target.value);
    if (!e.target.value) {
      console.log("no val");
      setIsSearch(false);
    } else {
      setPlantSearch(e.target.value);
      setIsSearch(true);
    }
  };
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Toolbar>
        <Container>
          <TextField onChange={handleSearch}></TextField>
          <SearchIcon />
        </Container>
      </Toolbar>
    </Grid>
  );
}
