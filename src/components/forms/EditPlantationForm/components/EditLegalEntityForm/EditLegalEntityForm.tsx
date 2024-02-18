import { Controller, useForm } from "react-hook-form";
import { TextField } from "../../../../../controls/TextField";
import { Button } from "../../../../../controls/Button/Button";
import { CloseIcon } from "../../../../../controls/icons/CloseIcon";
import { OkIcon } from "../../../../../controls/icons/OkIcon";
import { EditLegalEntityInput } from "../../interfaces";
import { v4 as uuid } from "uuid";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaAddPlantationLegalEntity } from "../../../../../lib/validation";
import styles from "./EditLegalEntityForm.module.css";

export const EditLegalEntityForm = ({
  data = {},
  onReset,
  onSubmit,
}: {
  data?: any;
  onReset: () => void;
  onSubmit: (data: any) => void;
}) => {
  const action =
    Object.values(data).filter((value) => !!value).length > 0
      ? "update"
      : "create";

  const { control, handleSubmit, formState } = useForm<EditLegalEntityInput>({
    resolver: yupResolver(schemaAddPlantationLegalEntity),
    defaultValues: {
      id: data.id || uuid(),
      name: data.name || "",
      code: data.code || "",
      legalAddress: data.legalAddress || "",
      actualAddress: data.actualAddress || "",
    },
  });

  const submit = (data: EditLegalEntityInput) => {
    onSubmit(data);
  };

  return (
    <div className={styles.form}>
      <h2>{action === "create" ? "Crear" : "Editar"}</h2>
      <div className={styles.row}>
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
              placeholder="Indicar Razón Social"
            />
          )}
        />
        <Controller
          name="code"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label={
                <>
                  Ruc o cédula <span className={styles.required}>*</span>
                </>
              }
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              placeholder="Indicar Ruc o cédula"
            />
          )}
        />
      </div>
      <Controller
        name="legalAddress"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label={
              <>
                Domicilio tributario <span className={styles.required}>*</span>
              </>
            }
            helperText={error ? error.message : null}
            error={!!error}
            onChange={onChange}
            value={value}
            fullWidth
            placeholder="Indicar Domicilio tributario"
          />
        )}
      />
      <Controller
        name="actualAddress"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label={
              <>
                Domicilio real <span className={styles.required}>*</span>
              </>
            }
            helperText={error ? error.message : null}
            error={!!error}
            onChange={onChange}
            value={value}
            fullWidth
            placeholder="Indicar Domicilio real"
          />
        )}
      />
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
