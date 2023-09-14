interface BackDropProps {
	handleModalClose(): void;
}

const Backdrop = ({ handleModalClose }: BackDropProps) => {
	return (
		<div
			className='fixed top-0 left-0 w-full h-screen z-10 bg-black bg-opacity-20'
			onClick={handleModalClose}
		/>
	);
};

export default Backdrop;
