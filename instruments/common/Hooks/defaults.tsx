// We currently assume that these two elements will be found.
// Might be worth implementing checking in the future.

const reactMount = document.getElementById('MSFS_REACT_MOUNT') as HTMLElement

/**
 * Returns the render target which React mounts onto
 */
export const getRenderTarget = (): HTMLElement => reactMount

/**
 * Returns the root element which receives `update` events
 */
export const getRootElement: () => HTMLElement = () => {
  if (reactMount?.parentElement !== undefined && reactMount?.parentElement !== null) {
    return reactMount.parentElement
  }
  throw new Error('Could not find rootElement')
}
