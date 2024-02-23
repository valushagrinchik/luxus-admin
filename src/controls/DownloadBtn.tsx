import fileDownload from "js-file-download";
import { useAuth } from "../lib/auth";
import { Button } from "./Button/Button";
import { ExcelIcon } from "./icons/ExcelIcon";
import { today } from "../lib/utils";
import React, { ReactNode } from "react";
import { DownloadIcon } from "./icons/DownloadIcon";

type DownloadBtnProps = {
  disabled?: boolean;
  url: string;
  filename: string;
  icon?: ReactNode;
  contentType: string;
};
export const DownloadBtn = ({
  disabled,
  url,
  filename,
  contentType,
  icon,
}: DownloadBtnProps) => {
  const { user } = useAuth();
  const handleDownload = async () => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          "Content-Type": contentType,
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
      {icon || (
        <DownloadIcon
          width={16}
          height={16}
          color={disabled ? "var(--Gray-400)" : "var(--Primary-800)"}
        />
      )}
    </Button>
  );
};

const withExcel =
  (Component: React.FC<DownloadBtnProps>) =>
  (props: { prefix: string; disabled: boolean; url: string }) => {
    const { disabled, prefix } = props;
    const icon = (
      <ExcelIcon
        width={24}
        height={24}
        color={disabled ? "var(--Gray-400)" : "var(--Primary-800)"}
      />
    );
    const filename = `${prefix}_${today().replace("/", "_")}.xlsx`;
    const contentType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    return (
      <Component
        {...props}
        icon={icon}
        filename={filename}
        contentType={contentType}
      />
    );
  };

export const ExcelDownloadBtn = withExcel(DownloadBtn);
