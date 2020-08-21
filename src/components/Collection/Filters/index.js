import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FilterContainer, LabelText } from './styles'
import Icon from '~/components/Icon'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Checkbox from '@material-ui/core/Checkbox'
import _ from 'lodash'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import { createMemo } from 'react-use'

const checkAvailabilityByPrice = (products, range) => {
  const values = range.value.split('-')
  const minValue = +values[0]
  const maxValue = +values[1]

  const filteredProducts = products.filter(product => {
    if (minValue === 200) {
      return product.priceRange.minVariantPrice.amount >= minValue
    } else {
      return (
        product.priceRange.minVariantPrice.amount >= minValue &&
        product.priceRange.maxVariantPrice.amount <= maxValue
      )
    }
  })

  return filteredProducts
}

const useMemoCheckAvailabilityByPrice = createMemo(checkAvailabilityByPrice)

const priceRanges = [
  {
    value: '0-25',
    label: 'Under $25',
  },
  {
    value: '25-50',
    label: '$25 - $50',
  },
  {
    value: '50-100',
    label: '$50 - $100',
  },
  {
    value: '50-100',
    label: '$50 - $100',
  },
  {
    value: '100-200',
    label: '$100 - $200',
  },
  {
    value: '200-300',
    label: 'From $200',
  },
]

