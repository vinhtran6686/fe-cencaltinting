/**
 * Validate email format
 * @param email - The email to validate
 * @returns Whether the email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength
 * Requires at least 8 characters, one uppercase letter, one lowercase letter,
 * one number, and one special character
 * @param password - The password to validate
 * @returns Whether the password is strong enough
 */
export const isStrongPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/
  return passwordRegex.test(password)
}

/**
 * Validate phone number format
 * @param phone - The phone number to validate
 * @returns Whether the phone number is valid
 */
export const isValidPhone = (phone: string): boolean => {
  // This is a simple regex for US phone numbers
  // Modify according to your specific requirements
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  return phoneRegex.test(phone)
}

/**
 * Check if a value is empty (null, undefined, empty string, or empty array)
 * @param value - The value to check
 * @returns Whether the value is empty
 */
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value as object).length === 0
  return false
} 