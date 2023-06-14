import React from "react";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

const DistrictSelectField = ({
  size = "small",
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  districts = [],
  disabled = false,
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
          disabled={disabled}
        >
          {districts?.map((district) => (
            <MenuItem key={district.districtID} value={district.districtID}>
              {district.districtName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default DistrictSelectField;
