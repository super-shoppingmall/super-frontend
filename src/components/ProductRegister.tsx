import axios from 'axios';
import { ChangeEvent, useState } from 'react';

import { useNavigate } from 'react-router-dom';

const ProductRegister = () => {
	const navigate = useNavigate();
	// state 지정
	const [productName, setProductName] = useState<string>('');
	const [productCategory, setProductCategory] = useState<string>('');
	const [productPrice, setProductPrice] = useState<number>(0);
	const [productCount, setProductCount] = useState<number>(0);
	const [productInfo, setProductInfo] = useState<string>('');
	const [productImg, setProductImg] = useState<File[]>([]);
	const [startDate, setStartDate] = useState<string>('');
	const [closingAt, setclosingAt] = useState<string>('');

	//이미지 추가 handler
	const handleProductImgChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const files = Array.from(e.target.files);
			if (files.length + productImg.length > 5) {
				alert('최대 5개까지만 등록할 수 있습니다.');
				return;
			}
			setProductImg(prevState => [...prevState, ...files]);
		}
	};
	//노출일자 변경 시 유효성 체크
	const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
		const selectedStartDate = e.target.value;
		if (selectedStartDate < closingAt || closingAt == '') {
			setStartDate(e.target.value);
			return;
		}
		alert('시작일은 종료일 이후일 수 없습니다.');
	};

	const handleclosingAtChange = (e: ChangeEvent<HTMLInputElement>) => {
		const selectedclosingAt = e.target.value;
		if (startDate < selectedclosingAt || startDate == '') {
			setclosingAt(e.target.value);
			return;
		}
		alert('종료일은 시작일 이전일 수 없습니다.');
	};

	const dateCheck = () => {
		if (startDate == '' || closingAt == '') {
			alert('노출일자를 선택해주세요.');
			return false;
		}

		return true;
	};
	// 유효성 체크
	const dataCheck = () => {
		if (productName.trim() === '') {
			alert('상품명을 입력하세요.');
			return false;
		}
		if (productCategory === '') {
			alert('등록할 카테고리를 선택하세요.');
			return false;
		}
		if (productPrice === 0 || productPrice < 0) {
			alert('가격은 1원 이상 등록이 가능합니다');
			return false;
		}
		if (productCount === 0 || productCount < 0) {
			alert('상품은 1개 이상 등록이 가능합니다.');
			return false;
		}
		if (productInfo.trim() === '') {
			alert('상품 상세 내용을 작성해주세요.');
			return false;
		}
		if (productImg.length === 0) {
			alert('이미지 1개 이상 등록해주세요.');
			return false;
		}
		const datevalue = dateCheck();
		if (!datevalue) {
			return false;
		}
		return true;
	};

	const register = async () => {
		if (dataCheck()) {
			const url = 'http://3.34.114.250:8080/api+/products/sale/register';
			const data = {
				memberId: 'test@test.com',
				productName: productName,
				categoryName: productCategory,
				productPrice: productPrice,
				productQuantity: productCount,
				productDetail: productInfo,
				productImageFiles: productImg,
				closingAt: closingAt,
			};
			try {
				const response = await axios.post(url, data);
				console.log(response.data);
				alert('등록되었습니다.');
				navigate('/productlist');
			} catch (error) {
				console.error(`Error occurred: ${error}`);
			}
		}
	};

	return (
		<main className='.container m-14'>
			<div className='w-3/4'>
				<div className='font-bold text-xl mb-5'>상품 등록</div>
				<div>
					<form>
						<table className='border border-collapse min-w-full'>
							<tbody>
								<tr className='border'>
									<th scope='row' className='px-6 py-3 bg-gray-50 bg-gray-300  w-36'>
										상품명
									</th>
									<td className='px-6 w-48 w-3/5'>
										<input
											type='text'
											placeholder='상품명을 입력하세요'
											className='w-full'
											value={productName}
											onChange={e => {
												setProductName(e.target.value);
											}}
										/>
									</td>
								</tr>
								<tr className='border'>
									<th scope='row' className='px-6 py-3 bg-gray-50 bg-gray-300 w-36'>
										카테고리
									</th>
									<td className='px-6 w-48'>
										<select
											id='category'
											value={productCategory}
											onChange={e => {
												setProductCategory(e.target.value);
											}}
										>
											<option value=''>카테고리를 선택하세요</option>
											<option value='사료'>사료</option>
											<option value='간식'>간식</option>
											<option value='용품'>용품</option>
										</select>
									</td>
								</tr>
								<tr className='border'>
									<th scope='row' className='px-6 py-3 bg-gray-50 bg-gray-300 w-36'>
										상품가격
									</th>
									<td className='px-6 w-48'>
										<input
											type='Number'
											placeholder='상품가격을 입력하세요'
											className='w-full'
											value={productPrice}
											onChange={e => {
												setProductPrice(Number(e.target.value));
											}}
										/>
									</td>
								</tr>
								<tr className='border'>
									<th scope='row' className='px-6 py-3 bg-gray-50 bg-gray-300 w-36'>
										판매개수
									</th>
									<td className='px-6 w-48'>
										<input
											type='Number'
											placeholder='상품개수를 입력하세요'
											className='w-full'
											value={productCount}
											onChange={e => {
												setProductCount(Number(e.target.value));
											}}
										/>
									</td>
								</tr>
								<tr className='border'>
									<th scope='row' className='px-6 py-3 bg-gray-50 bg-gray-300 w-36 h-36'>
										상품상세
									</th>
									<td className='px-6 w-48 h-36 p-1'>
										<textarea
											placeholder='상품상세를 입력하세요'
											className='w-full h-full'
											value={productInfo}
											onChange={e => {
												setProductInfo(e.target.value);
											}}
										/>
									</td>
								</tr>
								<tr className='border'>
									<th scope='row' className='px-6 py-3 bg-gray-50 bg-gray-300 w-36'>
										이미지 등록
									</th>
									<td className='px-6 w-48'>
										{/* <input
											type='file'
											onChange={e => {
												setProductImg(Array.from(e.target.files || []));
											}}
										/> */}
										{Array.from({ length: 5 }).map((_, index) => (
											<div key={index}>
												<label className='file-label' htmlFor={`chooseFile${index}`}>
													첨부파일 {index + 1}
												</label>
												<input
													className='file'
													id={`chooseFile${index}`}
													type='file'
													onChange={handleProductImgChange}
												/>
											</div>
										))}
									</td>
								</tr>
								<tr className='border'>
									<th scope='row' className='px-6 py-3 bg-gray-50 bg-gray-300 w-36'>
										상품노출일자
									</th>
									<td className='px-6 w-48'>
										<div className='flex'>
											{/* <div className=' mr-5'>
											<input type='radio' name='active' id='able' checked />
											<label htmlFor='able'>노출</label>
										</div>
										<div>
											<input type='radio' name='active' id='disable' />
											<label htmlFor='disable'>미노출</label> 
										</div>*/}
											<input type='date' value={startDate} onChange={handleStartDateChange} />
											<div> ~ </div>
											<input type='date' value={closingAt} onChange={handleclosingAtChange} />
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</form>
				</div>
				<div className='float-right'>
					<button className='border px-5 py-1.5 bg-red-200 m-3' onClick={() => history.back()}>
						취소
					</button>
					<button
						className='border px-5 py-1.5 bg-blue-300'
						onClick={() => {
							register();
						}}
					>
						등록
					</button>
				</div>
			</div>
		</main>
	);
};

export default ProductRegister;
