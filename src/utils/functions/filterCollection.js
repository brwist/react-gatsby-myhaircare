export const filterCollection = (selectedFilters, initialProducts) => {
  let updateProducts = initialProducts

  if (selectedFilters) {
    // Only Brand Selected
    if (selectedFilters?.brands?.length > 0 && !selectedFilters?.tags?.length) {
      updateProducts = initialProducts.filter(product =>
        selectedFilters.brands.find(brand => brand === product.vendor)
      )
      // Only Tags Selected
    } else if (
      selectedFilters?.tags?.length > 0 &&
      !selectedFilters?.brands?.length
    ) {
      updateProducts = initialProducts.filter(product => {
        return selectedFilters.tags.every(t =>
          product.tags.find(tag => tag.includes(t))
        )
      })
      // Tags & Brands Selected
    } else if (
      selectedFilters?.brands?.length > 0 &&
      selectedFilters?.tags?.length > 0
    ) {
      const prods = initialProducts.filter(product =>
        selectedFilters.brands.find(brand => brand === product.vendor)
      )

      updateProducts = prods.filter(product => {
        return selectedFilters.tags.every(t =>
          product.tags.find(tag => tag.includes(t))
        )
      })
    }

    // Product Type
    if (selectedFilters?.type) {
      updateProducts = updateProducts.filter(
        product => product.productType === selectedFilters.type
      )
    }

    if (selectedFilters?.prices) {
      const products = []
      const updateProductsCopy = updateProducts.slice()

      if (selectedFilters?.prices?.length > 0) {
        selectedFilters?.prices?.forEach(price => {
          const filteredProducts = updateProductsCopy.filter(product => {
            if (price.min === 200) {
              return product.priceRange.minVariantPrice.amount >= price.min
            } else {
              return (
                product.priceRange.minVariantPrice.amount >= price.min &&
                product.priceRange.maxVariantPrice.amount <= price.max
              )
            }
          })

          products.push(...filteredProducts)
        })
        return (updateProducts = products)
      } else {
        return (updateProducts = updateProductsCopy)
      }
    }

    if (selectedFilters?.subbrands?.length > 0) {
      const products = []
      const updateProductsCopy = updateProducts.slice()

      selectedFilters?.subbrands?.forEach(brand => {
        const filteredProducts = updateProductsCopy.filter(product =>
          product.collections?.edges.find(({ node }) => node.handle === brand)
        )
        products.push(...filteredProducts)
      })

      return (updateProducts = products)
    }

    return updateProducts
  }
}
