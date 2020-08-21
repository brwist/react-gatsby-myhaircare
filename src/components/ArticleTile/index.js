import React from 'react'
import PropTypes from 'prop-types'
import {
  ArticleTileContainer,
  ArticleTileTitle,
  ArticleTileExcerpt,
  ArticleTileImage,
  ArticleTileTagline,
  ArticleTileCTA,
} from './styles'
import { OverflowContainer } from '~/utils/styles'

const ArticleTile = ({ query, className }) => {
  const paths = query.url.split('blogs/')
  const path = paths[1]

  return (
    <ArticleTileContainer
      className={className ? className : ''}
      pageType="page"
      pageHandle={path}
    >
      {query.image.localFile.childImageSharp ? (
        <OverflowContainer>
          <ArticleTileImage
            fluid={query.image.localFile.childImageSharp.fluid}
          />
        </OverflowContainer>
      ) : (
        ''
      )}
      {query.article_tile_tagline ? (
        <ArticleTileTagline type="smallText400">
          {query.article_tile_tagline.text}
        </ArticleTileTagline>
      ) : (
        ''
      )}
      {query.title ? (
        <ArticleTileTitle as="h3" type="heading4">
          {query.title}
        </ArticleTileTitle>
      ) : (
        ''
      )}
      {query.excerptHtml ? (
        <ArticleTileExcerpt
          as="div"
          type="body"
          dangerouslySetInnerHTML={{ __html: query.excerptHtml }}
        />
      ) : (
        ''
      )}
      {query.read_more_text ? (
        <ArticleTileCTA type="link secondary" as="div">
          {query.read_more_text.text}
        </ArticleTileCTA>
      ) : (
        ''
      )}
    </ArticleTileContainer>
  )
}

ArticleTile.propTypes = {
  query: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default ArticleTile
