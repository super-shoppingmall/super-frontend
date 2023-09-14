import { PropsWithChildren } from 'react';

const Modal = ({ children }: PropsWithChildren) => {
	return <div className='fixed top-20 left-1/4 w-1/2 bg-white shadow-md z-20'>{children}</div>;
};

export default Modal;
