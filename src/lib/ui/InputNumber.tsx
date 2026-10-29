import React, { FC } from 'react';

import InputMask from 'react-input-mask';

interface InputProps {
	name?: string;
	className?: string;
	type: string;
	placeholder?: string;
	maskNumber: string | (string | RegExp)[];
	requiredField?: boolean;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputNumber: FC<InputProps> = ({ className, type, name, placeholder, maskNumber, requiredField, value, onChange }) => {

	return (
		<InputMask
			name={name}
			className={className}
			type={type}
			placeholder={placeholder}
			mask={maskNumber}
			value={value}
			onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
			required={requiredField}
		/>
	);
};

export default InputNumber;