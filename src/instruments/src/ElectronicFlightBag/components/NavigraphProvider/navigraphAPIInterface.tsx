import React, { FC, useEffect, useState, useCallback } from 'react';
import { DeviceFlowParams } from 'navigraph/auth';
import { charts } from './navigraph';
import { useNavigraphAuth } from './useNavigraphAuth';
import QRCode from 'qrcode.react';
import { Chart } from 'navigraph/charts';

interface NavigraphProps {
	icao?: string;
	params: DeviceFlowParams | null;
	setParams: any;
}

export const Navigraph: FC<NavigraphProps> = (props: NavigraphProps) => {
	const [params, setParams] = useState<DeviceFlowParams | null>(null);
	const [chartIndex, setChartIndex] = useState<string | undefined>(undefined);

	const [icao, setIcao] = useState<string>('KJFK');

	useEffect(() => {
		setParams(props.params);
	}, [props.params]);

	const { user, initialized, signIn, signOut } = useNavigraphAuth();

	const fetchChartsIndex = () =>
		charts
			.getChartsIndex({ icao: 'KJFK' })
			.then((d) => setChartIndex(JSON.stringify(d, null, 2)));

	const handleSignIn = useCallback(
		() =>
			signIn((p) => props.setParams(p)).finally(() => props.setParams(null)),
		[signIn]
	);

	const isLoginInProgress = !!params;
	return (
		<div>
			{!initialized && <div>Loading...</div>}

			{!params && !user && (
				<button className="sign-in-button" onClick={handleSignIn}>
					Sign in
				</button>
			)}

			{params?.verification_uri_complete && !user && (
				<div>
					<QRCode value={params.verification_uri_complete} size={250} />
					<a
						className="verification-a"
						href={params.verification_uri_complete}
						target="_blank"
						rel="noreferrer"
					>
						Open sign in page
					</a>
				</div>
			)}
			{user && (
				<>
					<h2>
						Welcome,{' '}
						<strong className="username">
							{user.preferred_username}
						</strong>
					</h2>

					<button className="fetch-button" onClick={fetchChartsIndex}>
						fetch chart index
					</button>
				</>
			)}

			{chartIndex && <pre className="chart-index">{chartIndex}</pre>}
		</div>
	);
};
