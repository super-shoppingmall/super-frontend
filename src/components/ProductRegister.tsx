import React from 'react';

const ProductRegister = () => {
	return (
		<main className='.container m-14'>
			<div className='w-3/4'>
				<div className='font-bold text-xl mb-5'>상품 등록</div>
				<div>
					<table className='border border-collapse min-w-full'>
						<tbody>
							<tr className='border'>
								<th scope='row' className='px-6 py-3 bg-gray-50 bg-gray-300  w-36'>
									상품명
								</th>
								<td className='px-6 w-48 w-3/5'>
									<input type='text' placeholder='상품명을 입력하세요' className='w-full' />
								</td>
							</tr>
							<tr className='border'>
								<th scope='row' className='px-6 py-3 bg-gray-50 bg-gray-300 w-36'>
									카테고리
								</th>
								<td className='px-6 w-48'>
									<input
										list='category'
										id='category-choice'
										name='category-choice'
										className='border'
									/>
									<datalist id='category'>
										<option value='선택하세요' selected></option>
										<option value='상의'></option>
										<option value='하의'></option>
										<option value='양말'></option>
									</datalist>
								</td>
							</tr>
							<tr className='border'>
								<th scope='row' className='px-6 py-3 bg-gray-50 bg-gray-300 w-36'>
									상품가격
								</th>
								<td className='px-6 w-48'>
									<input type='Number' placeholder='상품가격을 입력하세요' className='w-full' />
								</td>
							</tr>
							<tr className='border'>
								<th scope='row' className='px-6 py-3 bg-gray-50 bg-gray-300 w-36'>
									판매개수
								</th>
								<td className='px-6 w-48'>
									<input type='Number' placeholder='상품개수를 입력하세요' className='w-full' />
								</td>
							</tr>
							<tr className='border'>
								<th scope='row' className='px-6 py-3 bg-gray-50 bg-gray-300 w-36 h-36'>
									상품상세
								</th>
								<td className='px-6 w-48 h-36'>
									<input
										type='text'
										placeholder='상품상세를 입력하세요'
										className='w-full h-full'
									/>
								</td>
							</tr>
							<tr className='border'>
								<th scope='row' className='px-6 py-3 bg-gray-50 bg-gray-300 w-36'>
									이미지 등록
								</th>
								<td className='px-6 w-48'>
									<input type='file' />
								</td>
							</tr>
							<tr className='border'>
								<th scope='row' className='px-6 py-3 bg-gray-50 bg-gray-300 w-36'>
									상품노출여부
								</th>
								<td className='px-6 w-48'>
									<div className='flex'>
										<div className=' mr-5'>
											<input type='radio' name='active' id='able' checked />
											<label htmlFor='able'>노출</label>
										</div>
										<div>
											<input type='radio' name='active' id='disable' />
											<label htmlFor='disable'>미노출</label>
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className='float-right'>
					<button className='border px-5 py-1.5 bg-red-200 m-3'>취소</button>
					<button className='border px-5 py-1.5 bg-blue-300'>등록</button>
				</div>
			</div>
		</main>
	);
};

export default ProductRegister;
