import {
  Controller,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { TextField } from "../../../../../../../controls/TextField";
import { Button } from "../../../../../../../controls/Button/Button";
import { CloseIcon } from "../../../../../../../controls/icons/CloseIcon";
import { OkIcon } from "../../../../../../../controls/icons/OkIcon";
import { EditBaseInput, EditCheckInput } from "../../../../interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaAddCheck } from "../../../../../../../lib/validation";
import { v4 as uuid } from "uuid";

import styles from "./EditCheckForm.module.css";
import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { AddFileIcon } from "../../../../../../../controls/icons/AddFileIcon";
import { InputAdornment } from "@mui/material";
import { CloseIconSmall } from "../../../../../../../controls/icons/CloseIconSmall";

export const EditCheckForm = ({
  onReset,
  onSubmit,
  data = {},
  legalEntitiesMap,
}: {
  onReset: () => void;
  onSubmit: (data: EditCheckInput) => void;
  data?: any;
  legalEntitiesMap: EditBaseInput;
}) => {
  const action =
    Object.values(data).filter((value) => !!value).length > 0
      ? "update"
      : "create";

  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  const [showFileField, setShowFileField] = useState(false);

  const {
    control,
    handleSubmit,
    formState,
    watch,
    setValue,
    unregister,
    resetField,
  } = useForm<EditCheckInput>({
    resolver: yupResolver(schemaAddCheck),
    defaultValues: {
      id: data.id || uuid(),
      name: data.name || "",
      favourite: data.favourite || false,
      beneficiary: data.beneficiary || "",
      documentPath: data.documentPath,
    },
  });

  const name = watch("name");
  const beneficiary = watch("beneficiary");

  useEffect(() => {
    if (name) {
      setValue("beneficiary", name, { shouldValidate: true });
    }
  }, [name]);

  // useEffect(() => {
  //   if (beneficiary !== name) {
  //     // TODO: add file field
  //   }
  // }, [beneficiary]);

  const submit = (data: EditCheckInput) => {
    onSubmit(data);
  };

  return (
    <div className={styles.form}>
      <h2>{action === "create" ? "Crear" : "Editar"}</h2>

      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label={
              <>
                Razón Social <span className={styles.required}>*</span>
              </>
            }
            select
            options={legalEntitiesMap}
            helperText={error ? error.message : null}
            error={!!error}
            onChange={(event: ChangeEvent) => {
              setValue("documentPath", null);
              setShowFileField(false);
              onChange(event);
            }}
            value={value}
            fullWidth
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
              console.log(value, "value");
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
                                className={styles.clear_btn}
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
              if (!hiddenFileInput.current) {
                return;
              }
              hiddenFileInput.current.click();
            }}
          >
            <AddFileIcon />
            Subir
          </Button>
          <input
            type="file"
            ref={hiddenFileInput}
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
          onClick={handleSubmit(submit)}
          disabled={!formState.isValid}
        >
          <OkIcon width={16} height={16} />
          Guardar
        </Button>
      </div>
    </div>
  );
};
