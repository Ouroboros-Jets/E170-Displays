import { User } from 'navigraph/auth';
import React, { useState, useEffect, useContext, createContext } from 'react';
import { auth } from './navigraph';

interface NavigraphAuthContext {
	initialized: boolean;
	user: User | null;
	signIn: typeof auth.signInWithDeviceFlow;
	signOut: typeof auth.signOut;
}

const authContext = createContext<NavigraphAuthContext>({
	initialized: false,
	user: null,
	signIn: () => Promise.reject('Not initalized'),
	signOut: () => Promise.reject('Not initialized'),
});

const useProvideAuth = () => {
	const [user, setUser] = useState<User | null>(null);
	const [initialized, setinitialized] = useState(false);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((u) => {
			setUser(u);
			setinitialized(true);
		});

		return () => unsubscribe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		user,
		initialized,
		signIn: auth.signInWithDeviceFlow,
		signOut: auth.signOut,
	};
};

export const NavigraphAuthProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useNavigraphAuth = () => {
	return useContext(authContext);
};
