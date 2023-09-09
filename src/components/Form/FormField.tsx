interface FormField {
	type: React.InputHTMLAttributes<HTMLInputElement>['type'];
	onChange: React.InputHTMLAttributes<HTMLInputElement>['onChange'];
	label: string;
	id: string;
	value: string;
}

const FormField = ({ label, id, type, value, onChange }: FormField) => {
	return (
		<div className='sm:col-span-2 mt-3'>
			<label htmlFor={label} className='sr-only'>
				{label}
			</label>
			<div className='flex rounded-sm shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md py-1 px-2'>
				<input
					type={type}
					value={value}
					onChange={onChange}
					name={id}
					id={id}
					className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus:outline-none'
					placeholder={label}
				/>
			</div>
		</div>
	);
};

export default FormField;
