export function normalizeAndParse(amount: string): number {
  const normalizedAmount = amount.replace(',', '.')
  const parsedAmount = parseFloat(normalizedAmount)

  if (isNaN(parsedAmount)) {
    throw new Error(`Ungültiger Betrag: ${amount}`)
  }

  return parsedAmount
}

export function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split('.')
  return new Date(`${year}-${month}-${day}`)
}
