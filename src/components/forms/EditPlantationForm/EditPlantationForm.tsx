import { Tab, TabPanel, Tabs, TabsList } from "@mui/base";
import { GeneralDataForm } from "./components/GeneralDataForm/GeneralDataForm";
import { FinancialDataForm } from "./components/FinancialDataForm/FinancialDataForm";
import { SalesDataForm } from "./components/SalesDataForm/SalesDataForm";
import { useForm, FormProvider } from "react-hook-form";
import { EditPlantationFormMode, EditPlantationInput } from "./interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaEditPlantation } from "../../../lib/validation";
import L18nEs from "../../../lib/l18n";
import styles from "./EditPlantationForm.module.css";
import { PageTitle } from "../../PageTitle/PageTitle";
import { CloseIcon } from "../../../controls/icons/CloseIcon";
import { OkIcon } from "../../../controls/icons/OkIcon";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../controls/Button/Button";

export const EditPlantationForm = ({
  data = {},
  mode = "edit",
}: {
  data?: any;
  mode?: EditPlantationFormMode;
}) => {
  const navigate = useNavigate();
  // const [open, setOpen] = useState(false);
  const tabSlotProps = {
    root: ({ selected }: { selected: boolean }) =>
      selected
        ? {
            className: styles.selected,
          }
        : {},
  };
  const methods = useForm<EditPlantationInput>({
    resolver: yupResolver(schemaEditPlantation),
    defaultValues: {
      generalInfo: {
        id: data.id || "",
        name: data.name || "",
        country: data.country || "",
        comments: data.comments || "",
        deliveryMethod: data.deliveryMethod || "PERSONALLY",
        termsOfPayment: "",
        postpaidCredit: "",
        postpaidDays: "",
      },
      legalEntities: [],
      transferDetails: [],
      checks: [],
      financialContacts: [],
      salesContacts: [],
    },
  });

  console.log(methods.getValues());

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const openModal = (type: any, data) => {};

  // const renderModalContent = () => {};

  return (
    <FormProvider {...methods}>
      <PageTitle
        title={mode === "create" ? "Registrar finca" : data.name}
        renderActions={() => {
          return (
            <>
              <Button
                color="gray"
                onClick={() => {
                  navigate("/plantations");
                }}
              >
                <CloseIcon width={16} height={16} />
                Salir
              </Button>
              <Button
                color="base"
                onClick={() => {}}
                disabled={!methods.formState.isValid}
              >
                <OkIcon width={16} height={16} />
                Guardar
              </Button>
            </>
          );
        }}
      />
      <form>
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
            <GeneralDataForm mode={mode} />
          </TabPanel>
          <TabPanel value={2}>
            <FinancialDataForm mode={mode} />
          </TabPanel>
          <TabPanel value={3}>
            <SalesDataForm mode={mode} />
          </TabPanel>
        </Tabs>
      </form>
      {/* <Modal open={open} onClose={handleClose}>
        {renderModalContent()}
      </Modal> */}
    </FormProvider>
  );
};
