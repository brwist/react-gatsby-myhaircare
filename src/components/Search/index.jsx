import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Index } from 'elasticlunr'
import Icon from '~/components/Icon'
import { useSearchContext } from './context'
import { IconContainer } from '~/components/Drawer/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import {
  SearchFlyoutContainer,
  SearchFlyoutHeader,
  SearchHeaderTitle,
  SearchInput,
  SearchResults,
  SearchEmpty,
  SearchText,
} from './styles'
import SearchTile from '~/components/SearchTile'
import Fade from 'react-reveal/Fade'

const Search = () => {
  const {
    siteSearchIndex, 
    prismicComponentSearch: {
      data: {
        search_title,
        search_input_placeholder,
        search_input_label,
        search_empty_result,
        loading_button,
        back_in_stock_button,
        add_to_cart_button,
        sold_out_button
      }
    }
  } = useStaticQuery(graphql`
    {
      siteSearchIndex {
        index
      }
      prismicComponentSearch {
        data {
          search_title {
            text
          }
          search_input_placeholder {
            text
          }
          search_input_label {
            text
          }
          search_empty_result {
            text
          }
          loading_button {
            text
          }
          back_in_stock_button {
            text
          }
          add_to_cart_button {
            text
          }
          sold_out_button {
            text
          }
        }
      }
    }
  `)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const {
    searchShowed,
    setSearchShowed,
    toggleSearch,
    setToggleSearch,
  } = useSearchContext()
  let index

  const getOrCreateIndex = () =>
    index ? index : Index.load(siteSearchIndex.index)

  const search = evt => {
    const query = evt.target.value
    index = getOrCreateIndex()
    setQuery(query)
    setResults(
      index
        .search(query, {})
        // Map over each ID and return the full document
        .map(({ ref }) => index.documentStore.getDoc(ref))
    )
  }

  const closeSidebar = () => {
    setToggleSearch(false)
    setSearchShowed(!searchShowed)
  }

  return (
    <SearchFlyoutContainer>
      <SwipeableDrawer
        anchor={'right'}
        onClose={closeSidebar}
        onOpen={() => setToggleSearch(true)}
        open={toggleSearch}
        className="CartFlyoutDrawer"
      >
        {/* (HEADER) */}
        <SearchFlyoutHeader>
          {search_title?.text && 
            <SearchHeaderTitle as="h5" type="heading5">
            {search_title.text}
            </SearchHeaderTitle>
          }
          <IconContainer onClick={closeSidebar}>
            <Icon type="clear" />
          </IconContainer>
        </SearchFlyoutHeader>
        <div>
          <SearchInput
            id="search"
            type="text"
            name="search"
            label={search_input_label?.text ? search_input_label.text : 'Search'}
            value={query}
            onChange={search}
            placeholder={search_input_placeholder?.text ? search_input_placeholder.text : 'Search a product'}
            fullWidth
            variant="outlined"
          />
          <SearchResults>
            {results.length > 0 ? results.map((page, index) => 
            <Fade
            key={page.id}
            bottom
            distance="20px"
            delay={index * 25}
          >
            <SearchTile query={{ 
              ...page, 
              loading_button,
              back_in_stock_button,
              add_to_cart_button,
              sold_out_button
            }} />
          </Fade>
            ) : !results.length && query ? <Fade
            bottom
            distance="20px"
          >
            <SearchEmpty>
              {search_empty_result?.text && <SearchText as="p" type="smallText500">
                {search_empty_result.text}
              </SearchText>}
            </SearchEmpty>
          </Fade> : ''}
          </SearchResults>
        </div>
      </SwipeableDrawer>
    </SearchFlyoutContainer>
  )
}

export default Search
