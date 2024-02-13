import React from "react";
import { Input, InputProps, inputClasses } from "@mui/base/Input";
import styled from "@emotion/styled";

export const BaseInput = React.forwardRef(function MyInput(
  { ...props }: InputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <StyledInput
      onChange={(e) => {
        console.log(e, "value");
      }}
      {...props}
      ref={ref}
    ></StyledInput>
  );
});

const StyledInput = styled(Input, { shouldForwardProp: () => true })(
  () => `

    outline: none;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1 0 0;
    align-self: stretch;
    color: var(--Gray-900, #101828);
    /* Text md/Regular */
    font-family: "Roboto Condensed";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    height: 36px;
    border-radius: 6px;
    border: 1px solid var(--Gray-300);
    background: var(--Base-White);
    padding: 6px 12px;

    & input{
      border: none;
      outline: none;
    }

    &.${inputClasses.disabled} {
      border-radius: 6px;
      border: 1px solid var(--Gray-300, #D0D5DD);
      opacity: 0.5;
      background: var(--Primary-50, #EFF4FF);
      color: var(--Base-Black, #000);
      /* Text md/Regular */
      font-family: "Roboto Condensed";
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px; /* 150% */
    }

  `
);
