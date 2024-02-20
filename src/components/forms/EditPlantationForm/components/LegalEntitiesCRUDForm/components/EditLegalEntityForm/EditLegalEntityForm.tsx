import { Controller, useForm, useFormContext } from "react-hook-form";
import { TextField } from "../../../../../../../controls/TextField";
import { Button } from "../../../../../../../controls/Button/Button";
import { CloseIcon } from "../../../../../../../controls/icons/CloseIcon";
import { OkIcon } from "../../../../../../../controls/icons/OkIcon";
import { EditLegalEntityInput, Mode } from "../../../../interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaAddPlantationLegalEntity } from "../../../../../../../lib/validation";
import styles from "./EditLegalEntityForm.module.css";
import { CountryCode } from "../../../../../../../lib/types";

export const EditLegalEntityForm = ({
  data = {},
  onReset,
  onSubmit,
  mode,
}: {
  data?: any;
  onReset: () => void;
  onSubmit: (data: any) => void;
  mode: Mode;
}) => {
  const { watch, getValues } = useFormContext();

  const country = watch("generalInfo.country");

  const {
    control,
    handleSubmit,
    formState,
    getValues: getCurrentValues,
  } = useForm<EditLegalEntityInput>({
    resolver: yupResolver(schemaAddPlantationLegalEntity),
    defaultValues: {
      id: "",
      name: "",
      code: "",
      legalAddress: "",
      actualAddress: "",
      plantationId: "",
    },
    values: {
      id: data.id,
      name: data.name || "",
      code: data.code || "",
      legalAddress: data.legalAddress || "",
      actualAddress: data.actualAddress || "",
      plantationId: data.plantationId || getValues().generalInfo.id,
    },
  });

  const submit = (data: EditLegalEntityInput) => {
    onSubmit(data);
  };

  return (
    <div className={styles.form}>
      <h2>
        {mode === Mode.create ? "Crear" : mode === Mode.edit ? "Editar" : ""}
      </h2>
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
                  {country === CountryCode.ec ? "Ruc o cédula" : "NIT"}
                  <span className={styles.required}>*</span>
                </>
              }
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              placeholder={`Indicar ${
                country === CountryCode.ec ? "Ruc o cédula" : "NIT"
              }`}
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
