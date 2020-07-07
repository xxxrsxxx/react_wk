//rcf
import React from 'react';

const Test = () => {
	console.log('test1');
};

const Test2 = () => {
	console.log('test2');
};
export default { Test, Test2 };

// rcc
import React, { Component } from 'react';

class Test extends Component {
	render() {
		return <div></div>;
	}
}

export default Test;

//rsf;

import React from 'react';

function Test(props) {
	return <div></div>;
}

export default Test;

//rsc
import React from 'react';

const Test = () => {
	return <div></div>;
};

export default Test;
