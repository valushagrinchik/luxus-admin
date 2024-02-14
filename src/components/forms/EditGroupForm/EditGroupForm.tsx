import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../../controls/Button/Button";
import {
  useCreateGroupMutation,
  useUpdateGroupMutation,
} from "../../../api/sortsApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaEditGroup } from "../../../lib/validation";

import styles from "./EditGroupForm.module.css";
import { OkIcon } from "../../../controls/icons/OkIcon";
import { CloseIcon } from "../../../controls/icons/CloseIcon";
import { TextField } from "../../../controls/TextField";

type EditGroupFormInputs = {
  name: string;
};

interface EditGroupFormProps {
  onSubmit: () => void;
  onReset: () => void;
  data: any;
  action: "create" | "update";
}

export const EditGroupForm = ({
  onSubmit,
  onReset,
  data,
  action,
}: EditGroupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EditGroupFormInputs>({
    resolver: yupResolver(schemaEditGroup),
    defaultValues: {
      name: data?.name || "",
    },
  });

  const [create] = useCreateGroupMutation();
  const [update] = useUpdateGroupMutation();

  const submit: SubmitHandler<EditGroupFormInputs> = async (formData) => {
    if (action === "create") {
      await create(formData);
    }
    if (action === "update") {
      await update({ ...formData, id: data.id });
    }
    onSubmit();
  };

  return (
    <div className={styles.form_container}>
      <form className={styles.form}>
        <h2>{action === "create" ? "Crear" : "Editar"} grupo</h2>
        <div>
          <label htmlFor="name">
            Nombre <span className={styles.required}>*</span>
          </label>
          <TextField
            {...register("name")}
            style={{ width: "100%" }}
            placeholder="Indicar Nombre"
          />
          {errors.name && (
            <span className={styles.required}>{errors.name.message}</span>
          )}
        </div>
        <div className={styles.actions}>
          <Button color="gray" onClick={() => onReset()}>
            <CloseIcon width={16} height={16} />
            Salir
          </Button>
          <Button
            color="base"
            onClick={handleSubmit(submit)}
            disabled={!isValid}
          >
            <OkIcon width={16} height={16} />
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
};
