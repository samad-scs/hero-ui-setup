/* eslint-disable @typescript-eslint/no-explicit-any */
//? ** Extracting First Letters
export const getInitials = (string: string) => {
  if (!string) return string

  return string?.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '')
}

//? ** Extracting Full Name From First Name and Last Name
export const getFullName = (firstName?: string, lastName?: string) => {
  if (!firstName) return '-'

  return `${firstName} ${lastName || ''}`?.trim()
}

//? ** Calculate Age based from DOB
export const getAgeFromDOB = (dob?: Date) => {
  if (!dob) return 0

  const today = new Date()
  const birthDate = new Date(dob)

  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

//? ** Await Function that is used to wait
export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

//? ** Displays '...' after string after a given length of chars
export const truncateString = (string: string, length: number) => {
  return string?.length > length ? string.substring(0, length)?.trim() + '...' : string
}

//? ** Displays '...' after string after a given length of chars
export const parseParagraph = (string: string) => {
  if (!string) return [string]

  const strArr = string?.length ? string?.split('\n') : []

  return strArr
}

//? ** Checks if given string contains given prefix
export const ensurePrefix = (str: string, prefix: string) => (str.startsWith(prefix) ? str : `${prefix}${str}`)

//? ** Returns the string with sliced suffix
export const withoutSuffix = (str: string, suffix: string) =>
  str.endsWith(suffix) ? str.slice(0, -suffix.length) : str

//? ** Returns the string with sliced prefix
export const withoutPrefix = (str: string, prefix: string) => (str.startsWith(prefix) ? str.slice(prefix.length) : str)

//? ** Checks if given input is a file
export function isFile(input: any): boolean {
  if ('File' in window && input instanceof File) return true
  else return false
}

//? ** Converts 'This is demo' to 'this-is-demo'
export const toFileName = (string: string) => {
  try {
    if (string) {
      if (typeof string === 'string') {
        const updatedString = string.replaceAll(' ', '-').toLowerCase()

        return updatedString
      }

      return string
    }

    return string
  } catch {
    return string
  }
}

//? ** Currency Convert
export const currencyConvert = (value: number, options?: Intl.NumberFormatOptions) => {
  return value.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'INR',
    ...options
  })
}

//? ** Checks for number
export const isNumber = (value: any) => {
  return !isNaN(Number(value))
}

//? ** Default Date Format
export const defaultFormatDate = 'DD MMM, YYYY'

//? ** Default DateTime Format
export const defaultFormatTime = 'DD MMM, YYYY h:mm A'

// ** Price to Words
export function numberToRupeesInWords(amount: number): string {
  // Arrays for number words
  const ones: string[] = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen'
  ]
  const tens: string[] = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']

  // Handle negative numbers
  if (amount < 0) {
    return 'Minus ' + numberToRupeesInWords(Math.abs(amount))
  }

  // Handle zero
  if (amount === 0) {
    return 'Zero Rupees'
  }

  // Split the amount into integer and decimal parts
  const rupees: number = Math.floor(amount)
  const paise: number = Math.round((amount - rupees) * 100)

  // Convert numbers to words
  function convertLessThanThousand(num: number): string {
    if (num === 0) return ''
    if (num < 20) return ones[num]
    if (num < 100) return `${tens[Math.floor(num / 10)]} ${ones[num % 10]}`.trim()

    return `${ones[Math.floor(num / 100)]} Hundred ${convertLessThanThousand(num % 100)}`.trim()
  }

  // Process rupees
  let result: string = ''
  if (rupees >= 10000000) {
    // Crores
    result += convertLessThanThousand(Math.floor(rupees / 10000000)) + ' Crore '
    result += convertLessThanThousand(Math.floor((rupees % 10000000) / 100000)) + ' Lakh '
  } else if (rupees >= 100000) {
    // Lakhs
    result += convertLessThanThousand(Math.floor(rupees / 100000)) + ' Lakh '
  }

  result += convertLessThanThousand(Math.floor((rupees % 100000) / 1000)) + ' Thousand '
  result += convertLessThanThousand(rupees % 1000)

  // Add 'Rupees' to the result
  result = result.trim() + ' Rupees'

  // Process paise
  if (paise > 0) {
    result += ' and ' + convertLessThanThousand(paise) + ' Paise'
  }

  return result.trim()
}

export const retrieveFileName = (path: string) => {
  if (!path || typeof path !== 'string') return path

  return path?.split('/')?.at(-1)
}

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}

// ?* Time TO MINUTES
export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number)

  return hours * 60 + minutes
}
