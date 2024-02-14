import {
  InputAdornment,
  TextField as MUITextField,
  TextFieldProps,
} from "@mui/material";
import React, { ReactNode } from "react";

export const TextField = React.forwardRef(function MyTextField(
  {
    icon,
    ...props
  }: {
    icon?: ReactNode;
  } & TextFieldProps,
  ref: any
) {
  return (
    <MUITextField
      ref={ref}
      {...props}
      InputProps={
        icon
          ? {
              startAdornment: (
                <InputAdornment position="start">{icon}</InputAdornment>
              ),
            }
          : {}
      }
      sx={{
        minWidth: "200px",
        ".MuiInputBase-root": {
          height: "100%",
          backgroundColor: "white !important",
          paddingLeft: "6px",
          border: "1px solid var(--Gray-300) !important",
        },
        ".MuiInputBase-input": {
          padding: "6px 10px",
          paddingLeft: "0",
        },
        ".MuiOutlinedInput-notchedOutline": {
          border: "none !important",
        },
        ".MuiInputBase-root.Mui-disabled": {
          border: "1px solid var(--Gray-300, #D0D5DD)",
          opacity: "0.5",
          background: "var(--Primary-50, #EFF4FF) !important",
        },
      }}
    />
  );
});
