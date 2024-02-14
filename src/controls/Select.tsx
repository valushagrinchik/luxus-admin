import * as React from "react";
import { ArrowDownIcon } from "./icons/ArrowDownIcon";
import {
  Select as MUISelect,
  SelectProps,
  MenuItem as MUIMenuItem,
} from "@mui/material";

export const Select = React.forwardRef(function MySelect(
  {
    placeholder,
    options,
    ...props
  }: {
    options: Record<string, string>;
  } & SelectProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <MUISelect
      displayEmpty
      defaultValue=""
      renderValue={(value) => {
        return value ? (
          <>{options[value as any] || ""}</>
        ) : (
          <span
            style={{
              color: "var(--Gray-500)",
            }}
          >
            {placeholder}
          </span>
        );
      }}
      {...props}
      ref={ref}
      placeholder={placeholder}
      IconComponent={(props) => <ArrowDownIcon {...props} size={20} />}
      autoFocus={false}
      MenuProps={{
        sx: {
          ".MuiPaper-root": {
            marginTop: "4px",
            maxHeight: "200px",
          },
        },
      }}
      sx={{
        width: "100%",
        minWidth: "150px",
        backgroundColor: "white",
        ".MuiSelect-select": {
          padding: "6px 10px",
        },
        ".MuiOutlinedInput-notchedOutline": {
          border: "1px solid var(--Gray-300) !important",
        },
        ".MuiSelect-icon": {
          color: "var(--Gray-500)",
        },
        ".MuiSelect-iconOpen": {
          color: "var(--Primary-800)",
        },
        ".MuiSelect-select.Mui-disabled": {
          border: "1px solid var(--Gray-300, #D0D5DD)",
          opacity: "0.5",
          background: "var(--Primary-50, #EFF4FF)",
        },
      }}
    >
      {Object.entries(options).map(([value, label]) => (
        <MUIMenuItem
          key={value}
          value={value}
          sx={{
            color: "var(--Gray-900, #101828)",
            /* Text sm/Medium */
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
    </MUISelect>
  );
});
