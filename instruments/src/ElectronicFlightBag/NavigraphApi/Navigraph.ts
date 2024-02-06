import { initializeApp, Scope, type NavigraphApp } from 'navigraph/app'
import { getAuth } from 'navigraph/auth'
import { getChartsAPI } from 'navigraph/charts'
import { getPackagesAPI } from 'navigraph/packages'

const config: NavigraphApp = {
  clientId: '26719457876398320522438947354958',
  clientSecret: '0tMmHlOaDGqukCzRLPvDZIrGmpWDYu3j',
  scopes: [Scope.CHARTS, Scope.FMSDATA]
}

initializeApp(config)

export const auth = getAuth()
export const charts = getChartsAPI()
export const packages = getPackagesAPI()
