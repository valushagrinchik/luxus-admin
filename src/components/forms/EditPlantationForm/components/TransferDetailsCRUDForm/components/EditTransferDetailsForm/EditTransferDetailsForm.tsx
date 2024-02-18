import { Controller, useForm } from "react-hook-form";
import { TextField } from "../../../../../../../controls/TextField";
import { Button } from "../../../../../../../controls/Button/Button";
import { CloseIcon } from "../../../../../../../controls/icons/CloseIcon";
import { OkIcon } from "../../../../../../../controls/icons/OkIcon";
import { EditTransferDetailsInput } from "../../../../interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaAddTransferDetails } from "../../../../../../../lib/validation";
import { v4 as uuid } from "uuid";

import styles from "./EditTransferDetailsForm.module.css";

export const EditTransferDetailsForm = ({
  onReset,
  onSubmit,
  data = {},
  mode = "create",
}: {
  onReset: () => void;
  onSubmit: (data: EditTransferDetailsInput) => void;
  data?: any;
  mode: "edit" | "view" | "create";
}) => {
  const action =
    Object.values(data).filter((value) => !!value).length > 0
      ? "update"
      : "create";

  const disabled = mode === "view";

  const { control, handleSubmit } = useForm<EditTransferDetailsInput>({
    resolver: yupResolver(schemaAddTransferDetails),
    defaultValues: {
      id: data.id || uuid(),
      name: data.name || "",
      beneficiary: data.beneficiary || "",
      beneficiaryAddress: data.beneficiaryAddress || "",
      documentPath: data.documentPath || "",
      favourite: data.favourite || false,
      bank: data.bank || "",
      bankAddress: data.bankAddress || "",
      bankAccountNumber: data.bankAccountNumber || "",
      bankAccountType: data.bankAccountType || "",
      bankSwift: data.bankSwift || "",
      correspondentBank: data.correspondentBank || "",
      correspondentBankAddress: data.correspondentBankAddress || "",
      correspondentBankAccountNumber: data.correspondentBankAccountNumber || "",
      correspondentBankSwift: data.correspondentBankSwift || "",
    },
  });

  const submit = (data: EditTransferDetailsInput) => {
    onSubmit(data);
  };

  return (
    <div className={styles.form}>
      <h2>{action === "create" ? "Crear" : "Editar"}</h2>

      <div className={styles.row}>
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label={
                <>
                  Razón Social <span className={styles.required}>*</span>
                </>
              }
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              placeholder="Seleccionar Tipo Cuenta Bancaria"
              disabled={disabled}
            />
          )}
        />
        <Controller
          name="beneficiary"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label={
                <>
                  Beneficiario <span className={styles.required}>*</span>
                </>
              }
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              placeholder="Indicar Beneficiario"
              disabled={disabled}
            />
          )}
        />
      </div>
      <div className={styles.row}>
        <Controller
          name="beneficiaryAddress"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label={"Dirección del beneficiario"}
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              placeholder="Indicar Dirección del beneficiario"
              disabled={disabled}
            />
          )}
        />
        <Controller
          name="bank"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label={
                <>
                  Nombre del banco <span className={styles.required}>*</span>
                </>
              }
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              placeholder="Indicar Nombre del banco"
              disabled={disabled}
            />
          )}
        />
      </div>
      <div className={styles.row}>
        <Controller
          name="bankAddress"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label={"Dirección del banco"}
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              placeholder="Indicar Dirección del banco"
              disabled={disabled}
            />
          )}
        />
        <Controller
          name="bankAccountNumber"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label={
                <>
                  № Cuenta bancaria <span className={styles.required}>*</span>
                </>
              }
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              placeholder="Indicar № Cuenta bancaria"
              disabled={disabled}
            />
          )}
        />
      </div>
      <div className={styles.row}>
        <Controller
          name="bankAccountType"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label={
                <>
                  Tipo Cuenta Bancaria{" "}
                  <span className={styles.required}>*</span>
                </>
              }
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              placeholder="Seleccionar Tipo Cuenta Bancaria"
              disabled={disabled}
            />
          )}
        />
        <Controller
          name="bankSwift"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="SWIFT"
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              placeholder="Indicar Swift"
              disabled={disabled}
            />
          )}
        />
      </div>

      <div className={styles.row}>
        <Controller
          name="correspondentBank"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Nombre del banco corresponsal"
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              placeholder="Indicar Nombre del banco corresponsal"
              disabled={disabled}
            />
          )}
        />
        <Controller
          name="correspondentBankAddress"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Dirección del banco corresponsal"
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              placeholder="Indicar Dirección del banco corresponsal"
              disabled={disabled}
            />
          )}
        />
      </div>
      <div className={styles.row}>
        <Controller
          name="correspondentBankAccountNumber"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="№ Cuenta bancaria del banco corresponsal"
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              placeholder="Indicar № Cuenta bancaria del banco corr ..."
              disabled={disabled}
            />
          )}
        />
        <Controller
          name="correspondentBankSwift"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="SWIFT"
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              placeholder="Indicar Swift"
              disabled={disabled}
            />
          )}
        />
      </div>
      {/* TODO: add file 

      placeholder: La letra de cambio a un tercero
      btn title: Subir
      
      */}

      <div className={styles.actions}>
        <Button color="gray" onClick={() => onReset()}>
          <CloseIcon width={16} height={16} />
          Salir
        </Button>
        <Button color="base" onClick={handleSubmit(submit)} disabled={disabled}>
          <OkIcon width={16} height={16} />
          Guardar
        </Button>
      </div>
    </div>
  );
};
