import React, { useState } from "react";
import { Grid } from "@mui/material";
import TabComponent from "../component/TabComponent";
import EmployeeComponent from "../component/EmployeeComponent";
import AdminComponent from "../component/AdminComponent";

function HomePage() {
  const [activeComponent, setActiveComponent] = useState();

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  const renderComponent = () => {
    if (activeComponent === "user") {
      return <AdminComponent filterValue={"Admin"} />;
    } else if (activeComponent === "employee") {
      return <EmployeeComponent filterValue={"Employee"} />;
    } else {
      return null;
    }
  };

  return (
    <Grid container>
      <TabComponent
        handleButtonClick={handleButtonClick}
        activeComponent={activeComponent}
      />

      {renderComponent()}
    </Grid>
  );
}

export default HomePage;
