import { Controller, useForm } from "react-hook-form";
import { TextField } from "../../../../../../../controls/TextField";
import { Button } from "../../../../../../../controls/Button/Button";
import { CloseIcon } from "../../../../../../../controls/icons/CloseIcon";
import { OkIcon } from "../../../../../../../controls/icons/OkIcon";
import { PlantationDepartmanet } from "../../../../../../../lib/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaAddPlantationContact } from "../../../../../../../lib/validation";
import { v4 as uuid } from "uuid";
import { EditContactInput } from "../../../../interfaces";

import L18nEs from "../../../../../../../lib/l18n";
import styles from "./EditContactForm.module.css";

export const EditContactForm = ({
  onReset,
  onSubmit,
  data = {},
  positions = L18nEs.constants.salesPositions,
}: {
  onReset: () => void;
  onSubmit: (data: EditContactInput) => void;
  data?: any;
  positions?: Record<string, string>;
}) => {
  const action =
    Object.values(data).filter((value) => !!value).length > 0
      ? "update"
      : "create";

  const { control, handleSubmit } = useForm<EditContactInput>({
    resolver: yupResolver(schemaAddPlantationContact),
    defaultValues: {
      id: data.id || uuid(),
      name: data.name || "",
      email: data.email || "",
      whatsapp: data.whatsapp || "",
      telegram: data.telegram || "",
      skype: data.skype || "",
      position: data.position || "",
      department: PlantationDepartmanet.SALES,
    },
  });

  const submit = (data: EditContactInput) => {
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
                  Nombre <span className={styles.required}>*</span>
                </>
              }
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              placeholder="Indicar Nombre"
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label={
                <>
                  Email <span className={styles.required}>*</span>
                </>
              }
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              placeholder="Indicar Email "
            />
          )}
        />
      </div>
      <div className={styles.row}>
        <Controller
          name="whatsapp"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label={
                <>
                  Whatsapp <span className={styles.required}>*</span>
                </>
              }
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              placeholder="Indicar Whatsapp"
            />
          )}
        />
        <Controller
          name="telegram"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label={
                <>
                  Telegram <span className={styles.required}>*</span>
                </>
              }
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              placeholder="Indicar Telegram"
            />
          )}
        />
      </div>
      <div className={styles.row}>
        <Controller
          name="skype"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label={
                <>
                  Skype <span className={styles.required}>*</span>
                </>
              }
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              placeholder="Indicar Skype"
            />
          )}
        />
        <Controller
          name="position"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label={
                <>
                  Cargo <span className={styles.required}>*</span>
                </>
              }
              helperText={error ? error.message : null}
              error={!!error}
              select
              options={positions}
              onChange={onChange}
              value={value}
              fullWidth
              placeholder="Seleccionar Cargo "
            />
          )}
        />
      </div>
      <div className={styles.actions}>
        <Button color="gray" onClick={() => onReset()}>
          <CloseIcon width={16} height={16} />
          Salir
        </Button>
        <Button color="base" onClick={handleSubmit(submit)}>
          <OkIcon width={16} height={16} />
          Guardar
        </Button>
      </div>
    </div>
  );
};
