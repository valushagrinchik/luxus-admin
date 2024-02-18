import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import Box from "../../../../../controls/Box";
import { TextField } from "../../../../../controls/TextField";
import styles from "./GeneralDataForm.module.css";
import { Button } from "../../../../../controls/Button/Button";
import { PlusIcon } from "../../../../../controls/icons/PlusIcon";
import { Modal } from "../../../../../controls/Modal";
import { useState } from "react";
import { EditLegalEntityForm } from "../EditLegalEntityForm/EditLegalEntityForm";
import {
  EditBaseInput,
  EditLegalEntityInput,
  EditPlantationFormMode,
} from "../../interfaces";
import { Table } from "../Table/Table";
import { BinIcon } from "../../../../../controls/icons/BinIcon";
import { EditIcon } from "../../../../../controls/icons/EditIcon";
import L18nEs from "../../../../../lib/l18n";

export const GeneralDataForm = ({ mode }: { mode: EditPlantationFormMode }) => {
  const { getValues, control } = useFormContext();

  const disabled = mode === "preview";

  const legalEntities = useFieldArray({
    control,
    name: "legalEntities",
  });

  const transferDetails = useFieldArray({
    control,
    name: "transferDetails",
  });
  const checks = useFieldArray({
    control,
    name: "checks",
  });

  console.log(transferDetails, checks, getValues());

  const [open, setOpen] = useState(false);

  const data = getValues().generalInfo;

  // contact to create/edit in modal
  const [legalEntity, setLegalEntity] = useState<
    EditLegalEntityInput | EditBaseInput
  >({});

  const handleOpen = (data: EditLegalEntityInput | EditBaseInput) => {
    setLegalEntity(data);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const updateLegalEntity = (data: EditLegalEntityInput) => {
    if (legalEntities.fields.find((entity) => entity.id === data.id)) {
      const result = [...legalEntities.fields].map((entity) =>
        entity.id === data.id ? data : entity
      );
      legalEntities.replace(result);
    } else {
      transferDetails.append({
        name: data.name,
        beneficiary: data.name,
        beneficiaryAddress: data.legalAddress,
        favourite: !legalEntities.fields.length,
      });
      checks.append({
        name: data.name,
        beneficiary: data.name,
        favourite: !legalEntities.fields.length,
      });
      legalEntities.append(data);
    }

    setOpen(false);
  };

  const deleteLegalEntity = (data: EditLegalEntityInput) => {
    const result = [
      ...legalEntities.fields.filter((entity) => entity.id !== data.id),
    ];
    legalEntities.replace(result);
  };

  const headers = {
    name: "Razón Social",
    code: "Ruc o cédula",
    legalAddress: "Domicilio tributario",
    actualAddress: "Domicilio real",
  };

  return (
    <div className={styles.container}>
      <Box direction="row">
        <TextField
          label="Número"
          value={data.id}
          disabled
          style={{ width: "318px" }}
        />

        <Controller
          name="generalInfo.country"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              select
              label="País"
              placeholder="País"
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              options={L18nEs.constants.countries}
              defaultValue={data.country}
              style={{ width: "318px" }}
              disabled={disabled}
            />
          )}
        />

        <Controller
          name="generalInfo.name"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Nombre comercial"
              placeholder="Indicar nombre comercial"
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              style={{ width: "318px" }}
              disabled={disabled}
            />
          )}
        />
      </Box>
      <Box>
        <div className={styles.title}>
          <h2>Datos generales</h2>
          {!disabled && (
            <div className={styles.actions}>
              <Button
                color="gray"
                onClick={() => handleOpen({})}
                className={styles.add_btn}
              >
                <PlusIcon width={16} height={16} />
              </Button>
            </div>
          )}
        </div>
        {!!legalEntities.fields.length && (
          <Table<EditLegalEntityInput>
            headers={headers}
            data={legalEntities.fields as EditLegalEntityInput[]}
            renderActions={(data) => (
              <>
                <BinIcon
                  className="action_icon"
                  onClick={() => deleteLegalEntity(data)}
                />

                <EditIcon
                  className="action_icon"
                  onClick={() => handleOpen(data)}
                />
              </>
            )}
          />
        )}
      </Box>
      <Box>
        <Controller
          name="generalInfo.comments"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Observaciones"
              variant="standard"
              placeholder="Introduce un comentario"
              helperText={error ? error.message : null}
              multiline={true}
              minRows={4}
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              disabled={disabled}
            />
          )}
        />
      </Box>

      <Modal open={open} onClose={handleClose}>
        <EditLegalEntityForm
          onReset={handleClose}
          onSubmit={updateLegalEntity}
          data={legalEntity}
        />
      </Modal>
    </div>
  );
};
