import { Tab, TabPanel, Tabs, TabsList } from "@mui/base";
import { GeneralDataForm } from "./components/GeneralDataForm/GeneralDataForm";
import { FinancialDataForm } from "./components/FinancialDataForm/FinancialDataForm";
import { SalesDataForm } from "./components/SalesDataForm/SalesDataForm";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { Mode, EditPlantationInput } from "./interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaEditPlantation } from "../../../lib/validation";
import { PageTitle } from "../../PageTitle/PageTitle";
import { CloseIcon } from "../../../controls/icons/CloseIcon";
import { OkIcon } from "../../../controls/icons/OkIcon";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../controls/Button/Button";
import { ChecksDeliveryMethod, TermsOfPayment } from "../../../lib/types";
import { Modal } from "../../../controls/Modal";
import { AdminConfirmationForm } from "../AdminConfirmationForm/AdminConfirmationForm";
import L18nEs from "../../../lib/l18n";
import { useState } from "react";
import {
  useCreatePlantationMutation,
  useGetPlantationQuery,
  useUpdatePlantationMutation,
} from "../../../api/plantationsApi";
import { transformPlantationData } from "../../../lib/utils";

import styles from "./EditPlantationForm.module.css";
import { ArrowLeftIcon } from "../../../controls/icons/ArrowLeftIcon";

export const EditPlantationForm = ({
  plantationId,
  mode = Mode.edit,
}: {
  plantationId: string;
  mode: Mode;
}) => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetPlantationQuery(+plantationId, {
    skip: mode === Mode.create,
  });

  const [open, setOpen] = useState(false);

  const navigateToList = () => {
    navigate("/plantations");
  };

  const [create] = useCreatePlantationMutation();
  const [update] = useUpdatePlantationMutation();

  const onSubmit = async (input: EditPlantationInput) => {
    const formData = transformPlantationData(input);
    if (mode === Mode.create) {
      await create(formData);
    }
    if (mode === Mode.edit) {
      await update(formData);
    }
    navigateToList();
  };

  const methods = useForm<EditPlantationInput>({
    resolver: yupResolver(schemaEditPlantation),
    defaultValues: {
      generalInfo: {
        id: plantationId,
        name: "",
        country: "",
        comments: "",
        deliveryMethod: ChecksDeliveryMethod.PERSONALLY,
        termsOfPayment: TermsOfPayment.POSTPAID,
        postpaidCredit: "",
        postpaidDays: "",
      },
      legalEntities: [],
      transferDetails: [],
      checks: [],
      financialContacts: [],
      salesContacts: [],
    },
    values: {
      generalInfo: {
        id: plantationId,
        name: data?.generalInfo?.name || "",
        country: data?.generalInfo?.country || "",
        comments: data?.generalInfo?.comments || "",
        deliveryMethod:
          data?.generalInfo?.deliveryMethod || ChecksDeliveryMethod.PERSONALLY,
        termsOfPayment:
          data?.generalInfo?.termsOfPayment || TermsOfPayment.POSTPAID,
        postpaidCredit: data?.generalInfo?.postpaidCredit || "",
        postpaidDays: data?.generalInfo?.postpaidDays || "",
      },
      legalEntities: data?.legalEntities || [],
      transferDetails: data?.transferDetails || [],
      checks: data?.checks || [],
      financialContacts: data?.financialContacts || [],
      salesContacts: data?.salesContacts || [],
    },
  });

  const transferDetails = useFieldArray({
    control: methods.control,
    name: "transferDetails",
    keyName: "sid",
  });
  const checks = useFieldArray({
    control: methods.control,
    name: "checks",
    keyName: "sid",
  });
  const legalEntities = useFieldArray({
    control: methods.control,
    name: "legalEntities",
    keyName: "sid",
  });

  const validate = () => {
    const values = methods.getValues();
    return (
      values.checks.length >= values.legalEntities.length &&
      values.transferDetails.length >= values.legalEntities.length &&
      values.legalEntities.length > 0 &&
      values.financialContacts.length > 0 &&
      values.salesContacts.length > 0 &&
      values.generalInfo.country &&
      values.generalInfo.name &&
      values.generalInfo.deliveryMethod &&
      values.generalInfo.termsOfPayment &&
      (values.generalInfo.termsOfPayment === TermsOfPayment.POSTPAID
        ? values.generalInfo.postpaidCredit && values.generalInfo.postpaidDays
        : true) &&
      values.transferDetails.reduce(
        (valid, tr) =>
          valid &&
          !!tr.bank &&
          !!tr.bankAccountNumber &&
          !!tr.bankAccountType &&
          !!tr.name &&
          !!tr.beneficiary,
        true
      )
    );
  };

  const isValid = validate();

  if (mode !== Mode.create && isLoading) {
    return <div>Cargando...</div>;
  }

  if (!isLoading && error) {
    const code = (
      error as {
        data: { error: string; message: string[]; statusCode: number };
      }
    )?.data?.error;
    if (code === "PLANTATION_NOT_FOUND") return <>PLANTACIÓN_NO_ENCONTRADA</>;
  }

  const tabSlotProps = {
    root: ({ selected }: { selected: boolean }) =>
      selected
        ? {
            className: styles.selected,
          }
        : {},
  };

  return (
    <FormProvider {...methods}>
      <form>
        <PageTitle
          title={
            mode === Mode.create
              ? "Registrar finca"
              : data?.generalInfo?.name || ""
          }
          renderActions={() =>
            mode === Mode.preview ? (
              <Button color="gray" onClick={navigateToList}>
                <ArrowLeftIcon width={16} height={16} />
                Volver al listado
              </Button>
            ) : (
              <>
                <Button
                  color="gray"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <CloseIcon width={16} height={16} />
                  Salir
                </Button>
                <Button
                  color="base"
                  onClick={methods.handleSubmit(onSubmit)}
                  disabled={!isValid}
                >
                  <OkIcon width={16} height={16} />
                  Guardar
                </Button>
              </>
            )
          }
        />

        <Tabs defaultValue={1}>
          <TabsList className={styles.tab_list}>
            <Tab value={1} className={styles.tab} slotProps={tabSlotProps}>
              Datos generales
            </Tab>
            <Tab value={2} className={styles.tab} slotProps={tabSlotProps}>
              Datos financieros
            </Tab>
            <Tab value={3} className={styles.tab} slotProps={tabSlotProps}>
              Departamento de ventas
            </Tab>
          </TabsList>
          <TabPanel value={1}>
            <GeneralDataForm
              mode={mode}
              checks={checks}
              legalEntities={legalEntities}
              transferDetails={transferDetails}
            />
          </TabPanel>
          <TabPanel value={2}>
            <FinancialDataForm
              mode={mode}
              checks={checks}
              legalEntities={legalEntities}
              transferDetails={transferDetails}
            />
          </TabPanel>
          <TabPanel value={3}>
            <SalesDataForm mode={mode} />
          </TabPanel>
        </Tabs>
      </form>
      <Modal open={open} onClose={() => setOpen(false)}>
        <AdminConfirmationForm
          title={L18nEs.pages.plantation.create.modals.approveReset}
          onReset={() => setOpen(false)}
          onSubmit={navigateToList}
        />
      </Modal>
    </FormProvider>
  );
};
