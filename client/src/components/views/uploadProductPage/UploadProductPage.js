import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import { withRouter } from 'react-router-dom';

import FileUpload from 'components/utils/FileUpload';

const { TextArea } = Input;
const Continents = [
	{ key: 1, value: 'Africa' },
	{ key: 2, value: 'Europe' },
	{ key: 3, value: 'Asia' },
	{ key: 4, value: 'North America' },
	{ key: 5, value: 'South America' },
	{ key: 6, value: 'Austaralia' },
	{ key: 7, value: 'Antarctica' },
];

const UploadProductPage = () => {
	const [Title, setTitle] = useState('');
	const [Description, setDescription] = useState('');
	const [Price, setPrice] = useState(0);
	const [Continent, setContinent] = useState(1);
	const titleChangeHandler = e => {
		setTitle(e.currentTarget.value);
	};
	const descriptionChangeHandler = e => {
		setDescription(e.currentTarget.value);
	};
	const priceChangeHandler = e => {
		setPrice(e.currentTarget.value);
	};
	const continentChangeHandler = e => {
		setContinent(e.currentTarget.value);
	};

	return (
		<div style={{ maxWidth: '700px', margin: '2rem auto' }}>
			<div style={{ textAlign: 'center', marginBottom: '2rem' }}>
				<h2>Product Upload</h2>
			</div>
			<form>
				<FileUpload></FileUpload>
				<br />
				<br />
				<label>이름</label>
				<Input type="text" onChange={titleChangeHandler} value={Title} />
				<label htmlFor="">설명</label>
				<TextArea onChange={descriptionChangeHandler} value={Description}></TextArea>
				<br />
				<br />
				<label htmlFor="">가격($)</label>
				<Input type="number" onChange={priceChangeHandler} value={Price} />
				<br />
				<br />
				<select onChange={continentChangeHandler} value={Continent}>
					{Continents.map(item => (
						<option key={item.key} value={item.key}>
							{item.value}
						</option>
					))}
				</select>
				<br />
				<br />
				<Button>confirm</Button>
			</form>
			UploadProductPage
		</div>
	);
};

export default withRouter(UploadProductPage);
