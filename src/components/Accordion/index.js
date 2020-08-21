import React from 'react'
import PropTypes from 'prop-types'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Icon from '~/components/Icon'
import { AccordionContent } from './styles'
import Title from '~/components/Utilities/Title'

const AccordionModule = ({ title, body, setisExpanded, isExpanded, index }) => {
  return (
    <Accordion style={{ borderRadius: 0 }} expanded={isExpanded === index}>
      <AccordionSummary
        expandIcon={
          isExpanded === index ? <Icon type="minus" /> : <Icon type="add" />
        }
        aria-controls={`panel${index}a-content`}
        id={`panel${index}a-header`}
        onClick={() => setisExpanded(isExpanded === index ? null : index)}
      >
        <Title as="h4" type="heading5">
          {title}
        </Title>
      </AccordionSummary>
      <AccordionDetails>
        <AccordionContent as="div" type="body" dangerouslySetInnerHTML={{ __html: body }} />
      </AccordionDetails>
    </Accordion>
  )
}

AccordionModule.propTypes = {
  title: PropTypes.string,
  body: PropTypes.any,
  setisExpanded: PropTypes.func,
  isExpanded: PropTypes.any,
  index: PropTypes.number,
}

export default AccordionModule
