import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../../controls/Button/Button";
import { Category, EditCategoryFormInputs } from "../../../lib/types";
import {
  useCreateCategoryMutation,
  useGetGroupsQuery,
  useUpdateCategoryMutation,
} from "../../../api/sortsApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaEditCategory } from "../../../lib/validation";

import { CloseIcon } from "../../../controls/icons/CloseIcon";
import { OkIcon } from "../../../controls/icons/OkIcon";
import { Select } from "../../../controls/Select";
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
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm<EditCategoryFormInputs>({
    resolver: yupResolver(schemaEditCategory),
    defaultValues: {
      name: data?.name,
      groupId: data?.groupId?.toString() || "",
    },
  });
  console.log(getValues(), data);

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
  const groupId = watch("groupId");

  return (
    <form className={styles.form}>
      <h2>{action === "create" ? "Crear" : "Editar"} categoria</h2>
      <div>
        <label htmlFor="groupId">
          Grupo <span className={styles.required}>*</span>
        </label>
        <Select
          {...register("groupId")}
          options={groupsMap}
          placeholder="Seleccionar grupo"
          value={
            groupId && Object.keys(groupsMap).includes(groupId) ? groupId : ""
          }
        />
        {errors.groupId && (
          <span className={styles.required}>{errors.groupId.message}</span>
        )}
      </div>
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
        <Button color="base" onClick={handleSubmit(submit)} disabled={!isValid}>
          <OkIcon width={16} height={16} />
          Guardar
        </Button>
      </div>
    </form>
  );
};
