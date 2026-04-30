export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function isAuthConfigured() {
  return Boolean(
    process.env.AUTH_SECRET &&
      process.env.ADMIN_EMAIL &&
      process.env.ADMIN_PASSWORD_HASH
  );
}

export function getAdminCredentials() {
  if (!isAuthConfigured()) {
    return null;
  }

  return {
    email: process.env.ADMIN_EMAIL as string,
    passwordHash: process.env.ADMIN_PASSWORD_HASH as string
  };
}
