import React from "react";
import { Button } from "./Button/Button";
import { Menu, MenuItem } from "@mui/material";

export const Dropdown = ({
  options,
  onChange,
}: {
  options: { value: string; label: string }[];
  onChange: (value: any) => void;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (value: any) => {
    onChange(value);
    handleClose();
  };
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="base"
      >
        Crear
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {options.map((option) => (
          <MenuItem
            sx={{
              color: "var(--Gray-900, #101828)",
              /* Text sm/Medium */
              fontFamily: "Roboto Condensed",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "20px",
            }}
            onClick={() => handleChange(option.value)}
            key={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
