import { initializeApp, Scope, NavigraphApp } from 'navigraph/app';
import { getAuth } from 'navigraph/auth';
import { getChartsAPI } from 'navigraph/charts';
import * as env from 'env';

const config: NavigraphApp = {
	clientId: env.CLIENT_ID,
	clientSecret: env.CLIENT_SECRET,
	scopes: [Scope.CHARTS, Scope.FMSDATA],
};
//might need offline acc scope
initializeApp(config);

export const auth = getAuth();
export const charts = getChartsAPI();