const Filters = ({
  query,
  filtersQuery,
  products,
  initialProducts,
  selectedFilters,
  setSelectedFilters,
  pageContext,
  allShopifyCollection,
}) => {
  const [isExpanded, setisExpanded] = useState([filtersQuery?.length])

  useEffect(() => {
    if (pageContext.brandPage) {
      setisExpanded([...isExpanded, 1])
    }
  }, [pageContext.brandPage])

  const handleChangeVendor = event => {
    if (event.target.checked) {
      setSelectedFilters({
        ...selectedFilters,
        brands: selectedFilters?.brands
          ? [...selectedFilters?.brands, event.target.value]
          : [event.target.value],
      })
    } else {
      const brands = selectedFilters?.brands?.filter(brand => {
        return brand !== event.target.value
      })

      setSelectedFilters({
        ...selectedFilters,
        brands,
      })
    }
  }

  const handleChangeTags = event => {
    if (event.target.checked) {
      setSelectedFilters({
        ...selectedFilters,
        tags: selectedFilters?.tags
          ? [...selectedFilters?.tags, event.target.value]
          : [event.target.value],
      })
    } else {
      const tags = selectedFilters?.tags?.filter(tag => {
        return tag !== event.target.value
      })

      setSelectedFilters({
        ...selectedFilters,
        tags,
      })
    }
  }

  const handleChangePrice = event => {
    const values = event.target.value.split('-')
    const minValue = +values[0]
    const maxValue = +values[1]

    if (event.target.checked) {
      if (selectedFilters?.prices?.length > 0) {
        setSelectedFilters({
          ...selectedFilters,
          prices: [
            ...selectedFilters.prices,
            {
              min: minValue,
              max: maxValue,
            },
          ],
        })
      } else {
        setSelectedFilters({
          ...selectedFilters,
          prices: [
            {
              min: minValue,
              max: maxValue,
            },
          ],
        })
      }
    } else {
      const prices = selectedFilters.prices.filter(
        price => price.min !== minValue && price.max !== maxValue
      )

      setSelectedFilters({
        ...selectedFilters,
        prices,
      })
    }
  }

  const handleSubBrand = event => {
    if (event.target.checked) {
      if (selectedFilters?.subbrands?.length > 0) {
        setSelectedFilters({
          ...selectedFilters,
          subbrands: [...selectedFilters.subbrands, event.target.value],
        })
      } else {
        setSelectedFilters({
          ...selectedFilters,
          subbrands: [event.target.value],
        })
      }
    } else {
      const subbrands = selectedFilters?.subbrands?.filter(subbrand => {
        return subbrand !== event.target.value
      })

      setSelectedFilters({
        ...selectedFilters,
        subbrands,
      })
    }
  }

  const accordionClickHandler = index => {
    if (isExpanded.find(i => i === index)) {
      setisExpanded(isExpanded.filter(i => i !== index))
    } else {
      setisExpanded([...isExpanded, index])
    }
  }

  return (
    <FilterContainer>
      <LabelText type="smallText400">{query}</LabelText>
      {filtersQuery?.length > 0 &&
        filtersQuery?.map((query, index) => {
          if (
            query.slice_type === 'filter_by_sub_brand' &&
            pageContext.brandPage
          ) {
            return (
              <Accordion
                key={`${query.items[0].label.text}--${index}`}
                expanded={isExpanded.find(i => i === index + 1) ? true : false}
              >
                <AccordionSummary
                  expandIcon={
                    isExpanded.find(i => i === index + 1) ? (
                      <Icon type="minus" />
                    ) : (
                      <Icon type="add" />
                    )
                  }
                  aria-controls={`panel${index}a-content`}
                  id={`panel${index}a-header`}
                  onClick={() => accordionClickHandler(index + 1)}
                >
                  {query.items[0].label.text}
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl component="fieldset">
                    <FormGroup
                      aria-label={query.items[0].label.text}
                      name={query.items[0].label.text}
                    >
                      {allShopifyCollection?.edges?.map(
                        ({ node: collection }, index) => {
                          if (collection.handle.includes('parent')) return

                          const checkAvailability = initialProducts?.find(
                            product =>
                              product.collections?.edges.find(
                                ({ node }) => node.handle === collection.handle
                              )
                          )

                          return (
                            <FormControlLabel
                              key={`${collection.handle}--${index}`}
                              value={collection.handle}
                              control={
                                <Checkbox
                                  onChange={handleSubBrand}
                                  name={collection.title}
                                  disabled={!checkAvailability}
                                />
                              }
                              label={collection.title}
                            />
                          )
                        }
                      )}
                    </FormGroup>
                  </FormControl>
                </AccordionDetails>
              </Accordion>
            )
          } else if (
            query.slice_type === 'filter_by_brand' &&
            !pageContext.brandPage
          ) {
            return (
              <Accordion
                key={`${query.items[0].label.text}--${index}`}
                expanded={isExpanded.find(i => i === index + 1) ? true : false}
              >
                <AccordionSummary
                  expandIcon={
                    isExpanded.find(i => i === index + 1) ? (
                      <Icon type="minus" />
                    ) : (
                      <Icon type="add" />
                    )
                  }
                  aria-controls={`panel${index}a-content`}
                  id={`panel${index}a-header`}
                  onClick={() => accordionClickHandler(index + 1)}
                >
                  {query.items[0].label.text}
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl component="fieldset">
                    <FormGroup
                      aria-label={query.items[0].label.text}
                      name={query.items[0].label.text}
                    >
                      {[
                        ...new Set(
                          initialProducts?.map(product => product.vendor)
                        ),
                      ]
                        .sort()
                        .map((vendor, index) => {
                          const availableProductsHaveVendor = products?.find(
                            product => product.vendor === vendor
                          )

                          return (
                            <FormControlLabel
                              key={`${vendor}--${index}`}
                              value={vendor}
                              control={
                                <Checkbox
                                  onChange={handleChangeVendor}
                                  name={query.items[0].label.text}
                                  disabled={!availableProductsHaveVendor}
                                />
                              }
                              label={vendor}
                            />
                          )
                        })}
                    </FormGroup>
                  </FormControl>
                </AccordionDetails>
              </Accordion>
            )
          } else if (query.slice_type === 'filter_by_tag') {
            const tagLogic = query.items[0].tag_logic.text

            const rawTags = _.flatten(
              initialProducts?.map(product =>
                product?.tags?.filter(tag => tag.includes(tagLogic))
              )
            )

            const uniqueRawTags = new Set(rawTags)
            const tags = [...uniqueRawTags]?.map(
              tag => tag?.split(`${query.items[0].tag_logic.text}`)?.[1]
            )

            const filterCategory = query.items[0].tag_logic.text.split('_')[0]

            return tags && tags.length > 0 ? (
              <Accordion
                key={`${query.items[0].label.text}-1-${index}`}
                expanded={isExpanded.find(i => i === index + 1) ? true : false}
              >
                <AccordionSummary
                  expandIcon={
                    isExpanded.find(i => i === index + 1) ? (
                      <Icon type="minus" />
                    ) : (
                      <Icon type="add" />
                    )
                  }
                  aria-controls={`panel${index}a-content`}
                  id={`panel${index}a-header`}
                  onClick={() => accordionClickHandler(index + 1)}
                >
                  {query.items[0].label.text}
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup
                    aria-label={query.items[0].label.text}
                    name={filterCategory}
                  >
                    {tags?.sort().map((tag, index) => {
                      const availableProductsHaveTag = products?.find(product =>
                        product?.tags?.find(t => t.includes(tag))
                      )

                      return (
                        <FormControlLabel
                          key={`${tag}--${index}`}
                          value={tag}
                          control={
                            <Checkbox
                              onChange={handleChangeTags}
                              name={tag}
                              disabled={!availableProductsHaveTag}
                            />
                          }
                          label={tag}
                        />
                      )
                    })}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            ) : (
              ''
            )
          } else if (query.slice_type === 'filter_by_price') {
            return (
              <Accordion
                key={`${query.items[0].label.text}--${index}`}
                expanded={isExpanded.find(i => i === index + 1) ? true : false}
              >
                <AccordionSummary
                  expandIcon={
                    isExpanded.find(i => i === index + 1) ? (
                      <Icon type="minus" />
                    ) : (
                      <Icon type="add" />
                    )
                  }
                  aria-controls={`panel${index}33-content`}
                  id={`panel${index}33-header`}
                  onClick={() => accordionClickHandler(index + 1)}
                >
                  {query.items[0].label.text}
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup
                    aria-label={query.items[0].label.text}
                    name={'price'}
                  >
                    {priceRanges.map((range, index) => {
                      const filteredProducts = useMemoCheckAvailabilityByPrice(
                        initialProducts,
                        range
                      )

                      return (
                        <FormControlLabel
                          key={`${range.value}--${index}`}
                          value={range.value}
                          control={
                            <Checkbox
                              onChange={handleChangePrice}
                              name={range.value}
                              disabled={!filteredProducts.length}
                            />
                          }
                          label={range.label}
                        />
                      )
                    })}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            )
          }
        })}
    </FilterContainer>
  )
}

Filters.propTypes = {
  query: PropTypes.string,
  filtersQuery: PropTypes.array,
  products: PropTypes.array.isRequired,
  initialProducts: PropTypes.array.isRequired,
  selectedFilters: PropTypes.any,
  setSelectedFilters: PropTypes.func,
  pageContext: PropTypes.object,
  allShopifyCollection: PropTypes.object,
}

export default Filters
