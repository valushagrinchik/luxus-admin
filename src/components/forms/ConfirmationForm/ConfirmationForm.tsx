import { Button } from "../../../controls/Button/Button";
import { CloseIcon } from "../../../controls/icons/CloseIcon";
import styles from "./ConfirmationForm.module.css";

interface ConfirmationFormProps {
  onSubmit: () => void;
  onReset: () => void;
}
export const ConfirmationForm = ({
  onSubmit,
  onReset,
}: ConfirmationFormProps) => {
  return (
    <form className={styles.form}>
      <h2 className={styles.title}>
        Confirmación
        <CloseIcon className={styles.close_btn} onClick={onReset} />
      </h2>
      <p>Los cambios se registrarán después de la aprobación del supervisor</p>
      <Button color="base" className={styles.btn} onClick={onSubmit}>
        Ok
      </Button>
    </form>
  );
};
