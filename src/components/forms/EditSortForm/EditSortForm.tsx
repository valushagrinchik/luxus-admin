import { SubmitHandler, useForm } from "react-hook-form";
import { BaseInput } from "../../../controls/BaseInput";
import { Button } from "../../../controls/Button/Button";
import { EditSortFormInputs, Sort } from "../../../lib/types";
import {
  useCreateSortMutation,
  useGetCategoriesQuery,
  useGetGroupsQuery,
  useUpdateSortMutation,
} from "../../../api/sortsApi";
import { Select } from "../../../controls/Select";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaEditSort } from "../../../lib/validation";
import { useEffect } from "react";

import styles from "./EditSortForm.module.css";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "../../../controls/Autocomplete";
// import Autocomplete from "@mui/material/Autocomplete";

interface EditSortFormProps {
  onSubmit: () => void;
  onReset: () => void;
  data: Sort & { groupId: number };
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
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
  } = useForm<EditSortFormInputs>({
    resolver: yupResolver(schemaEditSort),
    defaultValues: {
      name: data.name,
      groupId: data.groupId,
      categoryId: data.categoryId,
    },
  });
  const groupId = watch("groupId");

  const { data: groups } = useGetGroupsQuery();
  const { data: categories } = useGetCategoriesQuery(
    groupId
      ? {
          groupId: +groupId,
        }
      : undefined
  );

  useEffect(() => {
    setValue("categoryId", 0);
  }, [groupId, setValue]);

  const groupOptions =
    groups?.map((group) => ({
      value: group.id,
      label: group.name,
    })) || [];

  const categoryOptions =
    categories?.map((cat) => ({
      value: cat.id,
      label: cat.name,
    })) || [];

  console.log(categoryOptions, getValues(), "categoryOptions");
  if (categoryOptions.length === 1) {
    setValue("categoryId", categoryOptions[0].value);
  }

  const submit: SubmitHandler<EditSortFormInputs> = async (formData) => {
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
  console.log(groupFieldsProps, "groupFieldsProps");
  const { onChange: onChangeCategorySelect, ...categoryFieldsProps } =
    register("categoryId");
  return (
    <form className={styles.form}>
      <h2>{action === "create" ? "Crear" : "Editar"} variedad</h2>

      {action === "update" && (
        <div>
          <label htmlFor="id">Número</label>
          <BaseInput disabled value={data.id} />
        </div>
      )}

      <div>
        <label htmlFor="groupId">Grupo *</label>
        <Autocomplete
          name="groupId"
          onChange={(event: any, value: any) => {
            console.log(value, "value");
            setValue("groupId", value.value);
          }}
          disablePortal
          options={groupOptions}
          sx={{ width: 300 }}
          renderInput={(params: any) => <TextField {...params} label="Movie" />}
        />
        {/* <TextField
          select
          fullWidth
          label="Select"
          defaultValue=""
          inputProps={register("groupId", {
            required: "Please enter currency",
          })}
          // error={errors.currency}
          // helperText={errors.currency?.message}
        >
          {groupOptions.map((option: any) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField> */}
        {/* <Select
          // dropdown="menu"
          // slotProps={{
          //   root: (ref) => {
          //     if (!ref) return;
          //     return register("groupId");
          //   },
          // }}
          className={styles.select}
          multiple={false}
          // onChange={(event, value) => {
          //   if (!event || !value) {
          //     return;
          //   }
          //   setValue("groupId", +value);
          // }}
          // {...groupFieldsProps}
          options={groupOptions}
          defaultValue={data.groupId}
        /> */}
        {errors.groupId && <span>{errors.groupId.message}</span>}
      </div>
      <div>
        <label htmlFor="categoryId">Categoria *</label>
        <Select
          className={styles.select}
          multiple={false}
          onChange={(event, value) => {
            if (!event || !value) {
              return;
            }
            setValue("categoryId", +value);
          }}
          {...categoryFieldsProps}
          options={categoryOptions}
          defaultValue={data.categoryId}
        />
        {errors.categoryId && <span>{errors.categoryId.message}</span>}
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
