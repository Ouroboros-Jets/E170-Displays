import React, { FC, useEffect } from 'react';
import './container.scss';
import { Header } from '../header/header';
import { Navigraph } from '../NavigraphProvider/navigraphAPIInterface';
import { DeviceFlowParams } from 'navigraph/auth';
import { usePersistentProperty } from 'instruments/common/Hooks/persistence';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ContainerProps {
	lockCallback: () => void;
	params: DeviceFlowParams | null;
	setParams: any;
}

export const Container: FC<ContainerProps> = (props: ContainerProps) => {
	const [bgImage, setBgImage] = usePersistentProperty(
		'EFBBG',
		'https://images6.alphacoders.com/132/1323578.png'
	);
	const handleChange = (event) => {
		setBgImage(event.target.value);
	};

	const handleBgChange = (url: string) => {
		document.documentElement.style.setProperty('--image', `url(${url})`);
	};

	return (
		<div className="container">
			<Header />
			<div style={{ color: 'red' }} onClick={() => props.lockCallback()}>
				press to lock again
			</div>
			<form>
				<input
					type="text"
					name="background image"
					value={bgImage}
					onChange={(e) => setBgImage(e.target.value)}
				/>
			</form>
			<div
				onClick={() => {
					handleBgChange(bgImage);
					toast.success('set new background', { theme: 'dark' });
				}}
			>
				apply BG
			</div>
			<ToastContainer />
			<Navigraph
				params={props.params}
				setParams={props.setParams}
				icao={'KJFK'}
			/>
		</div>
	);
};
