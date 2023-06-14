import React from "react";
import { Grid, Typography } from "@mui/material";

const NoDataFound = () => {
  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        height: "calc(100vh - 93px)",
      }}
    >
      <Typography>No Data Found</Typography>
    </Grid>
  );
};

export default NoDataFound;
