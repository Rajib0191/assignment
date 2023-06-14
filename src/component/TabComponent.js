import React from "react";
import ButtonComp from "./utils/Button";
import { Grid } from "@mui/material";

const TabComponent = ({ activeComponent, handleButtonClick }) => {
  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid container item xs={12} md={6}>
        <ButtonComp
          placeholder={"User"}
          variant={activeComponent === "user" ? "contained" : "outlined"}
          color={"primary"}
          onclick={() => handleButtonClick("user")}
          activeComponent={activeComponent}
        />
      </Grid>

      <Grid container item xs={12} md={6}>
        <ButtonComp
          placeholder={"Employee"}
          variant={activeComponent === "employee" ? "contained" : "outlined"}
          color={"primary"}
          onclick={() => handleButtonClick("employee")}
          activeComponent={activeComponent}
        />
      </Grid>
    </Grid>
  );
};

export default TabComponent;
