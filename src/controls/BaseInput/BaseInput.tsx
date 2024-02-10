import React from 'react'
import { Input } from '@mui/base/Input';

export const BaseInput = (props: any) => {
	return <Input slotProps={{ input: { className: 'base_input' } }} {...props}></Input>
}