/**
 * Returns the JWT secret from the environment.
 *
 * There is intentionally NO fallback value: if JWT_SECRET is missing the
 * application must fail loudly at boot rather than silently signing tokens
 * with a well-known, insecure default.
 */
export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.trim() === '') {
    throw new Error(
      'JWT_SECRET environment variable is required and must not be empty. ' +
        'Set a strong, random secret before starting the application.',
    );
  }
  return secret;
}
