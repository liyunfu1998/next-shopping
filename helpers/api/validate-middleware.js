export async function validateMiddleware(req, schema) {
  if (!schema) return

  const body = await req.json()
  const { error, data } = schema.safeParse(body)
  if (error?.errors) {
    throw `Validation error: ${error?.errors?.map(x => `${x.path?.[0]}:${x.message}`).join(', ')}`
  }

  // update req.json() to return sanitized req body
  req.json = () => data
}
