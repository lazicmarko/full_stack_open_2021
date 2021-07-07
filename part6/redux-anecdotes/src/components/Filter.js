import React from 'react'
import { connect } from 'react-redux'
import { setFilterAction } from '../reducers/filterReducer'


function Filter(props) {
  const handleChange = (event) => props.setFilterAction(event.target.value)

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input value={props.filter} onChange={handleChange}/>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = {
  setFilterAction
}

const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToProps
  )(Filter)

export default ConnectedFilter
