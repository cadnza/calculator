import React from 'react';
import ReactDOM from 'react-dom';

class Viewer extends React.Component {
	render(){
		const viewScreen = <input type="text" disabled id="screen" title="viewTitle"></input>;
		return viewScreen;
	}
}

class Keyboard extends React.Component {
	constructor(){
		super();
		this.state = {
			btns: [
				"7","8","9","+",
				"4","5","6","-",
				"1","2","3","*",
				"C","0","D","/",
				"(",")",".","="
			]
		};
	}
	render(){
		var buttons = [];
		var newButton;
		var buttonClass;
		for(var i = 0; i<this.state.btns.length; i++){
			const label = this.state.btns[i];
			if(String(parseInt(label))===String(label))
				buttonClass = "digit";
			else
				buttonClass = "nonDigit";
			newButton = (
				<div key={i}>
					<button
						op={label}
						id={"btn"+label}
						class={buttonClass}
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
		const errMessage = "Err";
		const scrn = document.getElementById("screen");
		if(scrn.value===errMessage)
			scrn.value = "";
		switch(label){
			case "C":
				scrn.value = "";
				break;
			case "D":
				scrn.value = scrn.value.substring(0,scrn.value.length-1);
				break;
			case "=":
				try {
					scrn.value = String(Function("return "+scrn.value)());
				}
				catch(err) {
					scrn.value = errMessage;
				}
				break;
			default:
				scrn.value = scrn.value+label;
		}
	}
}

ReactDOM.render(
	<Viewer />,
	document.getElementById('viewer')
)

ReactDOM.render(
  <Keyboard />,
  document.getElementById('keyboard')
);