import { Controller, useForm, useFormContext } from "react-hook-form";
import { TextField } from "../../../../../../../controls/TextField";
import { Button } from "../../../../../../../controls/Button/Button";
import { CloseIcon } from "../../../../../../../controls/icons/CloseIcon";
import { OkIcon } from "../../../../../../../controls/icons/OkIcon";
import {
  EditBaseInput,
  EditTransferDetailsInput,
  Mode,
} from "../../../../interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaAddTransferDetails } from "../../../../../../../lib/validation";

import styles from "./EditTransferDetailsForm.module.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { AddFileIcon } from "../../../../../../../controls/icons/AddFileIcon";
import { InputAdornment } from "@mui/material";
import { CloseIconSmall } from "../../../../../../../controls/icons/CloseIconSmall";
import L18nEs from "../../../../../../../lib/l18n";

export const EditTransferDetailsForm = ({
  onReset,
  onSubmit,
  data = {},
  mode = Mode.create,
  legalEntitiesMap,
}: {
  onReset: () => void;
  onSubmit: (data: EditTransferDetailsInput) => void;
  data?: any;
  mode: Mode;
  legalEntitiesMap: EditBaseInput;
}) => {
  const disabled = mode === Mode.preview;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showFileField, setShowFileField] = useState(false);
  const [resetAddress, setResetAddress] = useState(true);

  const { getValues: getGlobalValues } = useFormContext();

  const { control, handleSubmit, watch, setValue, getValues } =
    useForm<EditTransferDetailsInput>({
      resolver: yupResolver(schemaAddTransferDetails),
      defaultValues: {
        id: "",
        name: "",
        beneficiary: "",
        beneficiaryAddress: "",
        documentPath: undefined,
        favourite: false,
        bank: "",
        bankAddress: "",
        bankAccountNumber: "",
        bankAccountType: "",
        bankSwift: "",
        correspondentBank: "",
        correspondentBankAddress: "",
        correspondentBankAccountNumber: "",
        correspondentBankSwift: "",
        // plantationId: getValues().generalInfo.id,
        plantationLegalEntityId: "",
      },
      values: {
        id: data.id || "",
        name: data.name || "",
        beneficiary: data.beneficiary || "",
        beneficiaryAddress: data.beneficiaryAddress || "",
        documentPath: data.documentPath,
        favourite: data.favourite || false,
        bank: data.bank || "",
        bankAddress: data.bankAddress || "",
        bankAccountNumber: data.bankAccountNumber || "",
        bankAccountType: data.bankAccountType || "",
        bankSwift: data.bankSwift || "",
        correspondentBank: data.correspondentBank || "",
        correspondentBankAddress: data.correspondentBankAddress || "",
        correspondentBankAccountNumber:
          data.correspondentBankAccountNumber || "",
        correspondentBankSwift: data.correspondentBankSwift || "",
        // plantationId: data.plantationId,
        plantationLegalEntityId: data.plantationLegalEntityId || "",
      },
    });

  // DEPENDENCY OF beneficiary FROM name
  const name = watch("plantationLegalEntityId");
  useEffect(() => {
    if (name) {
      setValue("name", legalEntitiesMap[name]);
      setValue("beneficiary", legalEntitiesMap[name]);
      setValue(
        "beneficiaryAddress",
        getGlobalValues().legalEntities.find((e: any) => e.id === name)
          ?.actualAddress
      );
    }
  }, [name, setValue, legalEntitiesMap]);

  // CUSTOM VALIDATION
  watch("beneficiary");
  watch("documentPath");
  watch("bank");
  watch("bankAccountNumber");
  watch("bankAccountType");
  const validate = () => {
    const values = getValues();

    return (
      values.name &&
      values.beneficiary &&
      (values.name !== values.beneficiary ? values.documentPath : true) &&
      values.bank &&
      values.bankAccountNumber &&
      values.bankAccountType
    );
  };
  const isValid = validate();

  return (
    <div className={styles.form}>
      <h2>
        {mode === Mode.create ? "Crear" : mode === Mode.edit ? "Editar" : ""}
      </h2>
      <div className={styles.row}>
        <Controller
          name="plantationLegalEntityId"
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
              select
              options={legalEntitiesMap}
              onChange={(event: ChangeEvent) => {
                setValue("documentPath", undefined);
                setShowFileField(false);
                onChange(event);
              }}
              value={value}
              fullWidth
              placeholder="Indicar Razón social"
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
              onChange={(event: ChangeEvent) => {
                setShowFileField((event.target as any).value !== name);
                if ((event.target as any).value !== name) {
                  resetAddress && setValue("beneficiaryAddress", "");
                  setResetAddress(false);
                }
                onChange(event);
              }}
              value={value}
              fullWidth
              placeholder="Indicar Beneficiario"
              disabled={disabled}
            />
          )}
        />
      </div>
      {showFileField && (
        <div className={styles.row}>
          <Controller
            name="documentPath"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <TextField
                  helperText={error ? error.message : null}
                  error={!!error}
                  onChange={onChange}
                  value={value?.name || ""}
                  fullWidth
                  placeholder="La letra de cambio a un tercero"
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  InputProps={
                    !!value
                      ? {
                          endAdornment: (
                            <InputAdornment position="end">
                              <CloseIconSmall
                                style={{
                                  cursor: "pointer",
                                  marginRight: "5px",
                                }}
                                onClick={() => {
                                  setValue("documentPath", undefined);
                                }}
                              />
                            </InputAdornment>
                          ),
                        }
                      : {}
                  }
                />
              );
            }}
          />
          <Button
            color="base"
            onClick={() => {
              if (!fileInputRef.current) {
                return;
              }
              fileInputRef.current.click();
            }}
          >
            <AddFileIcon />
            Subir
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(event: any) => {
              const fileUploaded = event.target.files[0];
              setValue("documentPath", fileUploaded);
            }}
          />
        </div>
      )}
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
                  Tipo Cuenta Bancaria
                  <span className={styles.required}>*</span>
                </>
              }
              helperText={error ? error.message : null}
              select
              options={L18nEs.constants.bankAccountTypes}
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
      <div className={styles.actions}>
        <Button color="gray" onClick={() => onReset()}>
          <CloseIcon width={16} height={16} />
          Salir
        </Button>
        {mode !== Mode.preview && (
          <Button
            color="base"
            onClick={handleSubmit(onSubmit)}
            disabled={disabled || !isValid}
          >
            <OkIcon width={16} height={16} />
            Guardar
          </Button>
        )}
      </div>
    </div>
  );
};
