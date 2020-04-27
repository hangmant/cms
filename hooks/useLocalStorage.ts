import { useState, useEffect } from 'react'
import lscache from 'lscache'

export const useLocalStorage = (key: string, defaultValue: any) => {
  const [state, setState] = useState(() => {
    let value
    try {
      const localValue = lscache.get(key)
      value =
        localValue !== undefined && localValue !== null ? localValue : JSON.stringify(defaultValue)

      value = JSON.parse(value)
    } catch (e) {
      value = defaultValue
    }
    return value
  })

  useEffect(() => {
    lscache.set(key, state)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return [state, setState]
}
