import React, { useContext, useState } from 'react'
// import PropTypes from 'prop-types'
import { useStaticQuery, graphql, Link, navigate } from 'gatsby'
import PromoBannerPrimary from '~/components/PromoBanners/PromoBannerPrimary'
import PromoBannerSecondary from '~/components/PromoBanners/PromoBannerSecondary'
import { useWindowScroll } from 'react-use'
import {
  CartCounter,
  CartCounterContainer,
  SearchContainer,
  AccountContainer,
  HeaderContainer,
  HeaderContent,
  HeaderBg,
} from './styles'
import reduce from 'lodash/reduce'
import StoreContext from '~/context/StoreContext'
import Icon from '~/components/Icon'
import Text from '~/components/Utilities/Text'
import Navigation from '~/components/Navigation'
import Drawer from '~/components/Drawer'
import { Tablet, Desktop } from '~/components/Utilities/Media'
import { useTheme } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import CartFlyoutContext from '~/context/CartFlyoutContext'
import CustomerContext from '~/context/CustomerContext'
import { useSearchContext } from '~/components/Search/context'

const useQuantity = () => {
  let checkout

  if (StoreContext) {
    const storeContext = useContext(StoreContext)
    checkout = storeContext?.store?.checkout
  }
  const items = checkout ? checkout?.lineItems : []
  const total = reduce(items, (acc, item) => acc + item.quantity, 0)
  return [total !== 0, total]
}

const Header = () => {
  const { setToggleSearch } = useSearchContext()
  const cartFlyoutContext = useContext(CartFlyoutContext)
  const customerContext = useContext(CustomerContext)
  const [hasItems, quantity] = useQuantity()
  const { y: scrollY } = useWindowScroll()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('960'))
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const { headerData } = useStaticQuery(
    graphql`
      query {
        headerData: prismicComponentHeader {
          data {
            logo {
              url
            }
            scrolling_logo {
              url
            }
            account_label {
              text
            }
            shopping_bag_label {
              text
            }
            search_label {
              text
            }
            body {
              ... on PrismicComponentHeaderBodyMenuBlock {
                slice_type
                items {
                  page_type
                  page_handle {
                    text
                  }
                  menu_child_item_label {
                    text
                  }
                }
                primary {
                  label {
                    text
                  }
                  handle {
                    text
                  }
                }
              }
              ... on PrismicComponentHeaderBodyMenuFeaturedItem {
                slice_type
                primary {
                  page_type
                  page_handle {
                    text
                  }
                  label {
                    text
                  }
                  handle {
                    text
                  }
                  featured_item_body {
                    text
                  }
                  image {
                    localFile {
                      childImageSharp {
                        fluid(maxWidth: 100) {
                          ...GatsbyImageSharpFluid_withWebp_tracedSVG
                        }
                      }
                    }
                  }
                }
              }
              ... on PrismicComponentHeaderBodyBrands {
                slice_type
                primary {
                  handle {
                    text
                  }
                  label {
                    text
                  }
                }
                items {
                  letters_to_search {
                    text
                  }
                }
              }
            }
            promo_banner_primary {
              document {
                data {
                  body {
                    html
                  }
                  page_type
                  page_handle {
                    text
                  }
                }
              }
            }
            promo_banner_secondary {
              document {
                data {
                  sections {
                    page_type
                    page_handle {
                      text
                    }
                    body {
                      text
                    }
                  }
                }
              }
            }
            menu_items {
              page_type
              page_handle {
                text
              }
              menu_child_handle {
                text
              }
              label {
                text
              }
            }
          }
        }
      }
    `
  )

  const {
    data: {
      search_label,
      shopping_bag_label,
      account_label,
      body,
      menu_items,
      promo_banner_primary: {
        document: [{ data: promoBannerPrimaryData }],
      },
      promo_banner_secondary: {
        document: [
          {
            data: { sections: promoBannerSecondaryData },
          },
        ],
      },
      logo: { url: logoUrl },
      scrolling_logo: { url: scrollingLogoUrl },
    },
  } = headerData

  return (
    <>
      <HeaderBg>
        <HeaderContainer>
          <PromoBannerPrimary query={promoBannerPrimaryData} />
          <HeaderContent scrollY={scrollY}>
            <Desktop>
              <SearchContainer onClick={() => setToggleSearch(true)}>
                <Icon type="search" />
                {search_label ? (
                  <Text
                    as="small"
                    style={{ marginLeft: '15px' }}
                    type="smallText400"
                  >
                    {search_label.text}
                  </Text>
                ) : (
                  ''
                )}
              </SearchContainer>
            </Desktop>
            <Tablet>
              <div role="button" onClick={() => setToggleDrawer(!toggleDrawer)}>
                <Icon type="menu" />
              </div>
            </Tablet>
            <SwitchTransition mode={'out-in'}>
              <CSSTransition
                key={scrollY > 30 && isDesktop}
                addEndListener={(node, done) => {
                  node.addEventListener('transitionend', done, false)
                }}
                classNames="fade"
              >
                {scrollY > 30 && isDesktop ? (
                  <Link className="Header__Logo" to="/">
                    <img src={scrollingLogoUrl} />
                  </Link>
                ) : (
                  <Link className="Header__Logo" to="/">
                    <img src={logoUrl} />
                  </Link>
                )}
              </CSSTransition>
            </SwitchTransition>
            <div style={{ display: 'flex' }}>
              <Tablet>
                <SearchContainer onClick={() => setToggleSearch(true)}>
                  <Icon type="search" />
                </SearchContainer>
              </Tablet>
              <AccountContainer
                onClick={() => {
                  if (customerContext?.isLoggedIn) {
                    navigate('/account')
                  } else {
                    customerContext?.setOpenLogin(!customerContext?.openLogin)
                  }
                }}
              >
                <Icon type="person-outline" />
                <Desktop>
                  {account_label ? (
                    <Text
                      as="small"
                      style={{ marginLeft: '15px' }}
                      type="smallText400"
                    >
                      {account_label.text}
                    </Text>
                  ) : (
                    ''
                  )}
                </Desktop>
              </AccountContainer>
              <CartCounterContainer
                onClick={() => cartFlyoutContext.setToggleDrawer(true)}
              >
                <CartCounter>
                  <Icon type="mall" />
                  {hasItems && <span>{quantity}</span>}
                </CartCounter>
                <Desktop>
                  {shopping_bag_label ? (
                    <Text
                      as="small"
                      style={{ marginLeft: '15px' }}
                      type="smallText400"
                    >
                      {shopping_bag_label.text}
                    </Text>
                  ) : (
                    ''
                  )}
                </Desktop>
              </CartCounterContainer>
            </div>
          </HeaderContent>
          <Desktop>
            <Navigation
              scrollY={scrollY}
              menuBlocks={body}
              menuItems={menu_items}
              setToggleDrawer={setToggleDrawer}
            />
          </Desktop>
          <Tablet>
            <Drawer
              menuBlocks={body}
              menuItems={menu_items}
              toggleDrawer={toggleDrawer}
              setToggleDrawer={setToggleDrawer}
              logoUrl={logoUrl}
            />
          </Tablet>
        </HeaderContainer>
      </HeaderBg>
      <PromoBannerSecondary
        isVisibleOnLoad
        timing={25}
        query={promoBannerSecondaryData}
      />
    </>
  )
}

// Header.propTypes = {}

export default Header
