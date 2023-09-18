import { PropsWithChildren } from 'react';

const Wrapper = ({ children }: PropsWithChildren) => {
	return <div className='min-h-[90vh]'>{children}</div>;
};

export default Wrapper;
