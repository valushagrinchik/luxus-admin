import * as React from "react";
import {
  Select as BaseSelect,
  selectClasses,
  SelectListboxSlotProps,
  SelectProps,
} from "@mui/base/Select";
import { Button as BaseButton, ButtonProps } from "@mui/base/Button";
import { Option as BaseOption, optionClasses } from "@mui/base/Option";
import { styled } from "@mui/system";
import { CssTransition } from "@mui/base/Transitions";
import { PopupContext } from "@mui/base/Unstable_Popup";
import { ArrowDownIcon } from "./icons/ArrowDownIcon";
import { ArrowUpIcon } from "./icons/ArrowUpIcon";
import { prepareForSlot } from "@mui/base/utils";
import { Dropdown } from "@mui/base/Dropdown";
import { MenuButton } from "@mui/base/MenuButton";
import { Menu } from "@mui/base/Menu";
import { MenuItem as BaseMenuItem } from "@mui/base/MenuItem";

export const Select = React.forwardRef(function MySelect<
  TValue extends {},
  Multiple extends boolean
>(
  {
    dropdown = "select",
    options,
    placeholder,
    ...props
  }: {
    dropdown?: "select" | "menu";
    options: {
      label: string;
      value: string | number;
    }[];
    placeholder?: string;
  } & SelectProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const slots = {
    root: prepareForSlot(StyledButton),
    listbox: AnimatedListbox,
    popup: Popup,
    ...props.slots,
  };

  if (dropdown === "menu") {
    return (
      <Dropdown>
        <MenuButton slots={{ root: slots.root }}></MenuButton>
        <Menu slots={{ listbox: slots.listbox }}>
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              onClick={(e) => {
                if (props.onChange) {
                  props.onChange(e, option.value as any);
                }
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </Dropdown>
    );
  }

  return (
    <BaseSelect
      {...props}
      placeholder={<Placeholder placeholder={placeholder} />}
      ref={ref}
      slots={slots}
    >
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
      {!options.length && (
        <Option disabled key="no_data" value={0}>
          Sin datos
        </Option>
      )}
    </BaseSelect>
  );
});

const Placeholder = ({ placeholder }: { placeholder?: string }) => {
  if (!placeholder) {
    return null;
  }
  return (
    <span
      style={{
        color: "var(--Gray-500)",
      }}
    >
      {placeholder}
    </span>
  );
};

const Button = React.forwardRef(function MyButton(
  props: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { children, ...other } = props;
  return (
    <BaseButton {...other} ref={ref}>
      {children}
      {props["aria-expanded"] ? <ArrowUpIcon /> : <ArrowDownIcon />}
    </BaseButton>
  );
});

const StyledButton = styled(Button, { shouldForwardProp: () => true })(
  () => `
  height: 36px;
  cursor: pointer;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-width: 200px;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: left;
  position: relative;
  border-radius: 6px;
  border: 1px solid var(--Gray-300, #D0D5DD);
  background: var(--Base-White, #FFF);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;
  color: var(--Gray-900, #667085);
  /* Text md/Regular */
  font-family: "Roboto Condensed";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;

  &:hover {

  }

  &.${selectClasses.focusVisible} {
    outline: 0;
  }

  & > svg {
    font-size: 1rem;
    position: absolute;
    height: 100%;
    top: 0;
    right: 10px;
  }
  `
);

const Listbox = styled("ul")(
  () => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 2px;
  margin: 12px 0;
  min-width: 200px;
  max-height: 200px;
  overflow: scroll;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: var(--Base-White, #FFF);
  box-shadow: 0px 0px 16px 0px rgba(0, 20, 61, 0.08);
  color: var(--Gray-500, #667085);

  .closed & {
    opacity: 0;
    transform: scale(0.95, 0.8);
    transition: opacity 200ms ease-in, transform 200ms ease-in;
  }
  
  .open & {
    opacity: 1;
    transform: scale(1, 1);
    transition: opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48);
  }

  .placement-top & {
    transform-origin: bottom;
  }

  .placement-bottom & {
    transform-origin: top;
  }
  `
);

const AnimatedListbox = React.forwardRef(function AnimatedListbox<
  Value extends {},
  Multiple extends boolean
>(
  props: SelectListboxSlotProps<Value, Multiple>,
  ref: React.ForwardedRef<HTMLUListElement>
) {
  const { ...other } = props;
  const popupContext = React.useContext(PopupContext);

  if (popupContext == null) {
    throw new Error(
      "The `AnimatedListbox` component cannot be rendered outside a `Popup` component"
    );
  }

  const verticalPlacement = popupContext.placement.split("-")[0];

  return (
    <CssTransition
      className={`placement-${verticalPlacement}`}
      enterClassName="open"
      exitClassName="closed"
    >
      <Listbox {...other} ref={ref} />
    </CssTransition>
  );
});

const Option = styled(BaseOption)(
  () => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;

  color: var(--Gray-900);
  /* Text sm/Medium */
  font-family: "Roboto Condensed";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    border-radius: 6px;
    background: var(--Primary-100, #D1E0FF);

    /* Shadow */
    box-shadow: 0px 0px 16px 0px rgba(0, 20, 61, 0.08);
  }

  &.${optionClasses.disabled} {
    background: var(--Gray-100);
    color: var(--Gray-500);
  }
  
  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background: var(--Primary-100);
  }

  &:hover:not(.${optionClasses.selected}) {
    border-radius: 6px;
    background: var(--Gray-100);
  }
  `
);

const Popup = styled("div")`
  z-index: 11;
`;

const MenuItem = styled(BaseMenuItem)(
  () => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;

  color: var(--Gray-900);
  /* Text sm/Medium */
  font-family: "Roboto Condensed";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    outline: 'none';
    background-color: 'red';
    color: 'white';
  }

  &:hover {
    border-radius: 6px;
    background: var(--Gray-100);
  }
  `
);
