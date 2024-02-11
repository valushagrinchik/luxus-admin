import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { BaseInput } from "../../../controls/BaseInput";
import { Button } from "../../../controls/Button/Button";
import styles from "./EditCategoryForm.module.css";
import { Category } from "../../../types";
import { useGetGroupsQuery } from "../../../api/sortsApi";

type EditCategoryFormInputs = {
  id: string;
  name: string;
};

interface EditCategoryFormProps {
  onSubmit: () => void;
  onReset: () => void;
  category: Category;
}

export const EditCategoryForm = ({
  onSubmit,
  onReset,
  category,
}: EditCategoryFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditCategoryFormInputs>({
    defaultValues: {
      name: category.name,
    },
  });

  const submit: SubmitHandler<EditCategoryFormInputs> = (data) => {
    console.log(data);
    onSubmit();
  };

  const {data, isLoading, error} = useGetGroupsQuery()
  console.log(data,'data')

  return (
    <div className={styles.form_container}>
      <form className={styles.form}>
        <h2>Editar grupo</h2>
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
    </div>
  );
};
