import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../store/actions/userAction/user_action';
import { withRouter } from 'react-router-dom';

function ResisterPage(props) {
	const dispatch = useDispatch();
	const [Email, setEmail] = useState('');
	const [Name, setName] = useState('');
	const [Password, setPassword] = useState('');
	const [ConfirmPassword, setConfirmPassword] = useState('');

	const onEmailHandler = e => {
		setEmail(e.currentTarget.value);
	};
	const onNameHandler = e => {
		setName(e.currentTarget.value);
	};
	const onPasswordHandler = e => {
		setPassword(e.currentTarget.value);
	};
	const onConfirmPasswordHandler = e => {
		setConfirmPassword(e.currentTarget.value);
	};
	const onSubmitHandler = (e) => {
		e.preventDefault();
		if(Password != ConfirmPassword) return alert("비밀번호가 일치 하지 않습니다.")
		let config = {
			email : Email,
			password:Password,
			name:Name,
		}
		dispatch((registerUser(config)))
			.then(res => {
				if (res.payload.success) {
					props.history.push("/login")
				} else {
					alert("Failed to sign up")
				}
			})
	};
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItem: 'center',
				width: '100%',
				height: '100vh',
			}}>
			<form style={{ display: 'flex', justifyContent:'center',flexDirection: 'column' }} onSubmit={onSubmitHandler}>
				<label>Email</label>
				<input type="email" value={Email} onChange={onEmailHandler} />
				<label>Name</label>
				<input type="text" value={Name} onChange={onNameHandler} />
				<label>Password</label>
				<input type="password" value={Password} onChange={onPasswordHandler}/>
				<label>ConfirmPassword</label>
				<input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
				<button type="submit">Resister</button>
			</form>
		</div>
	);
}

export default withRouter(ResisterPage);
