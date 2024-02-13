import { SubmitHandler, useForm } from "react-hook-form";
import { BaseInput } from "../../../controls/BaseInput";
import { Button } from "../../../controls/Button/Button";
import { Category, EditCategoryFormInputs } from "../../../lib/types";
import {
  useCreateCategoryMutation,
  useGetGroupsQuery,
  useUpdateCategoryMutation,
} from "../../../api/sortsApi";
import { Select } from "../../../controls/Select";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaEditCategory } from "../../../lib/validation";

import styles from "./EditCategoryForm.module.css";

interface EditCategoryFormProps {
  onSubmit: () => void;
  onReset: () => void;
  data: Category;
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

  const groupOptions =
    groups?.map((group) => ({
      value: group.id,
      label: group.name,
    })) || [];

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<EditCategoryFormInputs>({
    resolver: yupResolver(schemaEditCategory),
    defaultValues: {
      name: data?.name,
      groupId: data.groupId,
    },
  });

  const submit: SubmitHandler<EditCategoryFormInputs> = async (formData) => {
    if (action === "create") {
      await create(formData);
    }
    if (action === "update") {
      await update({ ...formData, id: data.id });
    }
    onSubmit();
  };

  const { onChange: onChangeGroupSelect, ...groupFieldsProps } =
    register("groupId");
  return (
    <form className={styles.form}>
      <h2>{action === "create" ? "Crear" : "Editar"} categoria</h2>
      <div>
        <label htmlFor="groupId">Grupo *</label>
        <Select
          className={styles.select}
          multiple={false}
          onChange={(event, value) => {
            if (!event || !value) {
              return;
            }
            setValue("groupId", +value);
          }}
          {...groupFieldsProps}
          options={groupOptions}
          defaultValue={data.groupId}
        />
        {errors.groupId && <span>{errors.groupId.message}</span>}
      </div>
      <div>
        <label htmlFor="name">Nombre *</label>
        <BaseInput {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div className={styles.actions}>
        <Button appearance="refuse" onClick={() => onReset()}>
          Salir
        </Button>
        <Button appearance="approve" onClick={handleSubmit(submit)}>
          Guardar
        </Button>
      </div>
    </form>
  );
};
