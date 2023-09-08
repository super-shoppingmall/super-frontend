import { PropsWithChildren, useState, MouseEvent } from 'react';
import { createPortal } from 'react-dom';

interface BackDropProps {
	handleModalClose(): void;
}

const PointRefill = () => {
	const Backdrop = ({ handleModalClose }: BackDropProps) => {
		return (
			<div
				className='fixed top-0 left-0 w-full h-screen z-10 bg-black bg-opacity-20'
				onClick={handleModalClose}
			/>
		);
	};

	const Modal = ({ children }: PropsWithChildren) => {
		return <div className='fixed top-40 left-1/4 w-1/2 bg-white shadow-md z-20'>{children}</div>;
	};

	const Refill = () => {
		const onChangeInput = () => {};

		const handleClickAmt = (event: MouseEvent<HTMLElement>) => {
			console.log((event.target as HTMLButtonElement).getAttribute('value'));
		};

		return (
			<div>
				<header className='text-xl font-medium px-4 py-4 text-center'>
					<h1>페이머니 충전하기</h1>
				</header>
				<hr />
				<main className='px-2 py-4 flex flex-col gap-4'>
					<div className='pl-4 text-medium'>충전할 금액을 선택해 주세요.</div>
					<div className='grid grid-cols-3 w-full text-center items-center gap-4 px-4'>
						<button value='1000' className='border border-black py-4' onClick={handleClickAmt}>
							1,000원
						</button>
						<button value='3000' className='border border-black py-4' onClick={handleClickAmt}>
							3,000원
						</button>
						<button value='10000' className='border border-black py-4' onClick={handleClickAmt}>
							10,000원
						</button>
						<button value='30000' className='border border-black py-4' onClick={handleClickAmt}>
							30,000원
						</button>
						<button value='50000' className='border border-black py-4' onClick={handleClickAmt}>
							50,000원
						</button>
						<input
							type='text'
							className='border border-black py-4 text-center'
							placeholder='기타금액'
							onChange={onChangeInput}
						></input>
					</div>
				</main>
				<hr />
				<footer className='flex justify-end px-6 py-4 gap-2'>
					<button
						className='bg-white w-1/5 px-4 py-2 text-xs border border-black'
						onClick={handleModalClose}
					>
						취소
					</button>
					<button className='bg-black w-1/5 px-4 py-2 text-xs text-white'>충전</button>
				</footer>
			</div>
		);
	};

	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const handleModalOpen = () => {
		setModalOpen(true);
	};

	const handleModalClose = () => {
		setModalOpen(false);
	};

	const overlayElem = document.getElementById('overlays') as HTMLElement;

	return (
		<>
			{modalOpen && createPortal(<Backdrop handleModalClose={handleModalClose} />, overlayElem)}
			{modalOpen &&
				createPortal(
					<Modal>
						<Refill />
					</Modal>,
					overlayElem
				)}
			<div className='w-full bg-black px-4 py-3 cursor-pointer' onClick={handleModalOpen}>
				<div className='text-white text-sm'>페이머니 충전하기</div>
			</div>
		</>
	);
};

export default PointRefill;
