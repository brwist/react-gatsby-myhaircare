import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  ImageMosaicContainer,
  MosaicColumn,
  MosaicImage,
  MosaicChild,
} from './styles'
import Title from '~/components/Utilities/Title'
import Text from '~/components/Utilities/Text'
import Fade from 'react-reveal/Fade'
import { OverflowContainer } from '~/utils/styles'

const ImagesMosaic = ({ query }) => {
  const [leftItems, setLeftitems] = useState([])
  const [rightItems, setRightitems] = useState([])

  const {
    items,
    primary: { title, caption },
  } = query

  useEffect(() => {
    const duplicatedItems = items.slice()

    setLeftitems(duplicatedItems.splice(0, Math.floor(items.length / 2)))
    setRightitems(duplicatedItems)
  }, [items])

  return (
    <ImageMosaicContainer className="ImageMosaicContainer">
      {title ? (
        <Title as="h2" type="heading5" className="MosaicTitle">
          {title.text}
        </Title>
      ) : (
        ''
      )}
      {leftItems.length > 0 ? (
        <MosaicColumn className="MosaicColumn MosaicColumnLeft">
          {caption ? (
            <Title as="h3" className="MosaicCaption">
              {caption.text}
            </Title>
          ) : (
            ''
          )}
          {leftItems.map((item, index) => (
            <Fade key={`MosaicItemLeft--${index}`} bottom distance="25px">
              <MosaicItem
                className={`MosaicItem MosaicItemLeft--${index + 1}`}
                query={item}
              />
            </Fade>
          ))}
        </MosaicColumn>
      ) : (
        ''
      )}
      {rightItems.length > 0 ? (
        <MosaicColumn className="MosaicColumn MosaicColumnRight">
          {rightItems.map((item, index) => (
            <Fade key={`MosaicItemRight--${index}`} bottom distance="25px">
              <MosaicItem
                className={`MosaicItem MosaicItemRight--${index + 1}`}
                query={item}
              />
            </Fade>
          ))}
        </MosaicColumn>
      ) : (
        ''
      )}
    </ImageMosaicContainer>
  )
}

const MosaicItem = ({ query, className }) => {
  return (
    <MosaicChild
      className={className}
      pageHandle={query.page_handle ? query.page_handle.text : ''}
      pageType={query.page_type}
    >
      {query.image.localFile.childImageSharp ? (
        <OverflowContainer>
          <MosaicImage
            className="MosaicImage"
            fluid={query.image.localFile.childImageSharp.fluid}
          />
        </OverflowContainer>
      ) : (
        ''
      )}
      {query.image_caption ? (
        <Text className="MosaicImageCaption" type="smallText500">
          {query.image_caption.text}
        </Text>
      ) : (
        ''
      )}
      {query.cta_text ? (
        <Text className="MosaicCtaText" type="link tertiary">
          {query.cta_text.text}
        </Text>
      ) : (
        ''
      )}
    </MosaicChild>
  )
}

ImagesMosaic.propTypes = {
  query: PropTypes.object.isRequired,
}

MosaicItem.propTypes = {
  query: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default ImagesMosaic
