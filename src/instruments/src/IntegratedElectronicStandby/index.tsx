import './index.scss';
import React, { Component } from 'react';
import IESRoot from './components/IESRoot/IESRoot';
import { render } from '../../common/Hooks';

class IntegratedElectronicStandby extends Component {
	state = {
		isAligned: 0, //boolean overrated, we are simply enjoyers of numbers here
	};
	Align = (): void => {
		this.setState({
			isAligned: 1,
		});
	};
	componentDidMount = (): void => {
		setTimeout(this.Align, 4000); //90000ms is frfr number this just for debug cuh cause life to short to waste 90 seconds every time im tryna see if my shitty code works
	};
	render = (): React.ReactNode => {
		return (
			<div>
				<IESRoot isAligning={this.state.isAligned} />
			</div>
		);
	};
}
render(<IntegratedElectronicStandby />);
