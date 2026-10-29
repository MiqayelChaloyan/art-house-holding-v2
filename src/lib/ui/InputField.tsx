import React, { FC } from 'react';

interface InputProps {
	name?: string;
	className?: string;
	type: string;
	placeholder?: string;
	requiredField?: boolean;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField: FC<InputProps> = ({ className, type, name, placeholder, requiredField, value, onChange }) => {

	return (
		<input
			name={name}
			className={className}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
			required={requiredField}
		/>
	);
};

export default InputField;