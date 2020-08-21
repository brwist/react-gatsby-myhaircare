import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  NavigationContainer,
  NavigationContent,
  MenuLink,
  MegaNavContainer,
  MegaNavOverlay,
  NavigationBreadcrumb,
} from './styles'
import { DrawerItem } from '~/components/Drawer/styles'
import Text from '~/components/Utilities/Text'
import { Tablet, Desktop } from '~/components/Utilities/Media'
import Icon from '~/components/Icon'
import MegaNav from '~/components/MegaNav'
import { useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

const Navigation = ({ menuItems, menuBlocks, scrollY, setToggleDrawer }) => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('960'))
  const [menuChild, setMenuChild] = useState({
    active: false,
    child: '',
    label: '',
    index: 0,
  })
  const [transitionDrawer, setTransitionDrawer] = useState(false)

  const menuChilds = menuBlocks.filter(
    block =>
      block.primary.handle.text.toLowerCase() ===
        menuChild.child.toLowerCase() && block.slice_type === 'menu_block'
  )

  const menuChildsFeaturedItem = menuBlocks.find(
    block =>
      block.primary.handle.text.toLowerCase() ===
        menuChild.child.toLowerCase() &&
      block.slice_type === 'menu_featured_item'
  )

  const menuChildsBrands = menuBlocks.find(
    block =>
      block.primary.handle.text.toLowerCase() ===
        menuChild.child.toLowerCase() && block.slice_type === 'brands'
  )

  return (
    <>
      <NavigationContainer
        hoverState={
          (menuChild.active && menuChilds.length) ||
          (menuChild.active && menuChildsBrands)
        }
      >
        {!transitionDrawer ? (
          <NavigationContent scrollY={scrollY}>
            {menuItems.map((item, index) => {
              const hasChild = menuBlocks.find(
                block =>
                  block.primary.handle.text.toLowerCase() ===
                  item.menu_child_handle.text.toLowerCase()
              )

              const clickHandler = () => {
                if (hasChild) {
                  setMenuChild({
                    ...menuChild,
                    child: item.menu_child_handle.text,
                    label: item.label.text,
                    active: true,
                  })
                } else {
                  setMenuChild({
                    ...menuChild,
                    child: '',
                    label: '',
                    active: false,
                  })
                }
                setTransitionDrawer(true)
              }

              return (
                <Fragment key={`desktop-${item.page_handle.text}--${index}`}>
                  <Desktop>
                    <MenuLink
                      className={`MenuLink ${
                        (menuChild.active &&
                          menuChilds.length &&
                          menuChild.index === index) ||
                        (menuChild.index === index &&
                          menuChild.active &&
                          menuChildsBrands)
                          ? 'has-child'
                          : ''
                      }`}
                      pageType={item.page_type}
                      pageHandle={item.page_handle.text}
                      onClickHandler={() => {
                        setMenuChild({
                          active: false,
                          child: '',
                          label: '',
                          index,
                        })
                        setToggleDrawer(false)
                      }}
                      onMouseEnterHandler={() => {
                        setMenuChild({
                          active: true,
                          child: item.menu_child_handle.text,
                          label: item.label.text,
                          index,
                        })
                      }}
                      onMouseLeaveHandler={() =>
                        setMenuChild({
                          active: false,
                          child: '',
                          label: '',
                          index,
                        })
                      }
                    >
                      <Text
                        type="smallText400"
                        dangerouslySetInnerHTML={{ __html: item.label.text }}
                      />
                    </MenuLink>
                  </Desktop>
                  <Tablet key={`mobile-${item.page_handle.text}--${index}`}>
                    {hasChild ? (
                      <DrawerItem
                        key={`mobile-${item.page_handle.text}--${index}`}
                        clickHandler={clickHandler}
                        className={`DrawerItem has-child`}
                        type="smallText400"
                        setMenuChild={setMenuChild}
                        menuChild={menuChild}
                      >
                        <span>{item.label.text}</span>
                        <Icon type="keyboard-arrow-right" />
                      </DrawerItem>
                    ) : (
                      <MenuLink
                        pageType={item.page_type}
                        pageHandle={item.page_handle.text}
                        onClickHandler={() => setToggleDrawer(false)}
                      >
                        <DrawerItem
                          className={'DrawerItem'}
                          clickHandler={clickHandler}
                          type="smallText400"
                          dangerouslySetInnerHTML={{ __html: item.label.text }}
                        />
                      </MenuLink>
                    )}
                  </Tablet>
                </Fragment>
              )
            })}
          </NavigationContent>
        ) : (
          ''
        )}
      </NavigationContainer>
      <MegaNavContainer
        hoverState={
          (menuChild.active && menuChilds.length) ||
          (menuChild.active && menuChildsBrands)
        }
        onMouseLeave={() => {
          if (isDesktop) {
            setMenuChild({
              ...menuChild,
              active: false,
              child: '',
              label: '',
            })
          }
        }}
        onMouseEnter={() => {
          if (isDesktop) {
            setMenuChild({
              ...menuChild,
              active: true,
            })
          }
        }}
      >
        <Tablet>
          <NavigationBreadcrumb>
            <div
              role="button"
              onClick={() => {
                setMenuChild({
                  ...menuChild,
                  active: false,
                  child: '',
                  label: '',
                })
                setTransitionDrawer(false)
              }}
            >
              <Icon type="keyboard-arrow-left" />
            </div>
            <Text type="smallText500">{menuChild.label}</Text>
          </NavigationBreadcrumb>
        </Tablet>
        <MegaNav
          menuChildsBrands={menuChildsBrands}
          menuChildsFeaturedItem={menuChildsFeaturedItem}
          menuChilds={menuChilds}
          setMenuChild={setMenuChild}
          menuChild={menuChild}
          setToggleDrawer={setToggleDrawer}
        />
      </MegaNavContainer>
      <MegaNavOverlay
        hoverState={
          (menuChild.active && menuChilds.length) ||
          (menuChild.active && menuChildsBrands)
        }
      />
    </>
  )
}

Navigation.propTypes = {
  menuItems: PropTypes.array.isRequired,
  menuBlocks: PropTypes.array.isRequired,
  scrollY: PropTypes.number,
  setToggleDrawer: PropTypes.func,
}

export default Navigation
