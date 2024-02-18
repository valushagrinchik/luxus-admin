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
  // const propsByAppearance = ((appearance) => {
  //   switch (appearance) {
  //     case "approve": {
  //       return {
  //         className: styles.ok_btn,
  //         icon: <OkIcon width={16} height={16} />,
  //       };
  //     }
  //     case "refuse": {
  //       return {
  //         className: styles.refuse_btn,
  //         icon: <CloseIcon width={16} height={16} />,
  //       };
  //     }
  //     case "add": {
  //       return {
  //         className: styles.add_btn,
  //         icon: <PlusIcon width={16} height={16} />,
  //       };
  //     }
  //     case "base": {
  //       return {
  //         className: styles.add_btn,
  //       };
  //     }
  //     case "red": {
  //       return {
  //         className: styles.red_btn,
  //       };
  //     }
  //     case "transparent": {
  //       return {
  //         className: styles.transparent_btn,
  //       };
  //     }
  //   }
  // })(color);

  return (
    <BaseButton
      ref={ref}
      {...props}
      className={classNames(
        styles.btn,
        styles[color],
        className
      )}
    >
      {icon}
      {children}
    </BaseButton>
  );
});
