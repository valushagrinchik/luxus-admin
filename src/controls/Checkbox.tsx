import {
  Checkbox as BaseCheckbox,
  styled,
  checkboxClasses,
  CheckboxProps,
} from "@mui/material";
import { CheckboxCheckedIcon } from "./icons/CheckboxCheckedIcon";

export const StyledCheckbox = styled(BaseCheckbox, {
  shouldForwardProp: () => true,
})(
  () => `
		width: 16px;
		height: 16px;

		-moz-appearance: none;
		-webkit-appearance: none;
		-o-appearance: none;
		justify-content: center;
		align-items: center;
		align-self: stretch;
		border-radius: 4.8px;
		border: 0.8px solid var(--Gray-300, #d0d5dd);
		background: var(--Base-White, #fff);
		width: 16px;
		height: 16px;
		position: relative;
		margin: 0;

		& input{
			-moz-appearance:none;
			-webkit-appearance:none;
			-o-appearance:none;
			border: none;
		}

		&:hover{
			background-color: transparent;
		}

		&.${checkboxClasses.checked} {
			border-radius: 4.8px;
			background: var(--Primary-800, #0040C1);
		}
  `
);

export const Checkbox = (props: CheckboxProps) => (
  <StyledCheckbox
    {...props}
    icon={<></>}
    checkedIcon={<CheckboxCheckedIcon />}
  />
);
