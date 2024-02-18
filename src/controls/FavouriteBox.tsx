import { FavouriteIcon } from "./icons/FavouriteIcon";

export const FavouriteBox = ({
  checked,
  onClick,
}: {
  checked: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        borderRadius: "6px",
        background: checked ? "#FFAE50" : "var(--Gray-300, #D0D5DD)",
        width: "18px",
        height: "18px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FavouriteIcon color="white" />
    </div>
  );
};
