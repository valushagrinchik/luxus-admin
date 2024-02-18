import { Controller, useForm } from "react-hook-form";
import { TextField } from "../../../../../../../controls/TextField";
import { Button } from "../../../../../../../controls/Button/Button";
import { CloseIcon } from "../../../../../../../controls/icons/CloseIcon";
import { OkIcon } from "../../../../../../../controls/icons/OkIcon";
import { EditCheckInput } from "../../../../interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaAddCheck } from "../../../../../../../lib/validation";
import { v4 as uuid } from "uuid";

import styles from "./EditCheckForm.module.css";

export const EditCheckForm = ({
  onReset,
  onSubmit,
  data = {},
}: {
  onReset: () => void;
  onSubmit: (data: EditCheckInput) => void;
  data?: any;
}) => {
  const action =
    Object.values(data).filter((value) => !!value).length > 0
      ? "update"
      : "create";

  const { control, handleSubmit, formState } = useForm<EditCheckInput>({
    resolver: yupResolver(schemaAddCheck),
    defaultValues: {
      id: data.id || uuid(),
      name: data.name || "",
      favourite: data.favourite || false,
      beneficiary: data.beneficiary || "",
      documentPath: data.documentPath || "",
    },
  });

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
            helperText={error ? error.message : null}
            error={!!error}
            onChange={onChange}
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
            onChange={onChange}
            value={value}
            fullWidth
            placeholder="Indicar Páguese a la orden de"
          />
        )}
      />
      {/* TODO: add file 

      placeholder: La letra de cambio a un tercero
      btn title: Subir
      
      */}

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
