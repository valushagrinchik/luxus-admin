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
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<EditSortFormInputs>({
    resolver: yupResolver(schemaEditSort),
    defaultValues: {
      name: data.name || "",
      groupId: data?.groupId?.toString() || "",
      categoryId: data?.categoryId?.toString() || "",
    },
  });
  const categoryId = watch("categoryId");

  const groupId = watch("groupId");

  const { data: groups } = useGetGroupsQuery();
  const { data: categories } = useGetCategoriesQuery(
    groupId
      ? {
          groupId: +groupId,
        }
      : undefined
  );

  const groupsMap = Object.fromEntries(
    groups?.map((group: any) => [group.id, group.name + "_" + group.id]) || []
  );

  const categoriesMap = Object.fromEntries(
    categories?.map((cat) => [cat.id, cat.name + "_" + cat.id]) || []
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
          <Select
            className={styles.select}
            {...register("groupId")}
            options={groupsMap}
            placeholder="Seleccionar grupo"
          />
          {errors.groupId && (
            <span className={styles.required}>{errors.groupId.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="categoryId">
            Categoria <span className={styles.required}>*</span>
          </label>
          <Select
            disabled={!groupId}
            placeholder="Seleccionar categoria"
            value={
              categoryId && Object.keys(categoriesMap).includes(categoryId)
                ? categoryId
                : ""
            }
            className={styles.select}
            {...register("categoryId")}
            options={categoriesMap}
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
