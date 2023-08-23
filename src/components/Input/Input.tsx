interface Input {
	type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
	label: string;
	id: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Input = ({ type = 'text', label, id, onChange }: Input) => {
	return (
		<div className='sm:col-span-2'>
			<label htmlFor={label} className='sr-only'>
				{label}
			</label>
			<div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset focus-within:ring-zinc-600 sm:max-w-md'>
				<input
					type={type}
					name={id}
					id={id}
					className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus:outline-none '
					placeholder={label}
					onChange={onChange}
				/>
			</div>
		</div>
	);
};

export default Input;
