import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../../controls/Button/Button";
import {
  useCreateGroupMutation,
  useUpdateGroupMutation,
} from "../../../api/sortsApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaEditGroup } from "../../../lib/validation";
import { OkIcon } from "../../../controls/icons/OkIcon";
import { CloseIcon } from "../../../controls/icons/CloseIcon";
import { TextField } from "../../../controls/TextField";

import styles from "./EditGroupForm.module.css";
import { Mode } from "../../../lib/types";

type EditGroupFormInputs = {
  name: string;
};

interface EditGroupFormProps {
  onSubmit: () => void;
  onReset: () => void;
  data: any;
  mode: Mode;
}

export const EditGroupForm = ({
  onSubmit,
  onReset,
  data,
  mode,
}: EditGroupFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm<EditGroupFormInputs>({
    resolver: yupResolver(schemaEditGroup),
    defaultValues: {
      name: data?.name || "",
    },
  });

  const [create] = useCreateGroupMutation();
  const [update] = useUpdateGroupMutation();

  const submit: SubmitHandler<EditGroupFormInputs> = async (formData) => {
    if (mode === Mode.create) {
      await create(formData);
    }
    if (mode === Mode.edit) {
      await update({ ...formData, id: data.id });
    }
    onSubmit();
  };

  return (
    <div className={styles.form_container}>
      <form className={styles.form}>
        <h2>{mode === Mode.create ? "Crear" : "Editar"} grupo</h2>

        <Controller
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label={
                <>
                  Nombre <span className={styles.required}>*</span>
                </>
              }
              placeholder="Indicar Nombre"
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
            />
          )}
          name="name"
          control={control}
        />

        <div className={styles.actions}>
          <Button color="gray" onClick={() => onReset()}>
            <CloseIcon width={16} height={16} />
            Salir
          </Button>
          <Button
            color="base"
            onClick={handleSubmit(submit)}
            disabled={!isDirty || !isValid}
          >
            <OkIcon width={16} height={16} />
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
};
