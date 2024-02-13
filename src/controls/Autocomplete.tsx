import styled from "@emotion/styled";
import { Autocomplete as BaseAutocomplete } from "@mui/material";
import React from "react";

const StyledAutocomplete = styled(BaseAutocomplete, {
  shouldForwardProp: () => true,
})(() => ``);

export const Autocomplete = React.forwardRef(function MyAutocomplete(
  { ...props }: any,
  ref: React.ForwardedRef<unknown>
) {
  return (
    <StyledAutocomplete
      // onChange={(e) => {
      //   console.log(e, "value");
      // }}
      {...props}
      ref={ref}
    ></StyledAutocomplete>
  );
});
