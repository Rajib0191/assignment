import React from "react";
import { Grid, Typography } from "@mui/material";

const ErrorComponent = () => {
  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        height: "calc(100vh - 93px)",
      }}
    >
      <Typography>Something went wrong!</Typography>
    </Grid>
  );
};

export default ErrorComponent;
