import React from "react";

import { HamburgerIcon } from "../../controls/icons/HamburgerIcon";
import styles from "./Header.module.css";
import { useLocation } from "react-router-dom";
import { HEADER_TITLES } from "../../lib/constants";
import { CloseIcon } from "../../controls/icons/CloseIcon";
import { useAuth } from "../../lib/auth";

export const Header = ({
  isOpen,
  onMenuToggle,
}: {
  isOpen: boolean;
  onMenuToggle: () => void;
}) => {
  const { pathname } = useLocation();
  const { user } = useAuth();

  const topLevelSlag = pathname.split("/").filter(Boolean)[0];
  const title = HEADER_TITLES[topLevelSlag as keyof typeof HEADER_TITLES] || "";

  return (
    <header>
      <div className={styles.menu_toggle_btn} onClick={onMenuToggle}>
        {isOpen ? <CloseIcon /> : <HamburgerIcon />}
      </div>
      <span className={styles.title}>{title}</span>
      <span className={styles.user}>{user.email}</span>
    </header>
  );
};
