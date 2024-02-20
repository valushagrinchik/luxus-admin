import { Controller, useForm } from "react-hook-form";
import { TextField } from "../../../../../../../controls/TextField";
import { Button } from "../../../../../../../controls/Button/Button";
import { CloseIcon } from "../../../../../../../controls/icons/CloseIcon";
import { OkIcon } from "../../../../../../../controls/icons/OkIcon";
import { EditBaseInput, EditCheckInput, Mode } from "../../../../interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaAddCheck } from "../../../../../../../lib/validation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { AddFileIcon } from "../../../../../../../controls/icons/AddFileIcon";
import { InputAdornment } from "@mui/material";
import { CloseIconSmall } from "../../../../../../../controls/icons/CloseIconSmall";
import styles from "./EditCheckForm.module.css";

export const EditCheckForm = ({
  onReset,
  onSubmit,
  data = {},
  legalEntitiesMap,
  mode,
}: {
  onReset: () => void;
  onSubmit: (data: EditCheckInput) => void;
  data?: any;
  legalEntitiesMap: EditBaseInput;
  mode: Mode;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showFileField, setShowFileField] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { isValid: isValidForm, errors },
  } = useForm<EditCheckInput>({
    resolver: yupResolver(schemaAddCheck),

    defaultValues: {
      id: "",
      name: "",
      beneficiary: "",
      favourite: false,
      // documentPath: data.documentPath,
    },
    values: {
      id: data.id,
      name: data.name || "",
      favourite: data.favourite || false,
      beneficiary: data.beneficiary || "",
      documentPath: data.documentPath,
      plantationLegalEntityId: data.plantationLegalEntityId || "",
    },
  });

  const name = watch("plantationLegalEntityId");
  watch("beneficiary");
  watch("documentPath");

  useEffect(() => {
    if (name) {
      setValue("name", legalEntitiesMap[name]);
      setValue("beneficiary", legalEntitiesMap[name]);
    }
  }, [name, setValue, legalEntitiesMap]);

  const validate = () => {
    const values = getValues();

    return (
      values.name &&
      values.beneficiary &&
      (values.name !== values.beneficiary ? values.documentPath : true)
    );
  };

  const isValid = validate();

  return (
    <div className={styles.form}>
      <h2>
        {mode === Mode.create ? "Crear" : mode === Mode.edit ? "Editar" : ""}
      </h2>

      <Controller
        name="plantationLegalEntityId"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label={
              <>
                Razón Social <span className={styles.required}>*</span>
              </>
            }
            select
            helperText={error ? error.message : null}
            error={!!error}
            onChange={(event: ChangeEvent) => {
              setValue("documentPath", null);
              setShowFileField(false);
              onChange(event);
            }}
            value={value}
            fullWidth
            options={legalEntitiesMap}
            placeholder="Indicar Razón social"
          />
        )}
      />
      <Controller
        name="beneficiary"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label={
              <>
                Páguese a la orden de <span className={styles.required}>*</span>
              </>
            }
            helperText={error ? error.message : null}
            error={!!error}
            onChange={(event: ChangeEvent) => {
              setShowFileField((event.target as any).value !== name);
              onChange(event);
            }}
            value={value}
            fullWidth
            placeholder="Indicar Páguese a la orden de"
          />
        )}
      />
      {showFileField && (
        <div className={styles.row}>
          <Controller
            name="documentPath"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <TextField
                  helperText={error ? error.message : null}
                  error={!!error}
                  onChange={onChange}
                  value={value?.name || ""}
                  fullWidth
                  placeholder="La letra de cambio a un tercero"
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  InputProps={
                    !!value
                      ? {
                          endAdornment: (
                            <InputAdornment position="end">
                              <CloseIconSmall
                                style={{
                                  cursor: "pointer",
                                  marginRight: "5px",
                                }}
                                onClick={() => {
                                  setValue("documentPath", null);
                                }}
                              />
                            </InputAdornment>
                          ),
                        }
                      : {}
                  }
                />
              );
            }}
          />
          <Button
            color="base"
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
            onChange={(event: any) => {
              const fileUploaded = event.target.files[0];
              setValue("documentPath", fileUploaded);
            }}
          />
        </div>
      )}

      <div className={styles.actions}>
        <Button color="gray" onClick={() => onReset()}>
          <CloseIcon width={16} height={16} />
          Salir
        </Button>
        <Button
          color="base"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          <OkIcon width={16} height={16} />
          Guardar
        </Button>
      </div>
    </div>
  );
};
