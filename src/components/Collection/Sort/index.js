import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import NativeSelect from '@material-ui/core/NativeSelect'
import FormControl from '@material-ui/core/FormControl'
import Icon from '~/components/Icon'
import { SelectContainer } from '~/utils/styles'
import _ from 'lodash'

const Sort = ({ query, setProducts, products }) => {
  const [sorting, setSorting] = useState()
  const initialProducts = products.slice(0)

  useEffect(() => {
    if (sorting) {
      if (sorting[0] === 'TITLE' && sorting[1] === 'true') {
        setProducts(_.orderBy(initialProducts, ['title'], ['desc']))
      } else if (sorting[0] === 'TITLE' && sorting[1] !== 'true') {
        setProducts(_.orderBy(initialProducts, ['title'], ['asc']))
      } else if (sorting[0] === 'PRICE' && sorting[1] === 'true') {
        setProducts(
          initialProducts.sort(
            (a, b) => +b.variants[0].price - +a.variants[0].price
          )
        )
      } else if (sorting[0] === 'PRICE' && sorting[1] !== 'true') {
        setProducts(
          initialProducts.sort(
            (a, b) => +a.variants[0].price - +b.variants[0].price
          )
        )
      } else if (sorting[0] === 'LATEST') {
        setProducts(
          initialProducts.sort((a, b) => {
            if (new Date(a.createdAt) > new Date(b.createdAt)) {
              return -1
            } else if (new Date(a.createdAt) < new Date(b.createdAt)) {
              return 0
            }
          })
        )
      }
    }
  }, [sorting])

  const handleOptionChange = ({ target }) => {
    const { value: combinedValue } = target
    const value = combinedValue.split('--')

    setSorting(value)
  }

  return (
    <SelectContainer>
      <FormControl>
        <NativeSelect
          IconComponent={() => <Icon type="keyboard-arrow-down" />}
          onChange={event => handleOptionChange(event)}
          name={'sort'}
          inputProps={{ 'aria-label': 'sort' }}
        >
          {query.map((sort, index) => {
            return (
              <option
                value={`${sort.sort_value.text}--${sort.reverse_listing}`}
                key={`${sort.sort_title.text}--${index}`}
              >
                {sort.sort_title.text}
              </option>
            )
          })}
        </NativeSelect>
      </FormControl>
    </SelectContainer>
  )
}

Sort.propTypes = {
  query: PropTypes.array,
  setProducts: PropTypes.func,
  products: PropTypes.array,
}

export default Sort
