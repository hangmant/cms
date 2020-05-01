import { useState, useEffect } from 'react'
import { window } from 'browser-monads'

export function useLocalStorage(key: string, defaultValue: any) {
  const [state, setState] = useState(() => {
    try {
      const localValue = window.localStorage.getItem(key)
      return localValue ? JSON.parse(localValue) : defaultValue
    } catch (e) {
      return defaultValue
    }
  })

  useEffect(() => {
    window.localStorage.setItem(key, state)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return [state, setState]
}
