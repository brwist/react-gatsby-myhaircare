import React from 'react'
import PropTypes from 'prop-types'
import {
  ColorSwatchesContainer,
  ColorSwatchesList,
  ColorSwatch,
} from '~/components/ProductForm/styles'

const ProductColorSwatches = ({
  variant,
  handleColorSwatches,
  values,
  index,
  colors,
}) => {
  const selectedColor = variant?.selectedOptions?.find(
    option => option.name.toLowerCase() === 'color'
  )

  return (
    <ColorSwatchesContainer>
      <ColorSwatchesList className="ColorSwatchesList">
        {values.map(value => {
          const customColor = colors.find(
            color => color.color_name.text.toLowerCase() === value.toLowerCase()
          )

          return (
            <ColorSwatch
              className={
                selectedColor?.value.toLowerCase() === value.toLowerCase()
                  ? 'selected'
                  : ''
              }
              style={{
                background: customColor
                  ? `#${customColor?.color_hex_code?.text}`
                  : value.toLowerCase(),
              }}
              onClick={() => handleColorSwatches(index, value)}
              key={value}
              data-value={value}
            />
          )
        })}
      </ColorSwatchesList>
    </ColorSwatchesContainer>
  )
}

ProductColorSwatches.propTypes = {
  variant: PropTypes.object,
  handleColorSwatches: PropTypes.func,
  values: PropTypes.array,
  index: PropTypes.number,
  colors: PropTypes.array,
}

export default ProductColorSwatches
