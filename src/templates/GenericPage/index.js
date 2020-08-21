import React, { useState } from 'react'
import SEO from '~/components/seo'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import {
  GenericPageContainer,
  AccordionContainer,
} from '~/components/Templates/Generic/styles'
import Newsletter from '~/components/Newsletter'
import Footer from '~/components/Footer'
import Transition from '~/components/Transition'
import Accordion from '~/components/Accordion'
import Content from '~/components/Content'
import Column from '~/components/Column'
import ColumnItem from '~/components/ColumnItem'
// import Title from '~/components/Utilities/Title'

export const query = graphql`
  query($uid: String!) {
    prismicPageGeneric(uid: { eq: $uid }) {
      uid
      data {
        title {
          text
        }
        body {
          ... on PrismicPageGenericBodyAccordion {
            id
            internal {
              type
            }
            primary {
              half_page_width
            }
            items {
              accordion_title {
                text
              }
              accordion_body {
                html
              }
            }
          }
          ... on PrismicPageGenericBodyColumns {
            id
            internal {
              type
            }
            items {
              button {
                text
              }
              column_body {
                text
              }
              column_image {
                localFile {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
                url
                alt
              }
              column_title {
                text
              }
              page_handle {
                text
              }
              page_type
            }
            primary {
              columns_title {
                text
              }
            }
          }
          ... on PrismicPageGenericBodyContent {
            id
            internal {
              type
            }
            primary {
              half_page_width
              image {
                localFile {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
                alt
              }
              content_title {
                text
              }
              content_body {
                html
              }
            }
          }
        }
      }
    }
  }
`

const GenericPage = ({
  data: {
    prismicPageGeneric: { data: query },
  },
}) => {
  const [isExpanded, setisExpanded] = useState(null)

  return (
    <>
      <SEO title={query?.title?.text} />
      <Transition>
        {query.body.length > 0 ? (
          <GenericPageContainer className="GenericPageContainer">
            {query.body.map(el => {
              switch (el.internal.type) {
                case 'PrismicPageGenericBodyContent':
                  return el?.primary?.content_title?.text ||
                    el?.primary?.content_body ? (
                    <Content
                      key={el.id}
                      halfWidth={el?.primary?.half_page_width}
                      query={{
                        title: el?.primary?.content_title?.text,
                        body: el?.primary?.content_body?.html,
                        image:
                          el?.primary?.image?.localFile?.childImageSharp?.fluid,
                      }}
                    />
                  ) : (
                    ''
                  )
                case 'PrismicPageGenericBodyAccordion':
                  return el?.items?.length > 0 ? (
                    <AccordionContainer
                      halfWidth={el.primary.half_page_width}
                      key={el.id}
                    >
                      {el.items.length > 0 &&
                        el.items.map((item, index) => (
                          <Accordion
                            key={`${item.accordion_title.text}--${index}`}
                            setisExpanded={setisExpanded}
                            isExpanded={isExpanded}
                            title={item.accordion_title.text}
                            body={item.accordion_body.html}
                            index={index}
                          />
                        ))}
                    </AccordionContainer>
                  ) : (
                    ''
                  )
                case 'PrismicPageGenericBodyColumns':
                  return el?.items?.length > 0 ? (
                    <Column
                      query={{
                        title: el?.primary?.columns_title?.text,
                      }}
                      key={el.id}
                    >
                      {el.items.length > 0 &&
                        el.items.map((item, index) => (
                          <ColumnItem
                            key={`${item?.column_title?.text}--${index}`}
                            query={{
                              button: {
                                text: item?.button?.text,
                                handle: item?.page_handle?.text,
                                pageType: item?.page_type,
                              },
                              body: item?.column_body?.text,
                              title: item?.column_title?.text,
                              image:
                                item?.column_image?.localFile?.childImageSharp
                                  ?.fluid,
                            }}
                          />
                        ))}
                    </Column>
                  ) : (
                    ''
                  )
                default:
                  return ''
              }
            })}
          </GenericPageContainer>
        ) : (
          ''
        )}
      </Transition>
      <Newsletter />
      <Footer />
    </>
  )
}

GenericPage.propTypes = {
  data: PropTypes.object,
}

export default GenericPage
