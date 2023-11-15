import React, { FC } from 'react';
import { useSimVar } from './simVars';

interface ElectricityProps {
	/**
	 * @param {number} index Index of specific A:CIRCUIT ON needed to to power said display
	 */
	index: number;
	children: React.ReactElement;
	/**
	 * @param {boolean} param Pass true to force power to display for development
	 */
	override: boolean;
}

const Electricity: FC<ElectricityProps> = (
	props: ElectricityProps
): JSX.Element => {
	const [isOn] = useSimVar(`A:CIRCUIT ON:${props.index}`, 'Bool');
	if (!props.override && !isOn) return <div></div>;
	return <div>{props.children}</div>;
};

export default Electricity;
