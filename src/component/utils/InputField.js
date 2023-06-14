import React from "react";
import { Grid, TextField } from "@mui/material";

const InputField = ({
  type = "text",
  size = "small",
  variant = "outlined",
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
}) => {
  return (
    <Grid container item>
      <TextField
        id="outlined-basic"
        variant={variant}
        fullWidth
        size={size}
        label={label}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
      />
    </Grid>
  );
};

export default InputField;
