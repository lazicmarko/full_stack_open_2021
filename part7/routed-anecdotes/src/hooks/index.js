import { useState } from 'react'

export const useField = (type, initial = '') => {
  const [value, setValue] = useState(initial)

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => setValue('')

  return {
    type,
    value,
    onChange,
    reset
  }
}




