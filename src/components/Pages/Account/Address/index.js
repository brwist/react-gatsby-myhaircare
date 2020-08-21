import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { AddressForm, AddressSelectionContainer } from './styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import { ThemeProvider } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import Icon from '~/components/Icon'
import Title from '~/components/Utilities/Title'
import Button from '~/components/Utilities/Button'
import NativeSelect from '@material-ui/core/NativeSelect'
import FormControl from '@material-ui/core/FormControl'
import { useMutation } from '@apollo/client'
import {
  CREATE_SHOPIFY_ADDRESS,
  UPDATE_SHOPIFY_ADDRESS,
  UPDATE_SHOPIFY_DEFAULT_ADDRESS,
} from '~/utils/functions/graphql'
import { theme, FormActions } from '~/components/Connection/styles'
import { fetchCountry } from '~/utils/functions/fetchCountry'

const getProvinces = (country, countries) => {
  return countries.find(c => c.name === country).provinces
}

const Address = ({
  query,
  customerContext,
  open,
  setOpen,
  alertContext,
  editMode,
  setEditMode,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [formState, setFormState] = useState({
    default_address: false,
    address1: '',
    address2: '',
    city: '',
    company: '',
    country: '',
    firstName: '',
    lastName: '',
    phone: '',
    province: '',
    zip: '',
  })
  const [countries, setCountries] = useState(null)
  const [provinces, setProvinces] = useState(null)
  const [createAddress, { data: addressData }] = useMutation(
    CREATE_SHOPIFY_ADDRESS
  )
  const [updateAddress, { data: updateAddressData }] = useMutation(
    UPDATE_SHOPIFY_ADDRESS
  )
  const [updateDefaultAddress] = useMutation(UPDATE_SHOPIFY_DEFAULT_ADDRESS)

  // EDIT MODE

  useEffect(() => {
    if (editMode.state && open && countries) {
      const country = countries.find(
        country => country.name === editMode.address?.node?.country
      )
      const provs = getProvinces(country.name, countries)
      setProvinces(provs)
      const province = provs.find(
        province => province.name === editMode.address?.node?.province
      )

      setFormState({
        firstName: editMode.address?.node?.firstName,
        lastName: editMode.address?.node?.lastName,
        address1: editMode.address?.node?.address1,
        address2: editMode.address?.node?.address2,
        zip: editMode.address?.node?.zip,
        city: editMode.address?.node?.city,
        company: editMode.address?.node?.company,
        phone: editMode.address?.node?.phone,
        country: country.name,
        province: province.name,
      })
    }
  }, [countries, open])

  useEffect(() => {
    const response = fetchCountry()

    response
      .then(res => {
        setCountries(res)
        const provs = getProvinces(res[0].name, res)
        setProvinces(provs)
        if (!editMode.state) {
          setFormState({
            ...formState,
            province: provs[0].name,
            country: res[0].name,
          })
        }
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  useEffect(() => {
    if (!open) {
      setFormState({
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        zip: '',
        city: '',
        company: '',
        phone: '',
      })
      setEditMode(false)
    }
  }, [open])

  // UPDATE ADDRESS

  useEffect(() => {
    setIsLoading(false)

    if (
      updateAddressData?.customerAddressUpdate?.customerUserErrors?.[0]?.message
    ) {
      alertContext.setMessage(
        updateAddressData?.customerAddressUpdate?.customerUserErrors?.[0]
          .message
      )
      alertContext.setIsAlertOpen(true)

      setTimeout(() => {
        alertContext.setIsAlertOpen(false)
      }, 3000)
    }

    if (updateAddressData?.customerAddressUpdate?.customerAddress?.id) {
      const updatedAddresses = customerContext?.customerState?.addresses?.edges?.filter(
        address => address.node.id !== editMode.address.node.id
      )

      customerContext?.setCustomerState({
        ...customerContext?.customerState,
        addresses: {
          edges: [
            ...updatedAddresses,
            {
              node: {
                firstName: formState?.firstName,
                lastName: formState?.lastName,
                city: formState?.city,
                company: formState?.company,
                country: formState?.country,
                province: formState?.province,
                zip: formState?.zip,
                address1: formState?.address1,
                address2: formState?.address2,
              },
            },
          ],
        },
      })
      setOpen(false)
    }
  }, [updateAddressData])

  // CREATE ADDRESS

  useEffect(() => {
    setIsLoading(false)

    if (addressData?.customerAddressCreate?.customerUserErrors?.[0]?.message) {
      alertContext.setMessage(
        addressData?.customerAddressCreate?.customerUserErrors?.[0].message
      )
      alertContext.setIsAlertOpen(true)

      setTimeout(() => {
        alertContext.setIsAlertOpen(false)
      }, 3000)
    } else if (
      addressData?.customerAddressCreate?.customerAddress?.id &&
      formState?.default_address
    ) {
      updateDefaultAddress({
        variables: {
          addressId: addressData?.customerAddressCreate?.customerAddress?.id,
          customerAccessToken:
            customerContext?.loggedInLocalStorage?.accessToken,
        },
      })
    }

    if (addressData?.customerAddressCreate?.customerAddress?.id) {
      customerContext?.setCustomerState({
        ...customerContext?.customerState,
        addresses: {
          edges: [
            ...customerContext?.customerState?.addresses?.edges,
            {
              node: {
                firstName: formState?.firstName,
                lastName: formState?.lastName,
                city: formState?.city,
                company: formState?.company,
                country: formState?.country,
                province: formState?.province,
                zip: formState?.zip,
                address1: formState?.address1,
                address2: formState?.address2,
              },
            },
          ],
        },
      })
      setOpen(false)
    }
  }, [addressData])

  const changeHandler = e => {
    if (e.target.name === 'country') {
      const provs = getProvinces(e.target.value, countries)
      setProvinces(provs)
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
        province: provs[0].name,
      })
    } else {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
      })
    }
  }

  const formHandler = e => {
    e.preventDefault()
    setIsLoading(true)
    if (!editMode.state) {
      createAddress({
        variables: {
          address: {
            firstName: formState?.firstName,
            lastName: formState?.lastName,
            company: formState?.company,
            country: formState?.country,
            province: formState?.province,
            city: formState?.city,
            zip: formState?.zip,
            address1: formState?.address1,
            address2: formState?.address2,
          },
          customerAccessToken:
            customerContext?.loggedInLocalStorage?.accessToken,
        },
      })
    } else {
      updateAddress({
        variables: {
          id: editMode.address.node.id,
          address: {
            firstName: formState?.firstName,
            lastName: formState?.lastName,
            company: formState?.company,
            country: formState?.country,
            province: formState?.province,
            city: formState?.city,
            zip: formState?.zip,
            address1: formState?.address1,
            address2: formState?.address2,
          },
          customerAccessToken:
            customerContext?.loggedInLocalStorage?.accessToken,
        },
      })
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        onClose={() => {
          setOpen(false)
        }}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">
          <Title as="span" type="heading5">
            {editMode.state ? 'Edit an address' : 'Add an address'}
          </Title>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setOpen(false)
            }}
          >
            <Icon type="clear" />
          </div>
        </DialogTitle>
        <AddressForm onSubmit={formHandler}>
          {/* 1- First Name */}
          <TextField
            id="firstname"
            label={
              query?.first_name_input_label?.text
                ? query?.first_name_input_label?.text
                : 'First name'
            }
            placeholder={
              query?.first_name_input_placeholder?.text
                ? query?.first_name_input_placeholder?.text
                : 'Enter your first name'
            }
            onChange={changeHandler}
            fullWidth
            variant="outlined"
            name="firstName"
            type="text"
            required
            defaultValue={formState?.firstName}
          />
          {/* 2- Last Name */}
          <TextField
            id="lastName"
            label={
              query?.last_name_input_label?.text
                ? query?.last_name_input_label?.text
                : 'Last name'
            }
            placeholder={
              query?.last_name_input_placeholder?.text
                ? query?.last_name_input_placeholder?.text
                : 'Enter your last name'
            }
            onChange={changeHandler}
            fullWidth
            variant="outlined"
            name="lastName"
            type="text"
            required
            defaultValue={formState?.lastName}
          />
          {/* 3- Company Name */}
          <TextField
            id="company"
            label={
              query?.company_input_label?.text
                ? query?.company_input_label?.text
                : 'Company'
            }
            placeholder={
              query?.company_input_placeholder?.text
                ? query?.company_input_placeholder?.text
                : 'Enter your company name'
            }
            onChange={changeHandler}
            fullWidth
            variant="outlined"
            type="text"
            name="company"
            defaultValue={formState?.company}
          />
          {/* 4 - Address 1 */}
          <TextField
            id="address1"
            label={
              query?.address_input_label?.text
                ? query?.address_input_label?.text
                : 'Address'
            }
            placeholder={
              query?.address_input_placeholder?.text
                ? query?.address_input_placeholder?.text
                : 'Enter your address'
            }
            onChange={changeHandler}
            fullWidth
            variant="outlined"
            name="address1"
            type="text"
            required
            defaultValue={formState?.address1}
          />
          {/* 5 - Address 2 */}
          <TextField
            id="address2"
            label={
              query?.address_2_input_label?.text
                ? query?.address_2_input_label?.text
                : 'Secondary Address'
            }
            placeholder={
              query?.address_2_input_placeholder?.text
                ? query?.address_2_input_placeholder?.text
                : 'Enter your additional addres'
            }
            onChange={changeHandler}
            fullWidth
            variant="outlined"
            name="address2"
            type="text"
            defaultValue={formState?.address2}
          />
          {/* 6 - City */}
          <TextField
            id="city"
            label={
              query?.city_input_label?.text
                ? query?.city_input_label?.text
                : 'City'
            }
            placeholder={
              query?.city_input_placeholder?.text
                ? query?.city_input_placeholder?.text
                : 'Enter your city'
            }
            onChange={changeHandler}
            fullWidth
            variant="outlined"
            name="city"
            required
            type="text"
            defaultValue={formState?.city}
          />
          <AddressSelectionContainer>
            {/* 7 - Country */}
            <FormControl>
              <NativeSelect
                IconComponent={() => <Icon type="keyboard-arrow-down" />}
                onChange={changeHandler}
                name={'country'}
                value={formState?.country}
                inputProps={{
                  'aria-label': 'country',
                }}
              >
                {countries?.map(country => {
                  return (
                    <option value={country.name} key={country.id}>
                      {country.name}
                    </option>
                  )
                })}
              </NativeSelect>
            </FormControl>
            {/* 8 - Province */}
            {provinces?.length > 0 ? (
              <FormControl>
                <NativeSelect
                  IconComponent={() => <Icon type="keyboard-arrow-down" />}
                  onChange={changeHandler}
                  name={'province'}
                  value={formState?.province}
                  inputProps={{
                    'aria-label': query?.province_input_label?.text
                      ? query.province_input_label.text
                      : '',
                  }}
                >
                  {provinces?.map(province => {
                    return (
                      <option value={province.name} key={province.id}>
                        {province.name}
                      </option>
                    )
                  })}
                </NativeSelect>
              </FormControl>
            ) : (
              ''
            )}
          </AddressSelectionContainer>
          {/* 9 - Postal Code */}
          <TextField
            id="zip"
            label={
              query?.postal_code_input_label?.text
                ? query?.postal_code_input_label?.text
                : 'First name'
            }
            placeholder={
              query?.postal_code_input_placeholder?.text
                ? query?.postal_code_input_placeholder?.text
                : 'Enter your postal code'
            }
            onChange={changeHandler}
            fullWidth
            variant="outlined"
            name="zip"
            type="text"
            required
            defaultValue={formState?.zip}
          />
          {/* 10 - Phone */}
          <TextField
            id="phone"
            type="tel"
            label={
              query?.phone_input_label?.text
                ? query?.phone_input_label?.text
                : 'Phone'
            }
            placeholder={
              query?.phone_input_placeholder?.text
                ? query?.phone_input_placeholder?.text
                : 'Enter your phone'
            }
            onChange={changeHandler}
            fullWidth
            variant="outlined"
            name="phone"
            defaultValue={formState?.phone}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formState.default_address}
                onChange={e => {
                  setFormState({
                    ...formState,
                    [e.target.name]: !formState.default_address,
                  })
                }}
                name="default_address"
              />
            }
            label={query?.default_address?.text}
          />
          <FormActions>
            {query?.address_add?.text ? (
              <Button
                type="submit"
                isLoading={isLoading}
                buttonStyle="tertiary"
              >
                {editMode.state
                  ? query.address_edit.text
                  : query.address_add.text}
              </Button>
            ) : (
              ''
            )}
          </FormActions>
        </AddressForm>
      </Dialog>
    </ThemeProvider>
  )
}

Address.propTypes = {
  query: PropTypes.object,
  customerContext: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  alertContext: PropTypes.object,
  editMode: PropTypes.object,
  setEditMode: PropTypes.func,
}

export default Address
