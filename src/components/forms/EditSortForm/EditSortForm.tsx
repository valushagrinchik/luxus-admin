import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../../controls/Button/Button";
import { EditSortFormInputs, Mode } from "../../../lib/types";
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
  mode: Mode;
}

export const EditSortForm = ({
  mode,
  onSubmit,
  onReset,
  data,
}: EditSortFormProps) => {
  const disabled = mode === Mode.preview;
  const [update] = useUpdateSortMutation();
  const [create] = useCreateSortMutation();

  const defaultValues = useMemo(() => {
    return {
      name: data?.name || "",
      groupId: data?.groupId?.toString() || "",
      categoryId: data?.categoryId?.toString() || "",
    };
  }, [data]);

  const {
    handleSubmit,
    reset,
    control,
    formState: { isValid, isDirty },
    watch,
    getValues,
  } = useForm<EditSortFormInputs>({
    resolver: yupResolver(schemaEditSort),
    defaultValues,
  });

  const groupId = watch("groupId");

  const { data: groups } = useGetGroupsQuery();
  const { data: categories, isSuccess: isCatListLoaded } =
    useGetCategoriesQuery(
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
    if (mode === "create") {
      await create({
        name: formData.name,
        categoryId: +formData.categoryId,
      });
    }
    if (mode === Mode.edit) {
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

  const title = () => {
    if (mode === Mode.create) {
      return "Crear variedad";
    }
    if (mode === Mode.edit) {
      return "Editar variedad";
    }
    return "Variedad";
  };

  return (
    <form className={styles.form}>
      <h2>{title()}</h2>
      <div className={styles.fields}>
        <TextField label="Número" disabled value={data.id} fullWidth />

        <Controller
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              select
              disabled={disabled}
              label={
                <>
                  Grupo <span className={styles.required}>*</span>
                </>
              }
              placeholder="Seleccionar grupo"
              helperText={error ? error.message : null}
              error={!!error}
              onChange={(event: any) => {
                reset(
                  {
                    ...getValues(),
                    groupId: event.target.value,
                    categoryId: "",
                  },
                  {
                    keepDirtyValues: true,
                  }
                );
                onChange(event);
              }}
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
              value={isCatListLoaded ? value : ""}
              disabled={disabled || !groupId}
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
              disabled={disabled}
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
        {!disabled && (
          <Button
            color="base"
            onClick={handleSubmit(submit)}
            disabled={!isDirty || !isValid}
          >
            <OkIcon width={16} height={16} />
            Guardar
          </Button>
        )}
      </div>
    </form>
  );
};
