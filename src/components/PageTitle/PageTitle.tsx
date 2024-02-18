import { ReactNode } from "react";
import styles from "./PageTitle.module.css";

export const PageTitle = ({
  title,
  renderActions = () => <></>,
}: {
  title: string;
  renderActions?: () => ReactNode;
}) => {
  return (
    <div className={styles.title}>
      <h1>{title}</h1>
      <div className={styles.actions}>
        {renderActions()}
        {/* <Button color="gray" onClick={() => {}}>
          <CloseIcon width={16} height={16} />
          Salir
        </Button>
        <Button color="base" onClick={() => {}} disabled={true}>
          <OkIcon width={16} height={16} />
          Guardar
        </Button> */}
      </div>
    </div>
  );
};
