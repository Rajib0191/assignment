import React from "react";
import { Grid } from "@mui/material";

const Alert = ({ message, messageType }) => {
  return (
    <Grid
      container
      item
      xs={12}
      sx={{
        padding: "0.5rem 0.75rem",
        marginBottom: "1rem",
        borderColor: "transparent",
        borderRadius: "5px",
        textAlign: "center",
        letterSpacing: "2px",
        color: `${messageType === "success" ? "#0f5132" : "#842029"}`,
        background: `${messageType === "success" ? "#d1e7dd" : "#f8d7da"}`,
      }}
    >
      {message}
    </Grid>
  );
};

export default Alert;
