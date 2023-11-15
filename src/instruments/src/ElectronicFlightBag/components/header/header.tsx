import React from 'react';
import './header.scss';
import { useSimVar, useObjLocalVar } from 'instruments/common/Hooks/simVars';

import { TbSignal4G } from 'react-icons/tb';
import {
	MdOutlineSignalCellularAlt1Bar,
	MdOutlineSignalCellularAlt2Bar,
	MdOutlineSignalCellularAlt,
} from 'react-icons/md';
import { IoIosWifi } from 'react-icons/io';

export const Header = () => {
	return (
		<div className="headerWrapper">
			<div>Time</div>
			<IconProvider />
		</div>
	);
};

const IconProvider = () => {
	const [altitudeAgl] = useSimVar('RADIO HEIGHT', 'feet');
	const [wifiOn] = useObjLocalVar('WIFI_AVAILABLE', 'bool');

	const GetIcon = () => {
		if (wifiOn) return <IoIosWifi />;
		else {
			if (altitudeAgl < 2000) {
				return (
					<>
						<MdOutlineSignalCellularAlt />
						<TbSignal4G />
					</>
				);
			} else if (altitudeAgl < 4000) {
				return (
					<>
						<MdOutlineSignalCellularAlt2Bar />
						<TbSignal4G />
					</>
				);
			} else {
				return <MdOutlineSignalCellularAlt1Bar />;
			}
		}
	};

	return (
		<div>
			<GetIcon />
		</div>
	);
};
