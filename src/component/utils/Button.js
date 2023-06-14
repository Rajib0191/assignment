import React from "react";
import { Button } from "@mui/material";

const ButtonComp = ({
  placeholder,
  onclick,
  variant,
  color,
  loading,
  size = "medium",
  disabled = false,
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      onClick={onclick}
      disabled={loading || disabled}
      sx={{ width: "100%" }}
    >
      {loading ? "Loading..." : placeholder}
    </Button>
  );
};

export default ButtonComp;
