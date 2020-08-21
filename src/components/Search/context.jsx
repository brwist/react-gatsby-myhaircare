import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'

const SearchContext = React.createContext(0)
const { Provider } = SearchContext

export function SearchContextProvider({ children }) {
  const [searchShowed, setSearchShowed] = useState(false)
  const [toggleSearch, setToggleSearch] = useState(false)

  return (
    <Provider
      value={[searchShowed, setSearchShowed, toggleSearch, setToggleSearch]}
    >
      {children}
    </Provider>
  )
}

SearchContextProvider.propTypes = {
  children: PropTypes.object,
}

export function useSearchContext() {
  const [searchShowed, setSearchShowed, toggleSearch, setToggleSearch] = useContext(SearchContext)

  return {
    searchShowed,
    setSearchShowed,
    toggleSearch,
    setToggleSearch,
  }
}
