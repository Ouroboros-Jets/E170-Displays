import React, { FC, useState } from 'react';
import { Container } from '../Container/container';
import { LockScreen } from './lockScreen';
import { DeviceFlowParams } from 'navigraph/auth';

interface LockScreenProviderProps {}

export const LockScreenProvider: FC<LockScreenProviderProps> = (
	props: LockScreenProviderProps
): JSX.Element => {
	const [locked, setLocked] = useState<boolean>(false);
	const handleUnlock = (): void => {
		setLocked(false);
	};
	const handleLock = (): void => {
		setLocked(true);
	};

	//just gonn store navigraph auth here for now since this state wont change through the efb lifecycle.
	const [params, setParams] = useState<DeviceFlowParams | null>(null);

	return (
		<div>
			<div>
				{locked ? (
					<LockScreen unlockCallback={handleUnlock} />
				) : (
					<Container
						params={params}
						setParams={setParams}
						lockCallback={handleLock}
					/>
				)}
			</div>
		</div>
	);
};
