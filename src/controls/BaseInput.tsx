import React from "react";
import { Input } from "@mui/base/Input";

export const BaseInput = React.forwardRef(function MySelect(
  props: any,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <Input
      ref={ref}
      slotProps={{ input: { className: "base_input" } }}
      {...props}
    ></Input>
  );
});
