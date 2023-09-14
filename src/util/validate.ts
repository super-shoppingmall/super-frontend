type FormTextField = 'EMAIL' | 'PASSWORD' | 'PHONE';

const getRegExp = (type: FormTextField) => {
	switch (type) {
		case 'EMAIL':
			return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
		case 'PASSWORD':
			return /^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[a-z])(?=.*[^\w\d\s])).{8,30}$/gm;
		case 'PHONE':
			return /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
	}
};

const textFieldFormat = (type: FormTextField, field: string) => {
	const regexp = getRegExp(type);
	const isFieldValid = regexp.test(field);
	return isFieldValid;
};

const textFieldNotEmpty = (field: string) => {
	return field.length > 0;
};

export default {
	textFieldFormat,
	textFieldNotEmpty,
};
