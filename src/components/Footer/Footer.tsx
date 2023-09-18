import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<footer className='dark:bg-gray-900 m-4'>
			<div className='w-full p-4 md:py-8 border-t-[1px] border-gray-200'>
				<span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
					© 2023
					<Link to='/' className='hover:underline'>
						SUPER PET
					</Link>
					. All Rights Reserved.
				</span>
			</div>
		</footer>
	);
};

export default Footer;
