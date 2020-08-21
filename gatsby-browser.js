import Wrap from './wrapPageElement'

export const wrapPageElement = Wrap

const addScript = url => {
  const script = document.createElement('script')
  script.src = url
  script.async = true
  script.dataset.cfasync = false
  document.body.appendChild(script)
}

export const onClientEntry = () => {
  addScript(`https://cdn.judge.me/widget_preloader.js`)
  addScript(`https://cdn.judge.me/assets/installed.js`)
  // addScript('https://swymdev.azureedge.net/code/swym-notepad-v2-shopify.js')
}

export const onInitialClientRender = () => {

  // Reviews

  let jdgm = window.jdgm || {}
  jdgm.SHOP_DOMAIN = 'myhaircarebeauty.myshopify.com'
  jdgm.PLATFORM = 'shopify'
  jdgm.PUBLIC_TOKEN = '4PxqFv911SVWe2FNL6tQ467ZzWY'

  // Back in stock

  // var swappName = 'Wishlist' || 'Wishlist'
  // var swymJSObject = {
  //   pid: 'm3AjodV+Ur7mQyrPWfXYOYjUzDjIkJFpJ3Q4vZ3i7ao=',
  //   interface:
  //     '/apps/swym' +
  //     swappName +
  //     '/interfaces/interfaceStore.php?appname=' +
  //     swappName,
  // }
  // window.swymPageLoad = function() {
  //   window.SwymProductVariants = window.SwymProductVariants || {}
  //   window.SwymHasCartItems = 0 > 0
  //   ;(window.SwymPageData = {}), (window.SwymProductInfo = {})
  //   var unknown = { et: 0 }
  //   window.SwymPageData = unknown
  // }
  // window.swymJSShopifyLoad = function() {
  //   if (window.swymPageLoad) swymPageLoad()
  //   if (!window._swat) {
  //     ;(function(s, w, r, e, l, a, y) {
  //       r['SwymRetailerConfig'] = s
  //       r[s] =
  //         r[s] ||
  //         function(k, v) {
  //           r[s][k] = v
  //         }
  //     })('_swrc', '', window)
  //     _swrc('RetailerId', swymJSObject.pid)
  //     _swrc('Callback', function() {
  //       initSwymShopify()
  //     })
  //   } else if (window._swat.postLoader) {
  //     _swrc = window._swat.postLoader
  //     _swrc('RetailerId', swymJSObject.pid)
  //     _swrc('Callback', function() {
  //       initSwymShopify()
  //     })
  //   } else {
  //     initSwymShopify()
  //   }
  // }
  // if (!window._SwymPreventAutoLoad) {
  //   swymJSShopifyLoad()
  // }
}
