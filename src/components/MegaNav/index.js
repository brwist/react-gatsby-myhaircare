import React from 'react'
import PropTypes from 'prop-types'
import {
  MegaNavChild,
  MegaNavMenuLink,
  MegaNavItemsContainer,
  MegaNavFeaturedItem,
  MegaNavContent,
  MegaNavImage,
  MegaNavFeaturedItemBody,
} from '~/components/Navigation/styles'
import Text from '~/components/Utilities/Text'
import Brands from '~/components/Brands'

const MegaNav = ({
  menuChildsFeaturedItem,
  menuChilds,
  menuChildsBrands,
  setMenuChild,
  menuChild,
  setToggleDrawer,
}) => {
  return (
    <MegaNavContent>
      {menuChildsBrands ? (
        <Brands
          menuChildsBrands={menuChildsBrands}
          setMenuChild={setMenuChild}
          menuChild={menuChild}
          setToggleDrawer={setToggleDrawer}
        />
      ) : (
        ''
      )}
      {menuChildsFeaturedItem ? (
        <MegaNavFeaturedItem
          pageType={menuChildsFeaturedItem.primary.page_type}
          pageHandle={menuChildsFeaturedItem.primary.page_handle.text}
        >
          {menuChildsFeaturedItem.primary.label ? (
            <>
              {menuChildsFeaturedItem.primary.image ? (
                <MegaNavImage
                  fluid={
                    menuChildsFeaturedItem.primary.image.localFile
                      .childImageSharp.fluid
                  }
                />
              ) : (
                ''
              )}
              <MegaNavFeaturedItemBody>
                <Text
                  as="h3"
                  className="MegaNavChild__Title"
                  type="smallText500"
                >
                  {menuChildsFeaturedItem.primary.label.text}
                </Text>
                <Text as="span" type="body" className="MegaNavChild__Body">
                  {menuChildsFeaturedItem.primary.featured_item_body.text}
                </Text>
              </MegaNavFeaturedItemBody>
            </>
          ) : (
            ''
          )}
        </MegaNavFeaturedItem>
      ) : (
        ''
      )}
      {menuChilds.map((child, index) => {
        return (
          <MegaNavChild key={`${child.primary.handle.text}--${index}`}>
            <Text as="h3" className="MegaNavChild__Title" type="smallText500">
              {child.primary.label.text}
            </Text>
            <MegaNavItemsContainer>
              {child.items.map((item, index) => {
                return (
                  <MegaNavMenuLink
                    key={`${item.page_handle.text}--${index}`}
                    pageType={item.page_type}
                    pageHandle={item.page_handle.text}
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
                    <Text
                      as="span"
                      className="MegaNavMenuLink__Text"
                      type="body"
                    >
                      {item.menu_child_item_label.text}
                    </Text>
                  </MegaNavMenuLink>
                )
              })}
            </MegaNavItemsContainer>
          </MegaNavChild>
        )
      })}
    </MegaNavContent>
  )
}

MegaNav.propTypes = {
  menuChilds: PropTypes.array,
  menuChildsFeaturedItem: PropTypes.any,
  menuChildsBrands: PropTypes.object,
  setMenuChild: PropTypes.func,
  menuChild: PropTypes.object,
  setToggleDrawer: PropTypes.func,
}

export default MegaNav
