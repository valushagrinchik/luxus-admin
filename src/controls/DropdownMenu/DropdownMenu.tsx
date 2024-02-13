import { ReactNode, useState } from "react";
import { ArrowUpIcon } from "../icons/ArrowUpIcon";
import { ArrowDownIcon } from "../icons/ArrowDownIcon";
import styles from "./DropdownMenu.module.css";

type DropdownMenuProps = {
  title: ReactNode;
  content: ReactNode;
};

export const DropdownMenu = ({ title, content }: DropdownMenuProps) => {
  const [isOpen, onToggle] = useState(true);

  return (
    <>
      <div onClick={() => onToggle(!isOpen)} className={styles.title}>
        {title}
        {isOpen ? (
          <ArrowUpIcon color="#155EEF" />
        ) : (
          <ArrowDownIcon color="#155EEF" />
        )}
      </div>
      {isOpen && content}
    </>
  );
};
