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
			],
			isShowingAnswer: false
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
		scrn.style.color = "black";
		if(scrn.value===errMessage)
			scrn.value = "";
		if(this.state.isShowingAnswer&&String(parseInt(label))===String(label))
			scrn.value = ""
		this.setState({isShowingAnswer: false})
		switch(label){
			case "C":
				scrn.value = "";
				break;
			case "D":
				scrn.value = scrn.value.substring(0,scrn.value.length-1);
				break;
			case "=":
				if(scrn.value.length){
					try {
						scrn.value = String(Function("return "+scrn.value)());
						scrn.style.color = "blue";
						this.setState({isShowingAnswer: true})
					}
					catch(err) {
						scrn.value = errMessage;
						scrn.style.color = "red";
						return;
					}
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
