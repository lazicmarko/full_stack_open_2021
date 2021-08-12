import { useState } from 'react'

const useField = (type, id) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    id,
    value,
    onChange,
    reset
  }
}

export default useField
