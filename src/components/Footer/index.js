import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import {
  FooterContainer,
  CopyrightText,
  FooterMenuItems,
  MenuColumn,
  MenuItem,
  MenuItemTitle,
  AccordionContainer,
  FooterWrapper,
  RatingFooter,
  RatingFooterStars,
  RatingFooterText,
} from './styles'
import LinkFormatter from '~/components/LinkFormatter'
import { useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
// Mobile Accordion Menu
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import RatingContext from '~/context/RatingContext'

const Footer = () => {
  const ratingContext = useContext(RatingContext)
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('700'))

  const { footerData } = useStaticQuery(
    graphql`
      query {
        footerData: prismicComponentFooter {
          data {
            body {
              ... on PrismicComponentFooterBodyMenuBlocks {
                slice_type
                primary {
                  menu_column_title {
                    text
                  }
                }
                items {
                  page_type
                  page_handle {
                    text
                  }
                  menu_item_text {
                    text
                  }
                }
              }
              ... on PrismicComponentFooterBodyMenuSocials {
                slice_type
                items {
                  social_link {
                    url
                    target
                  }
                  menu_item_text {
                    text
                  }
                }
                primary {
                  menu_column_title {
                    text
                  }
                }
              }
            }
            logo {
              url
            }
            copyright_text {
              text
            }
          }
        }
      }
    `
  )

  const {
    data: {
      body: slices,
      logo: { url: logoUrl },
      copyright_text,
    },
  } = footerData

  const menuBlocks = slices.filter(slice => slice.slice_type === 'menu_blocks')
  const menuSocials = slices.filter(
    slice => slice.slice_type === 'menu_socials'
  )

  return (
    <div>
      <FooterWrapper>
        <AccordionContainer>
          <FooterContainer>
            <FooterMenuItems>
              <MenuColumn>
                <Link className="Footer__Logo" to="/">
                  <img src={logoUrl} />
                </Link>
                <RatingFooter>
                  <RatingFooterStars
                    readOnly={true}
                    rating={ratingContext?.allReviews?.avgRating}
                  />
                  <RatingFooterText type="smallText500">{`${
                    ratingContext?.allReviews?.avgRating
                  } from ${ratingContext?.allReviews?.count} ${
                    ratingContext?.allReviews?.count > 1 ? 'reviews' : 'review'
                  }`}</RatingFooterText>
                </RatingFooter>
              </MenuColumn>
              {menuBlocks.length > 0
                ? menuBlocks.map((menu, index) => {
                    const {
                      primary: { menu_column_title },
                    } = menu

                    return isDesktop ? (
                      <MenuColumn key={`${menu_column_title}--3--${index}`}>
                        {menu_column_title ? (
                          <>
                            <MenuItemTitle as="h4" type="smallText500">
                              {menu_column_title.text}
                            </MenuItemTitle>
                            {menu.items && menu.items.length > 0
                              ? menu.items.map((item, index) => {
                                  const {
                                    page_type,
                                    page_handle,
                                    menu_item_text,
                                  } = item
                                  return (
                                    <LinkFormatter
                                      key={`${page_handle}--4--${index}`}
                                      pageType={page_type}
                                      pageHandle={
                                        page_handle ? page_handle.text : ''
                                      }
                                    >
                                      <MenuItem type="smallText400">
                                        {menu_item_text.text}
                                      </MenuItem>
                                    </LinkFormatter>
                                  )
                                })
                              : ''}
                          </>
                        ) : (
                          ''
                        )}
                      </MenuColumn>
                    ) : (
                      <Accordion key={`${menu_column_title}--10--${index}`}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`panel${index + 1}a-content`}
                          id={`panel${index + 1}a-header`}
                        >
                          <MenuItemTitle as="h4" type="smallText500">
                            {menu_column_title.text}
                          </MenuItemTitle>
                        </AccordionSummary>
                        <AccordionDetails>
                          {menu.items && menu.items.length > 0
                            ? menu.items.map((item, index) => {
                                const {
                                  page_type,
                                  page_handle,
                                  menu_item_text,
                                } = item

                                return (
                                  <LinkFormatter
                                    key={`${page_handle}--5--${index}`}
                                    pageType={page_type}
                                    pageHandle={
                                      page_handle ? page_handle.text : ''
                                    }
                                  >
                                    <MenuItem type="smallText400">
                                      {menu_item_text.text}
                                    </MenuItem>
                                  </LinkFormatter>
                                )
                              })
                            : ''}
                        </AccordionDetails>
                      </Accordion>
                    )
                  })
                : ''}
              {menuSocials.length > 0
                ? menuSocials.map((menu, index) => {
                    const {
                      primary: { menu_column_title },
                    } = menu

                    return isDesktop ? (
                      <MenuColumn key={`${menu_column_title}--1--${index}`}>
                        <MenuItemTitle as="h4" type="smallText500">
                          {menu_column_title.text}
                        </MenuItemTitle>
                        {menu.items && menu.items.length > 0
                          ? menu.items.map((item, index) => {
                              const { menu_item_text, social_link } = item

                              return (
                                <a
                                  key={`${social_link.url}--${index}`}
                                  href={social_link.url}
                                  target={social_link}
                                >
                                  <MenuItem type="smallText400">
                                    {menu_item_text.text}
                                  </MenuItem>
                                </a>
                              )
                            })
                          : ''}
                      </MenuColumn>
                    ) : (
                      <Accordion key={`${menu_column_title}--7--${index}`}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`panel${index + 1}a-social-content`}
                          id={`panel${index + 1}a-social-header`}
                        >
                          <MenuItemTitle as="h4" type="smallText500">
                            {menu_column_title.text}
                          </MenuItemTitle>
                        </AccordionSummary>
                        <AccordionDetails>
                          {menu.items && menu.items.length > 0
                            ? menu.items.map((item, index) => {
                                const { menu_item_text, social_link } = item

                                return (
                                  <a
                                    key={`${social_link.url}--2--${index}`}
                                    href={social_link.url}
                                    target={social_link}
                                  >
                                    <MenuItem type="smallText400">
                                      {menu_item_text.text}
                                    </MenuItem>
                                  </a>
                                )
                              })
                            : ''}
                        </AccordionDetails>
                      </Accordion>
                    )
                  })
                : ''}
            </FooterMenuItems>
            {copyright_text ? (
              <CopyrightText as="div" type="smallText400">
                {copyright_text.text} {new Date().getFullYear()}
              </CopyrightText>
            ) : (
              ''
            )}
          </FooterContainer>
        </AccordionContainer>
      </FooterWrapper>
    </div>
  )
}

export default Footer
