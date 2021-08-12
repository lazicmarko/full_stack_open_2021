const handleReset = (fields) => {
  for (const field of fields) {
    field.reset()
  }
}

export default handleReset
