import React from "react";
import { Grid } from "@mui/material";
import SearchField from "./utils/SearchField";
import ButtonComp from "./utils/Button";

const SearchComponent = ({ searchValue, onChange, onClick }) => {
  return (
    <Grid
      container
      spacing={2}
      mt={3}
      mb={2}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid item xs={12} sm={8} md={8}>
        <SearchField
          placeholder={"Search Username"}
          value={searchValue}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <ButtonComp
          placeholder={"Add an User"}
          variant={"contained"}
          color={"secondary"}
          size={"large"}
          onclick={onClick}
        />
      </Grid>
    </Grid>
  );
};

export default SearchComponent;
