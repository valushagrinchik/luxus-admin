import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../../controls/Button/Button";
import { EditCategoryFormInputs } from "../../../lib/types";
import {
  useCreateCategoryMutation,
  useGetGroupsQuery,
  useUpdateCategoryMutation,
} from "../../../api/sortsApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaEditCategory } from "../../../lib/validation";

import { CloseIcon } from "../../../controls/icons/CloseIcon";
import { OkIcon } from "../../../controls/icons/OkIcon";
import { TextField } from "../../../controls/TextField";

import styles from "./EditCategoryForm.module.css";

interface EditCategoryFormProps {
  onSubmit: () => void;
  onReset: () => void;
  data: {
    id: number;
    name?: string;
    groupId?: number;
  };
  action: "create" | "update";
}

export const EditCategoryForm = ({
  action,
  onSubmit,
  onReset,
  data,
}: EditCategoryFormProps) => {
  const { data: groups } = useGetGroupsQuery();
  const [update] = useUpdateCategoryMutation();
  const [create] = useCreateCategoryMutation();

  const groupsMap = Object.fromEntries(
    groups?.map((group: any) => [group.id, group.name]) || []
  );

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<EditCategoryFormInputs>({
    resolver: yupResolver(schemaEditCategory),
    defaultValues: {
      groupId: data?.groupId?.toString() || "",
      name: data?.name || "",
    },
  });

  const submit: SubmitHandler<EditCategoryFormInputs> = async (formData) => {
    if (action === "create") {
      await create({
        name: formData.name,
        groupId: +formData.groupId,
      });
    }
    if (action === "update") {
      await update({
        id: data.id,
        name: formData.name,
        groupId: +formData.groupId,
      });
    }
    onSubmit();
  };

  return (
    <form className={styles.form}>
      <h2>{action === "create" ? "Crear" : "Editar"} categoria</h2>

      <Controller
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            select
            label={
              <>
                Grupo <span className={styles.required}>*</span>
              </>
            }
            placeholder="Seleccionar grupo"
            helperText={error ? error.message : null}
            error={!!error}
            onChange={onChange}
            value={value}
            options={groupsMap}
            fullWidth
          />
        )}
        name="groupId"
        control={control}
      />

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
        <Button color="base" onClick={handleSubmit(submit)} disabled={!isValid}>
          <OkIcon width={16} height={16} />
          Guardar
        </Button>
      </div>
    </form>
  );
};
