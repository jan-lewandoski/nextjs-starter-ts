import { useEffect, useRef } from 'react'

/**
 * Hook that works like useEffect but does not run on initial render
 */

const useDidMountEffect = (callback: () => unknown, deps: any[]) => {
  const didMount = useRef(false)

  useEffect(() => {
    if (didMount.current) callback()
    else didMount.current = true
  }, deps)
}

export default useDidMountEffect
