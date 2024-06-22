import { Field } from 'payload';

export const validateHexColor = (value: string): true | string => {
	return /^#[0-9A-F]{6}$/i.test(value) ? true : `${value} is not a valid hex color`;
}

const colorField: Field = {
	name: 'color',
	type: 'text',
	validate: validateHexColor,
	required: true,
};

export default colorField;