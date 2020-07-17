import React, { useState } from 'react';
import { Collapse, Checkbox } from 'antd';
const { Panel } = Collapse;
const CheckBox = props => {
	const [Checked, setChecked] = useState([]);
	const renderCheckBox = () =>
		props.list &&
		props.list.map((value, index) => (
			<React.Fragment key={index}>
				<Checkbox
					onChange={() => handleToggle(value.id)}
					checked={Checked.indexOf(value.id) === -1 ? false : true}></Checkbox>
				<span>{value.value}</span>
			</React.Fragment>
		));
	const handleToggle = value => {
		const currentIdx = Checked.indexOf(value);
		const newChecked = [...Checked];
		if (currentIdx === -1) newChecked.push(value);
		else newChecked.splice(currentIdx, 1);
		setChecked([...newChecked]);
		props.handleFilters(newChecked);
	};
	return (
		<div>
			<Collapse defaultActiveKey={['0']}>
				<Panel header='option filter' key='1'>
					{renderCheckBox()}
				</Panel>
			</Collapse>
		</div>
	);
};

export default CheckBox;
