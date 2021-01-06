import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Grid, Toolbar, Container, TextField } from "@material-ui/core";

export default function SearchCatalog({ setEventSearch, setIsEventSearch }) {
  const handleSearch = (e) => {
    console.log(e.target.value);
    if (!e.target.value) {
      setIsEventSearch(false);
    } else {
      setEventSearch(e.target.value);
      setIsEventSearch(true);
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
