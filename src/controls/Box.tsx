import { Box as MUIBox, styled, BoxProps } from "@mui/material";

const Box = ({
  direction = "column",
  ...props
}: { direction?: "row" | "column" } & BoxProps) => {
  const StyledBox = styled(MUIBox, { shouldForwardProp: () => true })(
    () => `
			display: flex;
			padding: 16px;
			flex-direction: ${direction};
			align-items: flex-start;
			gap: 16px;
			flex: 1 0 0;
			background: var(--Base-White, #FFF);
			border-radius: 6px;
		`
  );

  return <StyledBox {...props} />;
};
export default Box;
