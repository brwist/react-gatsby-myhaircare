import React from 'react'
import PropTypes from 'prop-types'
import {
  PaginationContainer,
  PaginationText,
  PaginationCount,
} from '~/components/Templates/Collection/styles'
import Icon from '~/components/Icon'

const Pagination = ({ products, query, productsLimit, setPage, page, location }) => {
  const numberOfPages = Math.ceil(products?.length / productsLimit)
  let paginationText = query.text.replace(
    '%%',
    products?.length > productsLimit ? productsLimit : products?.length
  )
  paginationText = paginationText.replace('%%', products?.length)

  return (
    <PaginationContainer>
      {query ? (
        <PaginationText type="smallText400">{paginationText}</PaginationText>
      ) : (
        ''
      )}
      {numberOfPages > 1 ? (
        <PaginationCount>
          {page > 1 ? (
            <a
              className="prevArrow"
              href={`#${page}`}
              onClick={() => {
                location.hash = `#${page + 1}`
                setPage(page - 1)
              }}
            >
              <Icon type="arrow-right" />
            </a>
          ) : (
            ''
          )}
          <ul>
            {Array.from(Array(numberOfPages), (e, index) => {
              return (
                <li
                  className={page === index + 1 ? 'is-active' : ''}
                  key={index + 1}
                >
                  <a
                    onClick={() => {
                      location.hash = `#${index + 1}`
                      setPage(index + 1)
                    }}
                    href={`#${page}`}
                  >
                    {index + 1}
                  </a>
                </li>
              )
            })}
          </ul>
          {page !== numberOfPages ? (
            <a
              href={`#${page}`}
              className="nextArrow"
              onClick={() => {
                location.hash = `#${page + 1}`
                setPage(page + 1)
              }}
            >
              <Icon type="arrow-right" />
            </a>
          ) : (
            ''
          )}
        </PaginationCount>
      ) : (
        ''
      )}
    </PaginationContainer>
  )
}

Pagination.propTypes = {
  query: PropTypes.object,
  products: PropTypes.array,
  productsLimit: PropTypes.number,
  setPage: PropTypes.func,
  page: PropTypes.number,
  location: PropTypes.object,
}

export default Pagination
