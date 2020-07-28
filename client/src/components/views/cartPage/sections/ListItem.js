import React from 'react';
import './ListItem.css';
const ListItem = props => {
	const renderCartImage = images => {
		if (images.length > 0) {
			let image = images[0];
			return `/${image}`;
		}
	};
	console.log('LIst', props);
	const renderItems = () =>
		props.products &&
		props.products.product.map((product, index) => (
			<tr key={index}>
				<td>
					<img
						style={{ width: '70px' }}
						alt='product'
						src={renderCartImage(product.images)}
					/>
				</td>
				<td>{product.quantity} EA</td>
				<td>$ {product.price * product.quantity}</td>
				<td>
					<button onClick={() => props.removeItem(product._id)}>Remove</button>
				</td>
			</tr>
		));

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Product Image</th>
						<th>Product Quantity</th>
						<th>Product Price</th>
						<th>Remove from Cart</th>
					</tr>
				</thead>

				<tbody>{renderItems()}</tbody>
			</table>
		</div>
	);
};

export default ListItem;
