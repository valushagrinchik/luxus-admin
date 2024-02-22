import fileDownload from "js-file-download";
import { useAuth } from "../lib/auth";
import { Button } from "./Button/Button";
import { ExcelIcon } from "./icons/ExcelIcon";
import { today } from "../lib/utils";

export const ExcelDownloadBtn = ({
  disabled,
  url,
  prefix,
}: {
  disabled: boolean;
  url: string;
  prefix: string;
}) => {
  const { user } = useAuth();

  const handleDownload = async () => {
    const filename = `${prefix}_${today().replace("/", "_")}.xlsx`;
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      });

      const blob = await response.blob();
      fileDownload(blob, filename);
    } catch (error) {
      console.log("There was an error", error);
    }
  };
  return (
    <Button
      disabled={disabled}
      color="transparent"
      style={{ padding: "8px", height: "36px" }}
      onClick={handleDownload}
    >
      <ExcelIcon
        width={24}
        height={24}
        color={disabled ? "var(--Gray-400)" : "var(--Primary-800)"}
      />
    </Button>
  );
};
