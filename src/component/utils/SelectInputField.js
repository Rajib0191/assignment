import React from "react";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

const SelectInputField = ({
  size = "small",
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  items = [],
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
          {items.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default SelectInputField;
