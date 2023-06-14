import React from "react";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

const DivisionSelectField = ({
  size = "small",
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  divisionData = [],
}) => {
  return (
    <Grid container item>
      <FormControl fullWidth size={size}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
        >
          {divisionData?.map((division) => (
            <MenuItem key={division.divID} value={division.divID}>
              {division.divisionName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default DivisionSelectField;
