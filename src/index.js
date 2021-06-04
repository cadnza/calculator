import React from 'react';
import ReactDOM from 'react-dom';

class Keyboard extends React.Component {
	constructor(){
		super();
		this.state = {
			btns: [
				"7","8","9","+",
				"4","5","6","-",
				"1","2","3","*",
				"C","0","D","/"
			]
		};
	}
	render(){
		var buttons = [];
		var newButton;
		for(var i = 0; i<this.state.btns.length; i++){
			const label = this.state.btns[i];
			newButton = (
				<div key={i}>
					<button
						op={label}
						onClick={() => this.interpret(label)}
					>
						{label}
					</button>
				</div>
			);
			buttons.push(newButton)
		}
		return <div id="keyGrid">{buttons}</div>;
	}
	interpret = label => {
		console.log(label);
	}
}

ReactDOM.render(
  <Keyboard />,
  document.getElementById('keyboard')
);