import { useRef, useState } from "react";
import { Button } from "../Button/Button";
import { TextField } from "../TextField";
import { AddFileIcon } from "../icons/AddFileIcon";
import {
  useRemoveFileMutation,
  useUploadFileMutation,
} from "../../api/documentsApi";
import { Document } from "../../api/interfaces";
import { InputAdornment } from "@mui/material";
import { CloseIconSmall } from "../icons/CloseIconSmall";
import { DownloadBtn } from "../DownloadBtn";

export const DocumentFileUpload = ({
  value,
  disabled = false,
  onChange,
}: {
  value: Document | null;
  disabled?: boolean;
  onChange: (document: Document | null) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [document, setDocument] = useState<Document | null>(value);

  const [uploadDocument] = useUploadFileMutation();
  const [removeDocument] = useRemoveFileMutation();

  const handleFileChange = async (event: any) => {
    try {
      await handleFileRemove();
    } catch (error) {
      console.log(error);
    }
    const res: any = await uploadDocument(event.target.files[0]);

    if (res.data) {
      setDocument(res.data || null);
      onChange(res.data || null);
    }
  };

  const handleFileRemove = async () => {
    if (!document) {
      return;
    }
    await removeDocument(document.id);
    setDocument(null);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}
    >
      <TextField
        value={document?.name || ""}
        fullWidth
        disabled={disabled}
        placeholder="La letra de cambio a un tercero"
        onKeyDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        icon={
          document ? (
            <DownloadBtn
              url={`/api/upload/${document.id}`}
              filename={document.name}
              contentType=""
            />
          ) : null
        }
        InputProps={{
          sx: {
            ".MuiInputBase-input": {
              cursor: "default",
              caretColor: "transparent",
              userSelect: "none",
            },
          },
          ...(document && !disabled
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <CloseIconSmall
                      style={{
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                      onClick={handleFileRemove}
                    />
                  </InputAdornment>
                ),
              }
            : {}),
        }}
      />

      <Button
        color="base"
        disabled={disabled}
        onClick={() => {
          if (!fileInputRef.current) {
            return;
          }
          fileInputRef.current.click();
        }}
      >
        <AddFileIcon />
        Subir
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};
