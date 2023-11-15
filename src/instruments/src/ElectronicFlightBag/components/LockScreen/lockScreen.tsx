import React, { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { IoEllipseOutline, IoEllipse } from 'react-icons/io5';
import { TiDelete } from 'react-icons/ti';
import './lockScreen.scss';

type EventCodes = {
	[x: string]: number;
};

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const eventCodes: EventCodes = {
	Digit0: 0,
	Digit1: 1,
	Digit2: 2,
	Digit3: 3,
	Digit4: 4,
	Digit5: 5,
	Digit6: 6,
	Digit7: 7,
	Digit8: 8,
	Digit9: 9,
};

type PasscodeProps = {
	title?: string;
	length?: number;
	errorMessage?: string;
	onLastInputChange: (enteredNumbers: string) => Promise<void>;
	onMessageRemove: () => void;
};

const Passcode = ({
	title = 'Enter Password',
	length = 4,
	errorMessage,
	onLastInputChange,
	onMessageRemove,
}: PasscodeProps) => {
	const [enteredNumbers, setEnteredNumbers] = useState<number[]>([]);

	const isDeleteButtonDisabled = enteredNumbers.length === 0;
	const isPasscodeButtonsDisabled = enteredNumbers.length === length;

	const handleSetEnteredNumbers = useCallback(
		(num: number) => {
			setEnteredNumbers((prev) => [...prev, num]);
			onMessageRemove();
		},
		[onMessageRemove]
	);
	const handleRemoveOneNumber = useCallback(() => {
		setEnteredNumbers((prev) => prev.slice(0, -1));
		onMessageRemove();
	}, [onMessageRemove]);

	const handleRemoveAllNumbers = useCallback(() => {
		setEnteredNumbers([]);
		onMessageRemove();
	}, [onMessageRemove]);

	useEffect(() => {
		if (enteredNumbers.length !== length) return;

		onLastInputChange(enteredNumbers.join(''))
			.then(() => {
				setEnteredNumbers([]);
				onMessageRemove();
			})
			.catch((err) => err);
	}, [enteredNumbers]);

	const emptyDot = <IoEllipseOutline />;
	const filledDot = <IoEllipse />;

	const passcodeLayout = (
		<div>
			{[...Array(length)].map((_, index) => {
				return (
					<Fragment key={index}>
						{enteredNumbers[index] === 0 || enteredNumbers[index]
							? filledDot
							: emptyDot}
					</Fragment>
				);
			})}
		</div>
	);

	return (
		<div className="passcode-component">
			<div className="passcode-centerer">
				<div className="passcode-heading">{title}</div>
				<div className="passcode-input-dots">{passcodeLayout}</div>

				{errorMessage && (
					<div className="error-message-container">
						<div className="error-message">{errorMessage}</div>
					</div>
				)}
				<div className="passcode-button-container">
					{numbers.map((number) => (
						<button
							disabled={isPasscodeButtonsDisabled}
							className={
								number === 0
									? 'passcode-button zero'
									: 'passcode-button'
							}
							onClick={() => handleSetEnteredNumbers(number)}
							key={number}
						>
							{number}
						</button>
					))}

					<button
						className="delete-button"
						disabled={isDeleteButtonDisabled}
						onClick={handleRemoveOneNumber}
					>
						<TiDelete size={140} />
					</button>
				</div>
			</div>
		</div>
	);
};

interface LockScreenProps {
	unlockCallback: () => void;
	password?: string;
}

export const LockScreen: FC<LockScreenProps> = (
	props: LockScreenProps
): JSX.Element => {
	const [errorMessage, setErrorMessage] = useState('');

	const handleMessageRemove = useCallback(() => {
		if (errorMessage) setErrorMessage('');
	}, [errorMessage]);
	return (
		<div>
			<Passcode
				onLastInputChange={async (entererNumbers) => {
					if (
						entererNumbers === props.password ? props.password : '6969'
					) {
						return Promise.resolve(props.unlockCallback());
					}
					return Promise.reject(setErrorMessage('invalid passcode'));
				}}
				errorMessage={errorMessage}
				onMessageRemove={handleMessageRemove}
			/>
		</div>
	);
};
