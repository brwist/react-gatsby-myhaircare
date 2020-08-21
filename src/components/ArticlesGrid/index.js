import React from 'react'
import PropTypes from 'prop-types'
import {
  LatestArticlesContainer,
  LatestArticlesTitle,
  LatestArticlesContent,
} from './styles'
import ArticleTile from '~/components/ArticleTile'
import Fade from 'react-reveal/Fade'

const ArticlesGrid = ({ query }) => {
  const {
    primary: { title, article_tile_tagline, blog_handle, read_more_text },
    articles,
  } = query

  const articlesMatch = articles.filter(
    node => node.blog.title.toLowerCase() === blog_handle.text.toLowerCase()
  )

  return (
    <LatestArticlesContainer>
      {articlesMatch.length > 0 ? (
        <>
          {title ? (
            <LatestArticlesTitle type="heading5">
              {title.text}
            </LatestArticlesTitle>
          ) : (
            ''
          )}
          <LatestArticlesContent>
            {articlesMatch?.splice(0, 3).map((article, index) => (
              <Fade
                key={`${article.url}--${index}`}
                bottom
                distance="25px"
                delay={index * 50}
              >
                <ArticleTile
                  query={{
                    ...article,
                    article_tile_tagline,
                    read_more_text,
                  }}
                />
              </Fade>
            ))}
          </LatestArticlesContent>
        </>
      ) : (
        ''
      )}
    </LatestArticlesContainer>
  )
}

ArticlesGrid.propTypes = {
  query: PropTypes.object.isRequired,
}

export default ArticlesGrid
