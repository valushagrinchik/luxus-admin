import {
  InputAdornment,
  TextField as MUITextField,
  TextFieldProps,
  MenuItem as MUIMenuItem,
} from "@mui/material";
import React, { ReactNode } from "react";
import { ArrowDownIcon } from "./icons/ArrowDownIcon";

export const TextField = React.forwardRef(function MyTextField(
  {
    icon,
    options,
    value,
    select,
    ...props
  }: {
    icon?: ReactNode;
    options?: Record<string, string>;
  } & TextFieldProps,
  ref: any
) {
  return (
    <MUITextField
      ref={ref}
      variant="standard"
      select={select}
      {...props}
      value={value}
      SelectProps={{
        IconComponent: (props) => (
          <ArrowDownIcon {...props} width={20} height={20} />
        ),
        ...props.SelectProps,
      }}
      InputProps={
        icon
          ? {
              startAdornment: (
                <InputAdornment position="start">{icon}</InputAdornment>
              ),
            }
          : {}
      }
      InputLabelProps={{ shrink: true }}
      sx={{
        minWidth: "200px",
        ".MuiInputBase-root": {
          backgroundColor: "white !important",
          paddingLeft: "6px",
          border: "1px solid var(--Gray-300) !important",
          borderRadius: "6px",
          overflow: "hidden",
        },
        ".MuiInputBase-input": {
          padding: "6px 10px",
          paddingLeft: "0",
        },
        ".MuiInputBase-input.MuiInput-input:focus": {
          backgroundColor: "white",
        },
        ".MuiOutlinedInput-notchedOutline": {
          border: "none !important",
        },
        ".MuiInputBase-root.Mui-disabled": {
          border: "1px solid var(--Gray-300, #D0D5DD)",
          background: "var(--Primary-50, #EFF4FF) !important",
        },
        ".MuiInputBase-input-MuiInput-input.Mui-disabled": {
          color: "var(--Gray-500, #667085)",
        },
        ".MuiFormHelperText-root": {
          marginLeft: 0,
        },
        ".MuiFormLabel-root,.MuiFormLabel-root.Mui-focused": {
          color: "var(--Gray-700, #344054)",
          fontFamily: "Roboto Condensed",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "20px",
        },
        "& .MuiInput-underline:after, & .MuiInput-underline:hover:after, & .MuiInput-underline:before, & .MuiInput-underline:hover:before":
          {
            border: "none !important",
          },
        ".MuiSelect-nativeInput":
          value === "" || (Array.isArray(value) && !value.length)
            ? {
                border: "none",
                paddingLeft: "6px",
                borderRadius: "6px",
                opacity: 1,
                height: "100%",
                fontFamily: "Roboto Condensed",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "24px",
              }
            : {},
        ".MuiSelect-nativeInput:placeholder": {
          color: "var(--Gray-500, #667085)",
        },
        ".MuiSelect-icon": {
          top: "calc(50% - 10px)",
          marginRight: "6px",
        },
      }}
    >
      {select && !Object.entries(options || {})?.length && (
        <MUIMenuItem disabled>Sin datos</MUIMenuItem>
      )}
      {options &&
        Object.entries(options).map(([value, label]) => (
          <MUIMenuItem
            key={value}
            value={value}
            sx={{
              color: "var(--Gray-900, #101828)",
              fontFamily: "Roboto Condensed",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "20px",
            }}
          >
            {label}
          </MUIMenuItem>
        ))}
    </MUITextField>
  );
});
