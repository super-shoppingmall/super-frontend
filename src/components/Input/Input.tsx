import { InputHTMLAttributes } from 'react';

interface Input extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	id: string;
}

const Input = ({ label, id }: Input) => {
	return (
		<div className='sm:col-span-2'>
			<label htmlFor={label} className='sr-only'>
				{label}
			</label>
			<div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md py-1 px-2'>
				<input
					name={id}
					id={id}
					className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus:outline-none '
					placeholder={label}
				/>
			</div>
		</div>
	);
};

export default Input;
