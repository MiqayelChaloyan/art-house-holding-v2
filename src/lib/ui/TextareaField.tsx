import React, { FC } from 'react';

interface InputProps {
	name?: string;
	className?: string;
	placeholder?: string;
	requiredField?: boolean;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
};

const TextareaField: FC<InputProps> = ({ className, name, placeholder, requiredField, value, onChange }) => {
	return (
		<textarea
			name={name}
			className={className}
			placeholder={placeholder}
			value={value}
			onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e)}
			required={requiredField}
		/>
	);
};

export default TextareaField;