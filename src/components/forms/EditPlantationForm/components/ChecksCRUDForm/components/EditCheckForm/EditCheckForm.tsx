import { Controller, useForm } from "react-hook-form";
import { TextField } from "../../../../../../../controls/TextField";
import { Button } from "../../../../../../../controls/Button/Button";
import { CloseIcon } from "../../../../../../../controls/icons/CloseIcon";
import { OkIcon } from "../../../../../../../controls/icons/OkIcon";
import { EditCheckInput, Mode } from "../../../../interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaAddCheck } from "../../../../../../../lib/validation";
import { ChangeEvent, useState } from "react";
import { Document } from "../../../../../../../api/interfaces";
import { DocumentFileUpload } from "../../../../../../../controls/DocumentFileUpload/DocumentFileUpload";

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
  legalEntitiesMap: Record<string, string>;
  mode: Mode;
}) => {
  const disabled = mode === Mode.preview;
  const [document, setDocument] = useState<Document | null>(data.document);

  const { control, handleSubmit, watch, setValue, getValues } =
    useForm<EditCheckInput>({
      resolver: yupResolver(schemaAddCheck),

      defaultValues: {
        id: "",
        name: data.name || "",
        beneficiary: "",
        favourite: false,
      },
      values: {
        id: data.id,
        name: data.name || "",
        favourite: data.favourite || false,
        beneficiary: data.beneficiary || "",
        plantationLegalEntityId: data.plantationLegalEntityId || "",
      },
    });

  const name = watch("name");
  const beneficiary = watch("beneficiary");
  const [showFileField, setShowFileField] = useState(name !== beneficiary);

  const validate = () => {
    const values = getValues();

    return (
      values.name &&
      values.beneficiary &&
      (values.name !== values.beneficiary ? document : true)
    );
  };

  const isValid = validate();

  const submit = (data: any) => {
    onSubmit({ ...data, document });
  };

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
              const id = (event.target as any).value;
              setValue("name", legalEntitiesMap[id]);
              setValue("beneficiary", legalEntitiesMap[id]);
              setDocument(null);
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
              if ((event.target as any).value !== name) {
                setShowFileField(true);
              } else {
                setShowFileField(false);
              }
              onChange(event);
            }}
            value={value}
            fullWidth
            placeholder="Indicar Páguese a la orden de"
          />
        )}
      />
      {showFileField && (
        <DocumentFileUpload
          value={document}
          disabled={disabled}
          onChange={setDocument}
        />
      )}

      <div className={styles.actions}>
        <Button color="gray" onClick={() => onReset()}>
          <CloseIcon width={16} height={16} />
          Salir
        </Button>
        <Button color="base" onClick={handleSubmit(submit)} disabled={!isValid}>
          <OkIcon width={16} height={16} />
          Guardar
        </Button>
      </div>
    </div>
  );
};
