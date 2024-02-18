import { Button } from "../../../controls/Button/Button";
import styles from "./AdminConfirmationForm.module.css";

interface AdminConfirmationFormProps {
  title: string;
  onSubmit: () => void;
  onReset: () => void;
}
export const AdminConfirmationForm = ({
  title,
  onSubmit,
  onReset,
}: AdminConfirmationFormProps) => {
  return (
    <form className={styles.form}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.actions}>
        <Button color="gray" className={styles.btn} onClick={onReset}>
          No
        </Button>
        <Button color="base" className={styles.btn} onClick={onSubmit}>
          Si
        </Button>
      </div>
    </form>
  );
};
