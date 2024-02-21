import {
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
} from "@mui/base/Button";
import React, { ReactNode } from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

interface ButtonProps extends BaseButtonProps {
  color: "base" | "red" | "green" | "gray" | "transparent";

  icon?: ReactNode;
}
export const Button = React.forwardRef(function MyButton(
  { icon, children, color, className, ...props }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <BaseButton
      ref={ref}
      {...props}
      focusableWhenDisabled={false}
      className={classNames(styles.btn, styles[color], className)}
    >
      {icon}
      {children}
    </BaseButton>
  );
});
