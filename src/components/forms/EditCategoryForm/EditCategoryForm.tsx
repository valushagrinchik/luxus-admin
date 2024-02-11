import { SubmitHandler, useForm } from "react-hook-form";
import { BaseInput } from "../../../controls/BaseInput";
import { Button } from "../../../controls/Button/Button";
import styles from "./EditCategoryForm.module.css";
import { Category } from "../../../types";
import { useGetGroupsQuery, useUpdateCategoryMutation } from "../../../api/sortsApi";
import { Select } from "../../../controls/Select";

type EditCategoryFormInputs = {
  id: number;
  name: string;
  groupId: number;
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
  const { data } = useGetGroupsQuery()
  const [update] = useUpdateCategoryMutation()
  const groupOptions = data?.map (group => ({value: group.id.toString(), label: group.name})) || []

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<EditCategoryFormInputs>({
    defaultValues: {
      name: category.name,
    },
  });

  const submit: SubmitHandler<EditCategoryFormInputs> = async (data) => {
    await update({
      ...data,
      id: category.id,
    })
    onSubmit();
  };


  const {onChange: onChangeGroupSelect, ...groupFieldsProps} = register("groupId")
  return (
    <form className={styles.form}>
      <h2>Editar categoria</h2>
      <div>
        <label htmlFor="groupId">Grupo *</label>
        <Select placeholder="Grupo" 
          className={styles.select}
          
          multiple={false} 
          onChange={(event, value)=>{
          if(!event || !value){
            return
          }
          setValue('groupId', +value )
        }} {...groupFieldsProps} options={groupOptions} defaultValue={category.groupId.toString()} />
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
