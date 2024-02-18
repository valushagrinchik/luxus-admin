import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../../controls/Button/Button";
import { EditSortFormInputs } from "../../../lib/types";
import {
  useCreateSortMutation,
  useGetCategoriesQuery,
  useGetGroupsQuery,
  useUpdateSortMutation,
} from "../../../api/sortsApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaEditSort } from "../../../lib/validation";
import { CloseIcon } from "../../../controls/icons/CloseIcon";
import { OkIcon } from "../../../controls/icons/OkIcon";
import { TextField } from "../../../controls/TextField";
import { Controller } from "react-hook-form";

import styles from "./EditSortForm.module.css";

interface EditSortFormProps {
  onSubmit: () => void;
  onReset: () => void;
  data: {
    id: number;
    name?: string;
    groupId?: number;
    categoryId?: number;
  };
  action: "create" | "update";
}

export const EditSortForm = ({
  action,
  onSubmit,
  onReset,
  data,
}: EditSortFormProps) => {
  const [update] = useUpdateSortMutation();
  const [create] = useCreateSortMutation();
  const {
    handleSubmit,
    control,
    resetField,
    formState: { isValid },
    watch,
  } = useForm<EditSortFormInputs>({
    resolver: yupResolver(schemaEditSort),
    defaultValues: {
      name: data?.name || "",
      groupId: data?.groupId?.toString() || "",
      categoryId: data?.categoryId?.toString() || "",
    },
  });

  const groupId = watch("groupId");

  useEffect(() => {
    resetField("categoryId");
  }, [groupId]);

  const { data: groups } = useGetGroupsQuery();
  const { data: categories } = useGetCategoriesQuery(
    groupId
      ? {
          groupId: +groupId,
        }
      : undefined,
    { skip: !groupId }
  );

  const groupsMap = Object.fromEntries(
    groups?.map((group: any) => [group.id, group.name]) || []
  );

  const categoriesMap = Object.fromEntries(
    categories?.map((cat) => [cat.id, cat.name]) || []
  );

  const submit: SubmitHandler<EditSortFormInputs> = async (formData) => {
    if (action === "create") {
      await create({
        name: formData.name,
        categoryId: +formData.categoryId,
      });
    }
    if (action === "update") {
      await update({
        id: data.id,
        name: formData.name,
        categoryId: +formData.categoryId,
      });
    }
    onSubmit();
  };

  if (!categories?.length && !groups?.length) {
    return <></>;
  }

  return (
    <form className={styles.form}>
      <h2>{action === "create" ? "Crear" : "Editar"} variedad</h2>
      <div className={styles.fields}>
        <TextField label="Número" disabled value={data.id} fullWidth />

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
              select
              label={
                <>
                  Categoria <span className={styles.required}>*</span>
                </>
              }
              placeholder="Seleccionar categoria"
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              disabled={!groupId}
              options={categoriesMap}
              fullWidth
            />
          )}
          name="categoryId"
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
              fullWidth
              error={!!error}
              onChange={onChange}
              value={value}
            />
          )}
          name="name"
          control={control}
        />
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
