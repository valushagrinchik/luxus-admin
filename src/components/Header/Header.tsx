import React from 'react'

import { HamburgerIcon } from '../../controls/icons/HamburgerIcon';
import styles from './Header.module.css';

export const Header = ({onMenuToggle}:{onMenuToggle: () => void}) => { 
	return <header>
		 <div className={styles.menu_toggle_btn} onClick={onMenuToggle}><HamburgerIcon /></div>
	</header>
}