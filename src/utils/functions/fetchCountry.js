export async function fetchCountry() {
  const res = await fetch(
    `/.netlify/functions/shopify?endpoint=get_countries`,
    {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
    }
  )
  return await res.json()
}