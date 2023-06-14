import React from "react";
import { CircularProgress, Grid } from "@mui/material";

const Loading = () => {
  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        height: "calc(100vh - 93px)",
      }}
    >
      <CircularProgress color="primary" />
    </Grid>
  );
};

export default Loading;
