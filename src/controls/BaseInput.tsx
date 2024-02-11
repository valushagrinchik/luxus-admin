import React from "react";
import { Input, InputProps } from "@mui/base/Input";

export const BaseInput = React.forwardRef(function MySelect(
  props: InputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <Input
      onChange={(e) => {console.log(e, 'value')}}
      slotProps={{ input: { className: "base_input" } }}
      {...props}
      ref={ref}
    ></Input>
  );
});
