import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Title from '~/components/Utilities/Title'
import Text from '~/components/Utilities/Text'
import Icon from '~/components/Icon'
import {
  ProductDescription as Description,
  ProductDescriptionContainer,
  FeaturesContainer,
} from '~/components/Templates/Product/styles'
import { AccordionContainer, MenuItemTitle } from '~/components/Footer/styles'
import { Desktop, Tablet } from '~/components/Utilities/Media'
// Mobile Accordion Menu
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useMediaQuery } from '@material-ui/core'
// Extend Description
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Collapse from '@material-ui/core/Collapse'
import ShippingRates from '~/components/ShippingRates'

const useStyles = makeStyles(() => ({
  root: {
    height: 180,
  },
  container: {
    display: 'flex',
  },
  paper: {
    boxShadow: 'none',
  },
}))

const ProductDescription = ({ query, product, variant }) => {
  const classes = useStyles()
  const descriptionRef = useRef(null)
  const [checked, setChecked] = useState(false)
  const [checkedList, setCheckedList] = useState(false)
  const [
    descriptionReadMoreIsVisible,
    setDescriptionReadMoreIsVisible,
  ] = useState(false)
  const [
    bulletpointsReadMoreIsVisible,
    setBulletpointsReadMoreIsVisible,
  ] = useState(false)
  const maxHeightDescription = 180
  const maxHeightList = 125
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('960'))

  useEffect(() => {
    if (descriptionRef?.current?.clientHeight > maxHeightDescription) {
      setDescriptionReadMoreIsVisible(true)
    }
    if (query?.bulletpoints?.length > 3) {
      setBulletpointsReadMoreIsVisible(true)
    }
  }, [descriptionRef.current])

  const handleClick = () => {
    setChecked(prev => !prev)
  }

  const handleListClick = () => {
    setCheckedList(prev => !prev)
  }

  return (
    <>
      <Tablet>
        <AccordionContainer>
          <Accordion style={{ maxWidth: '100%' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel6a-content`}
              id={`panel6a-header`}
            >
              <MenuItemTitle as="h4" type="smallText500">
                Get shipping cost estimate
              </MenuItemTitle>
            </AccordionSummary>
            <AccordionDetails style={{ background: '#ffffff' }}>
              <ShippingRates weight={variant?.weight} />
            </AccordionDetails>
          </Accordion>
        </AccordionContainer>
      </Tablet>
      <ProductDescriptionContainer style={{ marginBottom: 40 }}>
        <Desktop>
          {query?.bulletpoints?.length ? (
            <FeaturesContainer>
              {product.bulletpoints_title ? (
                <Title as="h4" type="heading5">
                  {product.bulletpoints_title.text}
                </Title>
              ) : (
                ''
              )}
              {bulletpointsReadMoreIsVisible && isDesktop ? (
                <>
                  <Collapse in={checkedList} collapsedHeight={maxHeightList}>
                    <Paper className={classes.paper}>
                      <ul className={'Bulletpoints'}>
                        {query.bulletpoints?.map((bulletpoint, index) => (
                          <li key={`${bulletpoint}--${index}`}>
                            <Icon type="favorite" />
                            <Text as="span" type="body">
                              {bulletpoint.trim()}
                            </Text>
                          </li>
                        ))}
                      </ul>
                    </Paper>
                  </Collapse>
                  <div
                    style={{ marginTop: '20px', cursor: 'pointer' }}
                    onClick={handleListClick}
                  >
                    {product.read_more_text ? (
                      <Text as="span" type="link primary">
                        {checkedList ? 'Close' : product.read_more_text.text}
                      </Text>
                    ) : (
                      ''
                    )}
                  </div>
                </>
              ) : (
                <ul className={'Bulletpoints'}>
                  {query.bulletpoints?.map((bulletpoint, index) => (
                    <li key={`${bulletpoint}--${index}`}>
                      <Icon type="favorite" />
                      <Text as="span" type="body">
                        {bulletpoint.trim()}
                      </Text>
                    </li>
                  ))}
                </ul>
              )}
            </FeaturesContainer>
          ) : (
            ''
          )}
          <ShippingRates weight={variant?.weight} />
          <Description hasBulletpoints={query?.bulletpoints?.length}>
            {product.product_description_title ? (
              <Title as="h4" type="heading5">
                {product.product_description_title.text}
              </Title>
            ) : (
              ''
            )}
            <>
              <Collapse in={checked} collapsedHeight={maxHeightDescription}>
                <Paper ref={descriptionRef} className={classes.paper}>
                  <Text
                    className="CollapseDescription"
                    style={{
                      fontWeight: '400',
                      marginTop: 10,
                      textAlign: 'left',
                    }}
                    type="body"
                    as="div"
                    dangerouslySetInnerHTML={{
                      __html: product.descriptionHtml,
                    }}
                  />
                </Paper>
              </Collapse>
              <div
                style={{ marginTop: '20px', cursor: 'pointer' }}
                onClick={handleClick}
              >
                {product.read_more_text && descriptionReadMoreIsVisible ? (
                  <Text as="span" type="link primary">
                    {checked ? 'Close' : product.read_more_text.text}
                  </Text>
                ) : (
                  ''
                )}
              </div>
            </>
          </Description>
        </Desktop>
        <Tablet>
          <AccordionContainer>
            <Accordion style={{ maxWidth: '100%' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel6a-content`}
                id={`panel6a-header`}
              >
                {product.bulletpoints_title ? (
                  <MenuItemTitle as="h4" type="smallText500">
                    {product.bulletpoints_title.text}
                  </MenuItemTitle>
                ) : (
                  ''
                )}
              </AccordionSummary>
              <AccordionDetails style={{ background: '#ffffff' }}>
                <ul style={{ listStyle: 'none', textAlign: 'left' }}>
                  {query.bulletpoints?.map((bulletpoint, index) => (
                    <li
                      style={{
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      key={`${bulletpoint}--${index}`}
                    >
                      <div style={{ marginRight: '10px' }}>
                        <Icon type="favorite" />
                      </div>
                      <Text as="span" type="body">
                        {bulletpoint.trim()}
                      </Text>
                    </li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{ maxWidth: '100%' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel7a-content`}
                id={`panel7a-header`}
              >
                {product.product_description_title ? (
                  <MenuItemTitle as="h4" type="smallText500">
                    {product.product_description_title.text}
                  </MenuItemTitle>
                ) : (
                  ''
                )}
              </AccordionSummary>
              <AccordionDetails style={{ background: '#ffffff' }}>
                <Text
                  style={{
                    fontWeight: '300',
                    marginTop: 10,
                    textAlign: 'left',
                  }}
                  type="body"
                  as="div"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              </AccordionDetails>
            </Accordion>
          </AccordionContainer>
        </Tablet>
      </ProductDescriptionContainer>
    </>
  )
}

ProductDescription.propTypes = {
  query: PropTypes.object,
  product: PropTypes.object,
  variant: PropTypes.object,
}

export default ProductDescription
