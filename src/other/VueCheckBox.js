import React from './node_modules/react'

// 仿Vue表单
class VueCheckbox extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			checkBoxes: []
		};
	}

	handleChange = (e) => {
		const value = e.target.value;
		const checkBoxes = this.state.checkBoxes;
		const index = checkBoxes.indexOf(value);
		let newCheckBoxes = [ ...checkBoxes ];

		if (index !== -1) {
			newCheckBoxes.splice(index, 1);
		} else {
			newCheckBoxes.push(value);
		}

		this.setState({
			checkBoxes: newCheckBoxes
		});
	};

	render() {
		const checkBoxes = this.state.checkBoxes;

		return (
			<div>
				<input type="checkbox" value="AAA" onChange={this.handleChange} />
				<input type="checkbox" value="BBB" onChange={this.handleChange} />
				{checkBoxes.map((item) => <span key={item}>{item}</span>)}
			</div>
		);
	}
}

export default VueCheckbox
