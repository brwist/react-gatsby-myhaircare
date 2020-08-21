import React, { useState } from 'react'
import SEO from '~/components/seo'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import ArticleTile from '~/components/ArticleTile'
import {
  BlogContainer,
  BlogGrid,
  LoadMoreBtn,
} from '~/components/Templates/Blog/styles'
import Banner from '~/components/Banner'
import Footer from '~/components/Footer'
import Transition from '~/components/Transition'

export const query = graphql`
  query($handle: String!) {
    prismicPageHomeBodyLatestArticles {
      primary {
        read_more_text {
          text
        }
        article_tile_tagline {
          text
        }
      }
    }
    allShopifyArticle(
      filter: { blog: { handle: { eq: $handle } } }
      sort: { order: ASC, fields: publishedAt }
    ) {
      nodes {
        contentHtml
        excerptHtml
        excerpt
        tags
        title
        url
        handle
        author {
          firstName
          lastName
          email
          name
        }
        blog {
          url
          title
          id
        }
        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`

const Blog = ({
  data: {
    prismicPageHomeBodyLatestArticles: {
      primary: { article_tile_tagline, read_more_text },
    },
    allShopifyArticle: { nodes: articles },
  },
}) => {
  const tilesToDisplay = 1
  const [showMore, setShowMore] = useState({
    state: false,
    visibleProducts: tilesToDisplay,
  })

  const handleShowMore = () => {
    setShowMore(prevState => ({
      ...prevState,
      visibleProducts: prevState.visibleProducts + 1,
      state: true,
    }))
  }

  return (
    <>
      <SEO title={articles[0].title} description={articles[0].excerpt} />
      <Transition>
        <BlogContainer className="BlogContainer">
          <Banner
            query={{
              title: articles[0].title,
              body: articles[0].excerptHtml,
              image: articles[0].image?.localFile?.childImageSharp?.fluid,
              cta: {
                text: read_more_text?.text,
                link: articles[0].handle,
              },
            }}
          />
          <BlogGrid>
            {articles?.slice(1, articles.length).map((article, index) => (
              <ArticleTile
                className={
                  tilesToDisplay > index
                    ? 'is-visible'
                    : showMore.visibleProducts <= index
                    ? 'is-hidden'
                    : ''
                }
                key={`${article.url}--${index}`}
                query={{
                  ...article,
                  article_tile_tagline,
                  read_more_text,
                }}
              />
            ))}
          </BlogGrid>
          {showMore.visibleProducts < articles.length - 1 ? (
            <LoadMoreBtn buttonStyle="primary" clickHandler={handleShowMore}>
              Load More
            </LoadMoreBtn>
          ) : (
            ''
          )}
        </BlogContainer>
      </Transition>
      <Footer />
    </>
  )
}

Blog.propTypes = {
  data: PropTypes.object,
}

export default Blog
