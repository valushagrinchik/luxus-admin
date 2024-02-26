import {
  Controller,
  UseFieldArrayReturn,
  useFormContext,
} from "react-hook-form";
import Box from "../../../../../controls/Box";
import { TextField } from "../../../../../controls/TextField";
import { EditPlantationInput } from "../../interfaces";
import { LegalEntitiesCRUDForm } from "../LegalEntitiesCRUDForm/LegalEntitiesCRUDForm";

import L18nEs from "../../../../../lib/l18n";
import styles from "./GeneralDataForm.module.css";
import { Mode } from "../../../../../lib/types";

export const GeneralDataForm = ({
  mode,
  checks,
  legalEntities,
  transferDetails,
}: {
  mode: Mode;
  checks: UseFieldArrayReturn<EditPlantationInput, "checks", "id">;
  legalEntities: UseFieldArrayReturn<
    EditPlantationInput,
    "legalEntities",
    "id"
  >;
  transferDetails: UseFieldArrayReturn<
    EditPlantationInput,
    "transferDetails",
    "id"
  >;
}) => {
  const { getValues, control } = useFormContext();

  const disabled = mode === Mode.preview;

  const data = getValues().generalInfo;

  return (
    <div className={styles.container}>
      <Box direction="row">
        <TextField
          label="Número"
          value={mode === Mode.create ? "" : data.id}
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
              style={{ width: "318px" }}
              disabled={disabled || mode === Mode.edit}
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
        <LegalEntitiesCRUDForm
          mode={mode}
          legalEntities={legalEntities}
          checks={checks}
          transferDetails={transferDetails}
        />
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
    </div>
  );
};
