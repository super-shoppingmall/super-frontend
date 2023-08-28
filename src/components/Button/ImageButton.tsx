interface ImageButton {
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	imageLink: string;
	text: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ImageButton = ({ type = 'button', imageLink, text, onClick }: ImageButton) => {
	return (
		<button type={type} className='block h-full' onClick={onClick}>
			<img src={imageLink} alt={text} />
		</button>
	);
};

export default ImageButton;
