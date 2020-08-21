import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import transformPath from '~/utils/functions/transformPath'

const LinkFormatter = ({
  pageType,
  pageHandle,
  children,
  className,
  onMouseEnterHandler,
  onMouseLeaveHandler,
  onClickHandler,
}) => {
  let path = `${pageHandle}`

  if (!pageHandle) {
    path = '/'
  } else if (pageType === 'collection') {
    path = transformPath(pageHandle).route
  } else if (pageType === 'product') {
    path = `/product/${pageHandle}`
  } else if (pageHandle === 'index' || pageHandle === 'home') {
    path = '/'
  } else if (pageType === 'blog') {
    path = `/blog/${pageHandle}`
  } else if (pageType === 'article') {
    path = `/article/${pageHandle}`
  } else if (pageType === 'page') {
    path = `/${pageHandle}`
  }
  
  if (path.includes('//')) {
    path = path.replace('//', '/')
  }

  return (
    <Link
      className={className}
      to={path}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      onClick={onClickHandler}
    >
      {children}
    </Link>
  )
}

LinkFormatter.propTypes = {
  children: PropTypes.any,
  pageType: PropTypes.string.isRequired,
  pageHandle: PropTypes.string,
  className: PropTypes.string,
  onMouseEnterHandler: PropTypes.func,
  onMouseLeaveHandler: PropTypes.func,
  onClickHandler: PropTypes.func,
}

export default LinkFormatter
