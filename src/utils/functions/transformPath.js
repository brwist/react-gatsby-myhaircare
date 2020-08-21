const transformPath = path => {
  let route = `/collection/${path}`
  let isBrand = false
  let brandName = ''

  if (path.includes('brand') && path.includes('parent')) {
    const getBrand = path.split('brand-')[1].split('__')
    const brand = getBrand[0]
    isBrand = true
    brandName = brand

    route = `/brand/${brand}`
  } else if (path.includes('brand-') && !path.includes('parent')) {
    const getBrand = path.split('brand-')[1].split('__')
    const brand = getBrand[0]
    const collectionTitle = getBrand[1]
    isBrand = true
    brandName = brand

    route = `/brand/${brand}/${collectionTitle}`
  }

  return {
    route,
    isBrand,
    brandName,
  }
}

module.exports = transformPath
