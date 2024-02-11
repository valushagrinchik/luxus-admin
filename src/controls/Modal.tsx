import * as React from "react";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import classNames from "classnames";

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const StyledModal = styled("div")`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Modal = React.forwardRef(function MyModal(
  { children, ...props }: any,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const slots = {
    root: StyledModal,
    backdrop: StyledBackdrop,
  };

  return (
    <BaseModal ref={ref} slots={slots} {...props}>
      <ModalContent>{children}</ModalContent>
    </BaseModal>
  );
});

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")(
  () => css`
		border-radius: 12px;
		background: var(--Base-White, #FFF);
		display: flex;
		width: 412px;
		padding: 24px 20px 16px 20px;
		flex-direction: column;
		align-items: flex-end;
		gap: 24px;
		outline: none;

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: 'white'
      margin-bottom: 4px;
    }
  `
);
