/**
 * Format a number as currency
 * @param value - The number to format
 * @param locale - The locale to use for formatting (default: 'en-US')
 * @param currency - The currency code (default: 'USD')
 * @returns Formatted currency string
 */
export const formatCurrency = (
  value: number,
  locale = 'en-US',
  currency = 'USD'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value)
}

/**
 * Format a date
 * @param date - The date to format (string or Date object)
 * @param locale - The locale to use for formatting (default: 'en-US')
 * @param options - The options for formatting
 * @returns Formatted date string
 */
export const formatDate = (
  date: string | Date,
  locale = 'en-US',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, options).format(dateObj)
}

/**
 * Truncate a string to a specified length
 * @param text - The string to truncate
 * @param length - The maximum length (default: 50)
 * @param ellipsis - The ellipsis to append (default: '...')
 * @returns Truncated string
 */
export const truncateText = (
  text: string,
  length = 50,
  ellipsis = '...'
): string => {
  if (text.length <= length) return text
  return text.slice(0, length) + ellipsis
} 