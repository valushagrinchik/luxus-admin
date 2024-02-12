import { SubmitHandler, useForm } from "react-hook-form";
import { BaseInput } from "../../../controls/BaseInput";
import { Button } from "../../../controls/Button/Button";
import styles from "./EditGroupForm.module.css";
import { useCreateGroupMutation, useUpdateGroupMutation } from "../../../api/sortsApi";

type EditGroupFormInputs = {
  id: string;
  name: string;
};

interface EditGroupFormProps {
  onSubmit: () => void;
  onReset: () => void;
  data: any;
  action: 'create' | 'update'
}

export const EditGroupForm = ({
  onSubmit,
  onReset,
  data,
  action
}: EditGroupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditGroupFormInputs>({
    defaultValues: {
      name: data?.name || '',
    },
  });

  const [create] = useCreateGroupMutation()
  const [update] = useUpdateGroupMutation()

  const submit: SubmitHandler<EditGroupFormInputs> = async(formData) => {
    if(action === 'create'){
      await create(formData)
    }
    if(action === 'update'){
      await update({...formData, id: data.id })
    }
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
