import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../../controls/Button/Button";
import { EditSortFormInputs } from "../../../lib/types";
import {
  useCreateSortMutation,
  useGetCategoriesQuery,
  useGetGroupsQuery,
  useUpdateSortMutation,
} from "../../../api/sortsApi";
import { Select } from "../../../controls/Select";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaEditSort } from "../../../lib/validation";
import { CloseIcon } from "../../../controls/icons/CloseIcon";
import { OkIcon } from "../../../controls/icons/OkIcon";
import { TextField } from "../../../controls/TextField";
import { Controller } from "react-hook-form";

import styles from "./EditSortForm.module.css";
import { useEffect } from "react";

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
  console.log(data, "data");
  const {
    register,
    handleSubmit,
    getValues,
    control,
    resetField,
    reset,
    formState: { errors, isValid },
    watch,
  } = useForm<EditSortFormInputs>({
    resolver: yupResolver(schemaEditSort),
    defaultValues: {
      name: data?.name || "",
      groupId: data?.groupId?.toString() || "",
      categoryId: data?.categoryId?.toString() || "",
    },
  });
  const categoryId = watch("categoryId");

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

  console.log(groupId, categoryId, "$$$");

  return (
    <form className={styles.form}>
      <h2>{action === "create" ? "Crear" : "Editar"} variedad</h2>
      <div className={styles.fields}>
        <div>
          <label htmlFor="id">Número</label>
          <TextField disabled value={data.id} style={{ width: "100%" }} />
        </div>

        <div>
          <label htmlFor="groupId">
            Grupo <span className={styles.required}>*</span>
          </label>
          <Controller
            render={({ field }) => (
              <Select
                {...field}
                disabled={!groups?.length}
                placeholder="Seleccionar grupo"
                defaultValue={data.groupId}
                className={styles.select}
                {...register("groupId")}
                options={groupsMap}

                // value={
                //   groupId && Object.keys(groupsMap).includes(groupId) ? groupId : ""
                // }
              />
            )}
            name="groupId"
            control={control}
          />

          {errors.groupId && (
            <span className={styles.required}>{errors.groupId.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="categoryId">
            Categoria <span className={styles.required}>*</span>
          </label>

          <Controller
            render={({ field }) => (
              <Select
                {...field}
                disabled={!groupId || !categories?.length}
                placeholder="Seleccionar categoria"
                defaultValue={data.categoryId}
                // value={
                //   categoryId && Object.keys(categoriesMap).includes(categoryId)
                //     ? categoryId
                //     : ""
                // }

                className={styles.select}
                {...register("categoryId")}
                options={categoriesMap}
              />
            )}
            name="categoryId"
            control={control}
          />
          {errors.categoryId && (
            <span className={styles.required}>{errors.categoryId.message}</span>
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
            defaultValue={data.name}
          />

          {errors.name && (
            <span className={styles.required}>{errors.name.message}</span>
          )}
        </div>
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
