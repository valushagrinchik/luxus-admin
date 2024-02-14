import { Button } from "../../../controls/Button/Button";
import { SortListGroup } from "../../../lib/constants";
import styles from "./AdminConfirmationForm.module.css";

interface AdminConfirmationFormProps {
  type: SortListGroup;
  onSubmit: () => void;
  onReset: () => void;
}
export const AdminConfirmationForm = ({
  type,
  onSubmit,
  onReset,
}: AdminConfirmationFormProps) => {
  const titles: Record<SortListGroup, string> = {
    [SortListGroup.group]:
      "¿Estás seguro de que deseas eliminar de forma permanente el grupo de la plataforma?",
    [SortListGroup.category]:
      "¿Estás seguro de que deseas eliminar de forma permanente la categoría de la plataforma?",
    [SortListGroup.sort]:
      "¿Estás seguro de que deseas eliminar de forma permanente la variedad de la plataforma?",
  };

  return (
    <form className={styles.form}>
      <h2 className={styles.title}>{titles[type]}</h2>
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
