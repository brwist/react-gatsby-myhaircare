// const i18n = require('../../config/i18n')

const linkResolver = doc => {
  console.log(doc);
  // const prefix = i18n[doc.lang].default ? `/` : `/${i18n[doc.lang].path}/`

  return `/${doc.uid}`
}

module.exports = linkResolver
