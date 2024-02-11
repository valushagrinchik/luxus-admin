import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { BaseInput } from "../../../controls/BaseInput";
import { Button } from "../../../controls/Button/Button";
import styles from "./EditGroupForm.module.css";
import { Group } from "../../../types";

type EditGroupFormInputs = {
  id: string;
  name: string;
};

interface EditGroupFormProps {
  onSubmit: () => void;
  onReset: () => void;
  group: Group;
}

export const EditGroupForm = ({
  onSubmit,
  onReset,
  group,
}: EditGroupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditGroupFormInputs>({
    defaultValues: {
      name: group.name,
    },
  });

  const submit: SubmitHandler<EditGroupFormInputs> = (data) => {
    console.log(data);
    onSubmit();
  };

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
