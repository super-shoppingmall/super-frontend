type Theme = 'PRIMARY' | 'SECONDARY';

interface InputField {
	theme: Theme;
	id: string;
	label: string;
	children: React.ReactNode;
}

const InputField = ({ theme, id, label, children }: InputField) => {
	const isPrimary = theme === 'PRIMARY';

	return (
		<div className='sm:col-span-2 mt-3'>
			<label htmlFor={id} className={isPrimary ? 'sr-only' : 'block mb-1 text-sm '}>
				{label}
			</label>
			<div className='relative flex rounded-sm shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md py-1 px-2'>
				{children}
			</div>
		</div>
	);
};

export default InputField;