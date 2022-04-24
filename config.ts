const getEnvironmentVariable = (name: string): string => {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Environment variable ${name} is missing`)
  }

  return value
}

export const config = {
  MAILERLITE_GROUP_ID: getEnvironmentVariable('MAILERLITE_GROUP_ID'),
  MAILERLITE_API_KEY: getEnvironmentVariable('MAILERLITE_API_KEY'),
}
