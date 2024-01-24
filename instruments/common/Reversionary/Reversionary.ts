// we will use a WASM module to handle the array of displays. this fill will be strictly for parsing the array and auto switching displays

export type DisplayKinds = 'PFD' | 'PFD2' | 'MFD' | 'MFD2' | 'EICAS' | 'FAILED'

export const getDisplayState = (display: DisplayKinds, state: boolean[]): boolean => {
  const PfdIndex = 0
  const Pfd2Index = 4
  const MfdIndex = 1
  const Mfd2Index = 3
  const EicasIndex = 2

  switch (display) {
    case 'PFD':
      return state[PfdIndex]
    case 'PFD2':
      return state[Pfd2Index]
    case 'MFD':
      return state[MfdIndex]
    case 'MFD2':
      return state[Mfd2Index]
    case 'EICAS':
      return state[EicasIndex]
    default:
      console.error('failed to get state of selected display')
      return false
  }
}
export const cDisplayFaulureState: boolean[] = [false, false, false, false, false] // const for now, this will be returned by the WASM module

export const booleanArrayToString = (arr: boolean[]): string => arr.map(String).join(',')

export const stringToBooleanArray = (string: string): boolean[] => string.split(',').map(Boolean)

export const AutoReversionary = (state: boolean[]): DisplayKinds[] => {
  const displayFaulureState = state // true for failed
  // array with length of 5 to represent all the displays. we will now parse the index of each value in the array and that will connect to a specific display
  // the purpose of this function is not to handle turning off the failed display but rather to auto switch the other displays to the proper display

  const pfdState = getDisplayState('PFD', displayFaulureState)
  const pfd2State = getDisplayState('PFD2', displayFaulureState)
  const mfdState = getDisplayState('MFD', displayFaulureState)
  const mfd2State = getDisplayState('MFD2', displayFaulureState)
  const eicasState = getDisplayState('EICAS', displayFaulureState)

  const rDisplayTypesDefault: DisplayKinds[] = ['PFD', 'MFD', 'EICAS', 'MFD2', 'PFD2']

  if (pfdState && pfd2State && eicasState) {
    // dual PFD failure and EICAS failure will display PFD on left MFD and EICAS on right MFD
    return ['FAILED', 'PFD', 'FAILED', 'EICAS', 'FAILED']
  } else if (pfdState && pfd2State) {
    // dual PFD failure is assumed to simply replace MFD on both sides
    return ['FAILED', 'PFD', 'EICAS', 'PFD', 'FAILED']
  } else if (mfdState && mfd2State) {
    // dual MFD failure is never covered in docs
    return ['PFD', 'FAILED', 'EICAS', 'FAILED', 'PFD2']
  } else if (pfdState && eicasState) {
    // PFD and EICAS faulure will result in MFD displaying PFD and the MFD on non affected side displaying the EICAS (left PFD fail case)
    return ['FAILED', 'PFD', 'FAILED', 'EICAS', 'PFD2']
  } else if (pfd2State && eicasState) {
    // PFD and EICAS faulure will result in MFD displaying PFD and the MFD on non affected side displaying the EICAS (right PFD fail case)
    return ['PFD', 'EICAS', 'FAILED', 'PFD2', 'FAILED']
  } else if (eicasState) {
    // single EICAS failure will result in both MFDs displaying the EICAS
    return ['PFD', 'EICAS', 'FAILED', 'EICAS', 'PFD2']
  } else if (pfdState) {
    // single PFD failure will result in respective MFD displaying the PFD (left PFD failure)
    return ['FAILED', 'PFD', 'EICAS', 'MFD2', 'PFD2']
  } else if (pfd2State) {
    // single PFD failure will result in respective MFD displaying the PFD (right PFD failure)
    return ['PFD', 'MFD', 'EICAS', 'PFD2', 'FAILED']
  } else if (mfdState) {
    // left MFD failure
    return ['PFD', 'FAILED', 'EICAS', 'MFD2', 'PFD2']
  } else if (mfd2State) {
    // right MFD failure
    return ['PFD', 'MFD', 'EICAS', 'FAILED', 'PFD2']
  } else return rDisplayTypesDefault
}
