import { Box, styled } from "@mui/material";

const StyledBox = styled(Box, { shouldForwardProp: () => true })(
  () => `
		display: flex;
		padding: 16px;
		flex-direction: column;
		align-items: flex-start;
		gap: 16px;
		flex: 1 0 0;
		background: var(--Base-White, #FFF);
		border-radius: 6px;
  `
);
export default StyledBox;
