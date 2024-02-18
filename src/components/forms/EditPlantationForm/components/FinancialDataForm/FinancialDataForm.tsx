import Box from "../../../../../controls/Box";
import styles from "./FinancialDataForm.module.css";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "../../../../../controls/TextField";
import { ContactsCRUDForm } from "../ContactsCRUDForm/ContactsCRUDForm";
import { ChecksCRUDForm } from "../ChecksCRUDForm/ChecksCRUDForm";
import { TransferDetailsCRUDForm } from "../TransferDetailsCRUDForm/TransferDetailsCRUDForm";
import L18nEs from "../../../../../lib/l18n";
import { EditPlantationFormMode } from "../../interfaces";

export const FinancialDataForm = ({
  mode,
}: {
  mode: EditPlantationFormMode;
}) => {
  const disabled = mode === "preview";
  const { control, getValues, watch } = useFormContext();
  const data = getValues().generalInfo;
  const termsOfPayment = watch("generalInfo.termsOfPayment");
  const deliveryMethod = watch("generalInfo.deliveryMethod");

  return (
    <div className={styles.container}>
      <ContactsCRUDForm
        mode={mode}
        contactFieldKey="financialContacts"
        positions={L18nEs.constants.financialPositions}
      />
      <Box>
        <TransferDetailsCRUDForm mode={mode} />
      </Box>
      <Box>
        <div className={styles.columns}>
          <div className={styles.checks_block}>
            <ChecksCRUDForm mode={mode} />
          </div>
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
                  onChange={onChange}
                  value={value}
                  options={L18nEs.constants.deliveryMethods}
                  fullWidth
                  style={{ width: "250px" }}
                  disabled={disabled}
                />
              )}
            />
            {deliveryMethod ===
              L18nEs.constants.deliveryMethods.SERVIENTREGA && (
              <div className={styles.info}>
                En adelante todos los cheques que se envie por Servientrega debe
                salir a nombre de MILTON PACHECO C.I 05018970011 CEL. 0982520282
                Servientrega Latacunga ELOY ALFARO S/N Y GENERAL JUAN MONTERO,
                LATACUNGA
              </div>
            )}
          </div>
        </div>
      </Box>
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
                onChange={onChange}
                value={value}
                options={L18nEs.constants.termsOfPayments}
                defaultValue={data.country}
                fullWidth
                style={{ width: "316px" }}
                disabled={disabled}
              />
            )}
          />
          {termsOfPayment === L18nEs.constants.termsOfPayments.POSTPAID && (
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
