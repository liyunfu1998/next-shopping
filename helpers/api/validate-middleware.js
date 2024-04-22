export default async function validateMiddleware(req, schema) {
  if (!schema) return

  const body = await req.json()
  const { error, data } = schema.safeParse(body)

  if (error) {
    throw `Validation error: ${error.details.map(x => x.message).join(', ')}`
  }

  // update req.json() to return sanitized req body
  req.json = () => data
}
