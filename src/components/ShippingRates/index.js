import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import {
  RatesContainer,
  RatesTitle,
  RatesText,
  RatesButton,
  RatesForm,
  RatesHeader,
  RatesOutput,
  RatesSingleOutput,
} from './styles'
import TextField from '@material-ui/core/TextField'
import { fetchCountry } from '~/utils/functions/fetchCountry'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import Icon from '~/components/Icon'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '~/components/Connection/styles'
import { AddressSelectionContainer } from '~/components/Pages/Account/Address/styles'
import CustomerContext from '~/context/CustomerContext'
import { Desktop } from '~/components/Utilities/Media'

const ShippingRates = ({ weight }) => {
  const [rates, setRates] = useState(null)
  const [countries, setCountries] = useState(null)
  const customerContext = useContext(CustomerContext)
  const [isLoading, setIsLoading] = useState(false)
  const [formState, setFormState] = useState({
    street: '',
    post_code: '',
    country_code: '',
    weight,
  })

  useEffect(() => {
    if (
      customerContext?.isLoggedIn &&
      customerContext?.customerState?.defaultAddress
    ) {
      const country = countries?.find(
        country =>
          country.code ===
          customerContext.customerState.defaultAddress.countryCodeV2
      )

      setFormState({
        ...formState,
        country_code: country.code,
        street: customerContext.customerState.defaultAddress.address1,
        post_code: customerContext.customerState.defaultAddress.zip,
        weight,
      })
    }
  }, [countries])

  useEffect(() => {
    const response = fetchCountry()
    response
      .then(res => {
        setCountries(res)
        setFormState({
          ...formState,
          country_code: res[0].code,
        })
      })
      .catch(err => console.error(err))
  }, [])

  const changeHandler = e => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const submitHandler = async e => {
    setIsLoading(true)
    e.preventDefault()

    const response = await fetch(
      `/.netlify/functions/shipping?endpoint=get_shipping_rates`,
      {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      }
    )
    const result = await response.json()
    setRates(result)
    setIsLoading(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <RatesContainer>
        <RatesHeader>
          <Desktop>
            <RatesTitle as="h3" type="heading5">
              Get shipping cost estimate
            </RatesTitle>
          </Desktop>
          <RatesText type="body">
            We have free returns - please read our returns policy here.
          </RatesText>
          <RatesOutput>
            <RatesText as="div" type="body">
              {rates?.rates?.length > 0 ? (
                rates?.rates.map((rate, index) => {
                  return (
                    <RatesSingleOutput key={`${rate.service_code}--${index}`}>
                      <RatesText type="smallText400">
                        {rate.service_name}
                      </RatesText>
                      <RatesText type="smallText400">
                        Estimate: {rate.total_price}
                      </RatesText>
                    </RatesSingleOutput>
                  )
                })
              ) : !rates?.rates?.length && rates?.success ? (
                <RatesSingleOutput>
                  No result found for the inputted address
                </RatesSingleOutput>
              ) : (
                'Enter Street Address, Postal Code and Country to get an estimation of your shipping cost.'
              )}
            </RatesText>
          </RatesOutput>
        </RatesHeader>
        <RatesForm onSubmit={submitHandler}>
          <TextField
            id="shipping-rate"
            label={'Street Address'}
            placeholder={'Enter your street address'}
            onChange={changeHandler}
            fullWidth
            variant="outlined"
            name="street"
            type="text"
            required
            value={formState.street}
          />
          <TextField
            id="post_code"
            label={'Postal Code'}
            placeholder={'Enter your postal code'}
            onChange={changeHandler}
            fullWidth
            variant="outlined"
            name="post_code"
            type="text"
            required
            value={formState.post_code}
          />
          <AddressSelectionContainer className={'AddressSelectionContainer'}>
            <FormControl>
              <NativeSelect
                IconComponent={() => <Icon type="keyboard-arrow-down" />}
                onChange={changeHandler}
                name={'country_code'}
                value={formState.country_code}
                inputProps={{
                  'aria-label': 'country',
                }}
              >
                {countries?.map(country => {
                  return (
                    <option value={country.code} key={country.id}>
                      {country.name}
                    </option>
                  )
                })}
              </NativeSelect>
            </FormControl>
          </AddressSelectionContainer>
          <RatesButton isLoading={isLoading} type="submit">
            Go
          </RatesButton>
        </RatesForm>
      </RatesContainer>
    </ThemeProvider>
  )
}

ShippingRates.propTypes = {
  weight: PropTypes.number,
}

export default ShippingRates
