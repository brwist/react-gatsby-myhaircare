import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  MegaNavChild,
  MenuLink,
  MegaNavItemsContainer,
} from '~/components/Navigation/styles'
import { BrandsWrapper } from './styles'
import Text from '~/components/Utilities/Text'
import { graphql, useStaticQuery } from 'gatsby'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import { useTheme } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'

const Brands = ({
  menuChildsBrands,
  setMenuChild,
  menuChild,
  setToggleDrawer,
}) => {
  const [selectedLetters, setSelectedLetters] = useState('#')
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('960'))

  const { allShopifyCollection } = useStaticQuery(
    graphql`
      query {
        allShopifyCollection(
          filter: { handle: { regex: "/(__parent)+/" } }
          sort: { fields: title }
        ) {
          nodes {
            handle
            title
          }
        }
      }
    `
  )

  const { nodes: collections } = allShopifyCollection

  const [brands, setBrands] = useState(collections)

  useEffect(() => {
    const letters = selectedLetters.toLowerCase().split('')
    let filteredCollections = []

    letters.map(l => {
      filteredCollections.push(
        collections.filter(
          collection => collection.title.toLowerCase().charAt(0) === l
        )
      )
    })

    filteredCollections = filteredCollections.flat()

    if (selectedLetters === '#') {
      setBrands(collections)
    } else {
      setBrands(filteredCollections)
    }
  }, [selectedLetters])

  return (
    <BrandsWrapper>
      <MegaNavChild style={{ width: isDesktop ? '150px' : '250px' }}>
        <Text
          as="h3"
          style={{ whiteSpace: 'nowrap' }}
          className="MegaNavChild__Title"
          type="smallText500"
        >
          {menuChildsBrands.primary.label.text}
        </Text>
        <MegaNavItemsContainer>
          {menuChildsBrands.items.map((item, index) => {
            const clickHandler = () => {
              setSelectedLetters(item.letters_to_search.text)
            }

            return (
              <div
                className={`MegaNavMenuLink__BrandsSearch ${
                  selectedLetters === item.letters_to_search.text
                    ? 'is-active'
                    : ''
                }`}
                key={`${item.letters_to_search.text}--${index}`}
                onClick={clickHandler}
              >
                <Text as="span" type="smallText500">
                  {item.letters_to_search.text}
                </Text>
              </div>
            )
          })}
        </MegaNavItemsContainer>
      </MegaNavChild>
      <MegaNavChild className="BrandsContainer">
        <Text as="h3" className="MegaNavChild__Title" type="smallText500">
          {selectedLetters}
        </Text>
        <SwitchTransition mode={'out-in'}>
          <CSSTransition
            key={selectedLetters}
            addEndListener={(node, done) => {
              node.addEventListener('transitionend', done, false)
            }}
            classNames="fade"
          >
            <MegaNavItemsContainer className="MegaNavItemsContainer">
              {brands.map((brand, index) => {
                return (
                  <MenuLink
                    key={`${brand.title}--${index}`}
                    className={`BrandLink`}
                    pageType={'collection'}
                    pageHandle={brand.handle}
                    onClickHandler={() => {
                      setMenuChild({
                        ...menuChild,
                        active: false,
                        child: '',
                        label: '',
                      })
                      setToggleDrawer(false)
                    }}
                  >
                    <Text type="body">{brand.title}</Text>
                  </MenuLink>
                )
              })}
            </MegaNavItemsContainer>
          </CSSTransition>
        </SwitchTransition>
      </MegaNavChild>
    </BrandsWrapper>
  )
}

Brands.propTypes = {
  menuChildsBrands: PropTypes.object.isRequired,
  menuChild: PropTypes.object,
  setMenuChild: PropTypes.func,
  setToggleDrawer: PropTypes.func,
}

export default Brands
