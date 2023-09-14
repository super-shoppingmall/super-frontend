import { useState, MouseEvent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Modal from '../Modal/Modal';
import Backdrop from '../Modal/Backdrop';

interface PointRefillProps {
	handleUpdatePaymoney: (paymoney: number) => void;
}

interface RefillProps {
	isRefilled: boolean;
	handleUpdatePaymoney: (paymoney: number) => void;
}

const PointRefill = ({ handleUpdatePaymoney }: PointRefillProps) => {
	const [isRefilled, setIsRefilled] = useState<boolean>(false);

	/** Refill Component (추후 따로 분리 예정) */
	const Refill = ({ isRefilled }: RefillProps) => {
		const [refillAmount, setRefillAmount] = useState<number>(0);
		const [amountIsSelected, setAmountIsSelected] = useState<boolean>(true);

		const amountList = [1000, 5000, 10000, 30000, 50000];

		/** 금액 버튼 선택 시 변수에 값 저장 및 보더 효과 */
		const handleClickAmt = (event: MouseEvent<HTMLElement>) => {
			const selectedId = (event.target as HTMLButtonElement).getAttribute('id');

			/** ts null-check 관련 처리 */
			if (selectedId === null) {
				setAmountIsSelected(false);
				return;
			}

			/** 선택한 충전 금액에 border 처리 */
			const selectedAmtBtn = document.getElementById(selectedId);
			if (selectedAmtBtn === null) return;
			selectedAmtBtn.className += ' border-2 border';
			setRefillAmount(Number((event.target as HTMLButtonElement).getAttribute('value')));
		};

		/** 선택한 충전 금액만큼 충전 api 호출 */
		const handleSubmitAmt = async () => {
			if (refillAmount === 0) {
				setAmountIsSelected(false);
				return;
			}

			const response = await fetch('http://3.34.114.250:8080/api/paymoney', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					paymoney: refillAmount,
				}),
			});

			const result = await response.json();
			if (result.status.includes('200')) {
				setIsRefilled(true);
				setAmountIsSelected(false);
				setRefillAmount(0);
				handleUpdatePaymoney(result.message);
			}
		};

		/** 기타 금액 입력 시 실행되는 함수 */
		const onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
			setRefillAmount(Number(e.currentTarget.value));
		};

		useEffect(() => {
			setAmountIsSelected(true);
		}, []);

		return (
			<div>
				<header className='text-xl font-medium px-4 py-4 text-center'>
					<h1>페이머니 충전하기</h1>
				</header>
				<hr />
				{!isRefilled && (
					<>
						<main className='px-2 py-4 flex flex-col gap-4'>
							<div className='pl-4 text-medium'>충전할 금액을 선택해 주세요.</div>
							<div className='grid grid-cols-3 w-full text-center items-center gap-4 px-4'>
								{amountList.map(amt => {
									const className =
										amt === refillAmount
											? 'border border-2 border-black py-4'
											: 'border border-1 border-black py-4';

									return (
										<button
											key={amt}
											id={`amt_${amt}`}
											value={amt}
											className={className}
											onClick={handleClickAmt}
										>
											{amt.toLocaleString()}원
										</button>
									);
								})}
								<input
									id='amt_other'
									type='text'
									className='border border-black py-4 text-center'
									placeholder='기타금액'
									onChange={onChangeInput}
								></input>
							</div>
							<div className='px-4'>
								{!amountIsSelected && (
									<div className='text-red-500'>충전할 금액이 선택되지 않았습니다.</div>
								)}
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
							<button
								className='bg-black w-1/5 px-4 py-2 text-xs text-white'
								onClick={handleSubmitAmt}
							>
								충전
							</button>
						</footer>
					</>
				)}
				{isRefilled && (
					<>
						<main className='px-4 py-4 flex flex-col'>
							<div className='text-base px-4 py-4 text-center'>충전이 완료되었습니다.</div>
						</main>
						<hr />
						<footer className='flex justify-end px-6 py-4 gap-2'>
							<button
								className='bg-black w-1/5 px-4 py-2 text-xs border border-black text-white'
								onClick={handleModalClose}
							>
								닫기
							</button>
						</footer>
					</>
				)}
			</div>
		);
	};

	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const handleModalOpen = () => {
		setModalOpen(true);
	};

	const handleModalClose = () => {
		setModalOpen(false);
		setIsRefilled(false);
	};

	const overlayElem = document.getElementById('overlays') as HTMLElement;

	return (
		<>
			{modalOpen && createPortal(<Backdrop handleModalClose={handleModalClose} />, overlayElem)}
			{modalOpen &&
				createPortal(
					<Modal>
						<Refill isRefilled={isRefilled} handleUpdatePaymoney={handleUpdatePaymoney} />
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
