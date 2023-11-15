import React, { FC, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { SimbriefResponse } from './simbriefType';

interface SimbriefInterfaceProps {
	username?: string;
	userID?: string;
	json?: boolean;
	setData: any;
}

export const SimbriefInterface: FC<SimbriefInterfaceProps> = (
	props: SimbriefInterfaceProps
): JSX.Element => {
	const [data, setData] = useState<SimbriefResponse | null>(null);
	const baseURL: string = 'https://www.simbrief.com/api/xml.fetcher.php?';
	let userIdEndpoint: string = `userid=`;
	let usernameEndpoint: string = `username={}`;
	const jsonEndpoint: string = '&json=1';
	if (props.userID?.length != 0) {
		userIdEndpoint = `userid=${props.userID}`;
	}
	if (props.username?.length != 0) {
		usernameEndpoint = `username={${props.username}}`;
	}

	const UrlBuilder = (hasUsername: boolean, hasUserID: boolean): string => {
		// we will use userID if we have both username and userID. we always want json return type
		let completeUrl: string;
		if (hasUserID && hasUsername) {
			completeUrl = baseURL.concat(userIdEndpoint, jsonEndpoint);
			return completeUrl;
		} else if (hasUserID) {
			completeUrl = baseURL.concat(userIdEndpoint, jsonEndpoint);
			return completeUrl;
		} else if (hasUsername) {
			completeUrl = baseURL.concat(usernameEndpoint, jsonEndpoint);
			return completeUrl;
		} else {
			toast.error('SimbriefInterface: error in UrlBuilder()');
			return 'Simbrief URL ERR: unable to create a URL';
		}
	};

	const fetchSimbrief = (): void => {
		let url = UrlBuilder(
			props.username?.length != 0 ? true : false,
			props.userID?.length != 0 ? true : false
		);
		fetch(url)
			.then((r) => r.json())
			.then((data) => {
				setData(data);
			})
			.catch((e) => console.log(e));
	};

	return (
		<div>
			<div></div>
			<ToastContainer />
		</div>
	);
};
