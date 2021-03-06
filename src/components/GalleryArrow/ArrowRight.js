import React from 'react'
import Icon from '~/components/Icon'
import PropTypes from 'prop-types'

const ArrowRight = props => {
  return (
    <div className={'arrow arrow--right'} onClick={props.onClick}>
      <Icon type="arrow-forward" />
    </div>
  )
}

ArrowRight.propTypes = {
  onClick: PropTypes.func,
}

export default ArrowRight
