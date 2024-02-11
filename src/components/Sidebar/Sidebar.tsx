import React from 'react'
import Drawer from '@mui/material/Drawer';

export const Sidebar = ({isOpen, onClose}: {isOpen: boolean, onClose: () => void}) => {
	return <div>
		 <Drawer
				anchor={'left'}
				open={isOpen}
				onClose={onClose}
			>
				Something
			</Drawer>
	</div>
}