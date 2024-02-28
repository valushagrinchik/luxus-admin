import Box from "../../../../../controls/Box";
import styles from "./FinancialDataForm.module.css";
import {
  Controller,
  UseFieldArrayReturn,
  useFormContext,
} from "react-hook-form";
import { TextField } from "../../../../../controls/TextField";
import { ContactsCRUDForm } from "../ContactsCRUDForm/ContactsCRUDForm";
import { ChecksCRUDForm } from "../ChecksCRUDForm/ChecksCRUDForm";
import { TransferDetailsCRUDForm } from "../TransferDetailsCRUDForm/TransferDetailsCRUDForm";
import L18nEs from "../../../../../lib/l18n";
import { EditLegalEntityInput, EditPlantationInput } from "../../interfaces";
import { PlantationDepartment } from "../../../../../lib/constants";
import {
  ChecksDeliveryMethod,
  CountryCode,
  Mode,
  TermsOfPayment,
} from "../../../../../lib/types";
import { ChangeEvent } from "react";

export const FinancialDataForm = ({
  mode,
  checks,
  transferDetails,
  legalEntities,
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
  const disabled = mode === Mode.preview;
  const { control, watch, setValue } = useFormContext();

  const country = watch("generalInfo.country");

  const termsOfPayment = watch("generalInfo.termsOfPayment");
  const deliveryMethod = watch("generalInfo.deliveryMethod");

  const legalEntitiesMap = Object.fromEntries(
    (legalEntities.fields as EditLegalEntityInput[]).map((entity) => [
      entity.id,
      entity.name,
    ])
  );

  return (
    <div className={styles.container}>
      <ContactsCRUDForm
        mode={mode}
        contactFieldKey="financialContacts"
        positions={L18nEs.constants.financialPositions}
        department={PlantationDepartment.FINANCIAL}
      />
      <Box>
        <TransferDetailsCRUDForm
          mode={mode}
          legalEntitiesMap={legalEntitiesMap}
          transferDetails={transferDetails}
        />
      </Box>
      {country !== CountryCode.co && (
        <Box>
          <div className={styles.columns}>
            <ChecksCRUDForm
              mode={mode}
              legalEntitiesMap={legalEntitiesMap}
              checks={checks}
            />

            {!!checks.fields.length && (
              <div className={styles.delivery_method_block}>
                <h2>Forma de entrega del cheque</h2>
                <Controller
                  name="generalInfo.deliveryMethod"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      select
                      helperText={error ? error.message : null}
                      error={!!error}
                      onChange={(event: ChangeEvent) => {
                        if (
                          (event.target as any).value !==
                          ChecksDeliveryMethod.SERVIENTREGA
                        ) {
                          setValue("generalInfo.deliveryInfo", "");
                        }
                        onChange(event);
                      }}
                      value={value}
                      options={L18nEs.constants.deliveryMethods}
                      fullWidth
                      style={{ width: "250px" }}
                      disabled={disabled}
                    />
                  )}
                />
                {deliveryMethod === ChecksDeliveryMethod.SERVIENTREGA && (
                  <Controller
                    name="generalInfo.deliveryInfo"
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        multiline={true}
                        minRows={4}
                        helperText={error ? error.message : null}
                        error={!!error}
                        onChange={onChange}
                        value={value}
                        fullWidth
                        disabled={disabled}
                        sx={{
                          ".MuiInputBase-root": {
                            borderRadius: "6px",
                            background: "#FFF4EA",
                            border: "none",
                            padding: "0",
                            fontSize: "14px",
                          },
                          ".MuiInputBase-input, .MuiInputBase-input:focus": {
                            padding: "16px",
                            color: "#CC6E0F",
                            textDecoration: "none",
                            lineHeight: "20px",
                          },
                          ".MuiInputBase-input.MuiInput-input:focus": {
                            padding: "16px",
                            color: "#CC6E0F",
                            textDecoration: "none",
                          },
                          ".MuiInputBase-root.Mui-disabled": {
                            padding: "16px",
                            color: "#CC6E0F",
                            opacity: "0.5",
                          },
                          ".MuiInputBase-input-MuiInput-input.Mui-disabled": {
                            WebkitTextFillColor: "#CC6E0F!important;",
                          },
                        }}
                      />
                    )}
                  />
                )}
              </div>
            )}
          </div>
        </Box>
      )}
      <Box>
        <h2>Condiciones de pago</h2>

        <div className={styles.row}>
          <Controller
            name="generalInfo.termsOfPayment"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                select
                label="Plazo de pagos"
                placeholder="Pago diferido"
                helperText={error ? error.message : null}
                error={!!error}
                onChange={(event: ChangeEvent) => {
                  if ((event.target as any).value !== TermsOfPayment.POSTPAID) {
                    setValue("generalInfo.postpaidDays", "");
                    setValue("generalInfo.postpaidCredit", "");
                  }

                  onChange(event);
                }}
                value={value}
                options={L18nEs.constants.termsOfPayments}
                fullWidth
                style={{ width: "316px" }}
                disabled={disabled}
              />
            )}
          />
          {termsOfPayment === TermsOfPayment.POSTPAID && (
            <>
              <Controller
                name="generalInfo.postpaidDays"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Cantidad de dias"
                    placeholder="Indicar cantidad de dias"
                    helperText={error ? error.message : null}
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    disabled={disabled}
                    style={{ width: "316px" }}
                  />
                )}
              />
              <Controller
                name="generalInfo.postpaidCredit"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Monto de crédito"
                    placeholder="Indicar monto de crédito"
                    helperText={error ? error.message : null}
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    disabled={disabled}
                    style={{ width: "316px" }}
                  />
                )}
              />
            </>
          )}
        </div>
      </Box>
    </div>
  );
};
