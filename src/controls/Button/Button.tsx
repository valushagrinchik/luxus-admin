import {
  Button as ButtonBase,
} from "@mui/base/Button";

import React, { ReactNode } from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

type CustomButtonProps = {
  color: "base" | "red" | "green" | "gray" | "transparent";
  icon?: ReactNode;
  className?: string;
};
export const Button = React.forwardRef(function MyButton(
  { icon, children, color, className, ...props }: any,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <ButtonBase
      ref={ref}
      {...props}
      autoFocus={false}
      focusableWhenDisabled={false}
      className={classNames(styles.btn, styles[color], className)}
    >
      {icon}
      {children}
    </ButtonBase>
  );
});
