import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  BannerTitle,
  BannerText,
  BannerImage,
  BannerContent,
  BannerContainer,
} from './styles'
import { StyledLink } from '~/utils/styles'
// Extend Description
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Collapse from '@material-ui/core/Collapse'
import { useStaticQuery, graphql } from 'gatsby'
import Text from '~/components/Utilities/Text'

const useStyles = makeStyles((props) => ({
  root: {
    height: props.maxHeightDescription,
  },
  container: {
    display: 'flex',
  },
  paper: {
    boxShadow: 'none',
  },
}))

const Banner = props => {
  const [maxHeightDescription, setMaxHeightDescription] = useState(180)
  const {
    prismicPageProduct: {
      data: { read_more_text },
    },
  } = useStaticQuery(graphql`
    {
      prismicPageProduct {
        data {
          read_more_text {
            text
          }
        }
      }
    }
  `)
  const classes = useStyles(maxHeightDescription)
  const { query } = props
  const [
    descriptionReadMoreIsVisible,
    setDescriptionReadMoreIsVisible,
  ] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const collapseDescriptionEl = document.querySelector(
      '.BannerTextCollection'
    )

    if (collapseDescriptionEl.clientHeight > maxHeightDescription) {
      setDescriptionReadMoreIsVisible(true)
    } else {
      setMaxHeightDescription(collapseDescriptionEl.clientHeight)
    }
  }, [query])

  const handleClick = () => {
    setChecked(prev => !prev)
  }

  return (
    <BannerContainer>
      <BannerContent>
        <BannerTitle type="heading2" as="h1">
          {query.title}
        </BannerTitle>
        <>
          <Collapse in={checked} collapsedHeight={maxHeightDescription}>
            <Paper className={classes.paper}>
              <BannerText
                className="BannerTextCollection"
                type="body"
                as="div"
                dangerouslySetInnerHTML={{ __html: query.body }}
              />
            </Paper>
          </Collapse>
          {descriptionReadMoreIsVisible ? (
            <div style={{ marginTop: '20px', cursor: 'pointer' }} onClick={handleClick}>
              {read_more_text?.text ? (
                <Text as="span" type="link secondary">
                  {checked ? 'Close' : read_more_text.text}
                </Text>
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}
        </>
        {query.cta ? (
          <StyledLink
            pageType="article"
            className={'Link secondary'}
            pageHandle={query.cta.link}
          >
            {query.cta.text}
          </StyledLink>
        ) : (
          ''
        )}
      </BannerContent>
      {query.image ? <BannerImage fluid={query.image} /> : ''}
    </BannerContainer>
  )
}

Banner.propTypes = {
  query: PropTypes.object.isRequired,
}

export default Banner
