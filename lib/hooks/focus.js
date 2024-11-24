import * as React from 'react'
import { useCallback } from 'react'

export function useFocusBlur() {
  const [isFocused, setIsFocused] = React.useState(false)
  const onFocus = useCallback(() => setIsFocused(true), [])
  const onBlur = useCallback(() => setIsFocused(false), [])
  return [isFocused, onFocus, onBlur]
}
