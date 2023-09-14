import { useState, useRef, useEffect } from 'react';

export default function FilePreviewer() {
	const [imgFile, setImgFile] = useState<File | null>();
	const [imagePreview, setImagePreview] = useState<string | null>('');
	const filePicekerRef = useRef<HTMLInputElement>(null);

	function previewFile(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files !== null) {
			const file = e.target.files[0];
			if (file.type.includes('image')) {
				setImgFile(file);
			} else {
				setImgFile(null);
			}
		}
	}

	useEffect(() => {
		if (imgFile) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(imgFile);
		} else {
			setImagePreview(null);
		}
	}, [imgFile]);

	return (
		<div>
			<div>
				<input ref={filePicekerRef} accept='image/*' onChange={previewFile} type='file' hidden />
				<button className='border p-4' onClick={() => filePicekerRef?.current?.click()}>
					사진 업로드하기
				</button>
			</div>
			<div className='preview'>
				{imagePreview != null && <img src={imagePreview as string} alt='' />}
			</div>
		</div>
	);
}
