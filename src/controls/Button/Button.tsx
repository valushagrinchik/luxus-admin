import {
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
} from "@mui/base/Button";
import React, { ReactNode } from "react";
import { OkIcon } from "../icons/OkIcon";
import { CloseIcon } from "../icons/CloseIcon";
import styles from "./Button.module.css";
import { PlusIcon } from "../icons/PlusIcon";


interface ButtonProps extends BaseButtonProps {
  appearance: "approve" | "refuse" | "add" | "base";
  icon?: ReactNode
}
export const Button = React.forwardRef(function MyButton(
  {icon, children, appearance, ...props }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const propsByAppearance = ((appearance) => {
    switch (appearance) {
      case "approve": {
        return {
          className: styles.ok_btn,
          icon: <OkIcon width={16} height={16} />,
        };
      }
      case "refuse": {
        return {
          className: styles.refuse_btn,
          icon: <CloseIcon width={16} height={16} />,
        };
      }
      case "add": {
        return {
          className: styles.add_btn,
          icon: <PlusIcon width={16} height={16} />,
        };
      }
      case "base": {
        return {
          className: styles.add_btn,
        };
      }
    }
  })(appearance);

  return (
    <BaseButton ref={ref} className={propsByAppearance?.className} {...props}>
      {icon || propsByAppearance?.icon}
      {children}
    </BaseButton>
  );
});
