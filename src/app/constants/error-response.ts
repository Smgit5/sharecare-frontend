export const ERROR_CODE = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',

  USERNAME_ALREADY_EXISTS: 'USERNAME_ALREADY_EXISTS',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',

  BAD_CREDENTIALS: 'BAD_CREDENTIALS',
  ACCESS_TOKEN_EXPIRED: 'ACCESS_TOKEN_EXPIRED',
  SESSION_EXPIRED: 'SESSION_EXPIRED',

  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
  EMAIL_ALREADY_VERIFIED: 'EMAIL_ALREADY_VERIFIED',
  EMAIL_VERIFICATION_LINK_INVALID: 'EMAIL_VERIFICATION_LINK_INVALID',

  PASSWORD_RESET_LINK_INVALID: 'PASSWORD_RESET_LINK_INVALID',

  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',

  UNKNOWN_AUTH_ERROR: 'UNKNOWN_AUTH_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
}

export const ERROR_MESSAGE = {
  USERNAME_ALREADY_EXISTS:
    'This username is already taken.',

  EMAIL_ALREADY_EXISTS:
    'This email address is already registered.',

  BAD_CREDENTIALS:
    'Invalid username or password.',

  SESSION_EXPIRED:
    'Your session has expired. Please login again.',

  EMAIL_NOT_VERIFIED:
    'Please verify your email address first.',

  EMAIL_ALREADY_VERIFIED:
    'This email address has already been verified.',

  PASSWORD_RESET_LINK_INVALID:
    'This password reset link is invalid or has expired.',

  EMAIL_VERIFICATION_LINK_INVALID:
    'This verification link is invalid or has expired.',

  UNKNOWN_AUTH_ERROR:
    'Authentication failed.',

  UNKNOWN_ERROR:
    'Something went wrong. Please try again.'
}

export type ErrorCode = typeof ERROR_CODE[keyof typeof ERROR_CODE];