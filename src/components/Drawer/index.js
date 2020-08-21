import React from 'react'
import PropTypes from 'prop-types'
import { theme, IconContainer, DrawerHeader } from './styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { ThemeProvider } from '@material-ui/core/styles'
import Navigation from '~/components/Navigation'
import Icon from '~/components/Icon'
import { Link } from 'gatsby'

const Drawer = ({
  toggleDrawer,
  menuItems,
  menuBlocks,
  setToggleDrawer,
  logoUrl,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <SwipeableDrawer
        onClose={() => setToggleDrawer(false)}
        onOpen={() => setToggleDrawer(true)}
        open={toggleDrawer}
      >
        <DrawerHeader>
          <Link className="Header__Logo" to="/" onClick={() => setToggleDrawer(false)}>
            <img src={logoUrl} />
          </Link>
          <IconContainer onClick={() => setToggleDrawer(false)}>
            <Icon type="clear" />
          </IconContainer>
        </DrawerHeader>
        <Navigation menuBlocks={menuBlocks} setToggleDrawer={setToggleDrawer} menuItems={menuItems} />
      </SwipeableDrawer>
    </ThemeProvider>
  )
}

Drawer.propTypes = {
  menuBlocks: PropTypes.array.isRequired,
  menuItems: PropTypes.array.isRequired,
  toggleDrawer: PropTypes.bool,
  setToggleDrawer: PropTypes.func.isRequired,
  logoUrl: PropTypes.string,
}

export default Drawer
