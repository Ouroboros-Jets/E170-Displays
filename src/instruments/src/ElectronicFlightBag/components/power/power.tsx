import React, { FC, ReactElement } from 'react';
import { useObjLocalVar } from 'instruments/common/Hooks/simVars';

interface PowerProps {
	powered: boolean;
	setPowered: () => void;
	children: any;
}

export const Power: FC<PowerProps> = (props: PowerProps) => {
	const [powered, setPowered] = useObjLocalVar('B_EFBPOWERED', 'bool', 50);

	return <div>{props.powered ? props.children : ''}</div>;
};
