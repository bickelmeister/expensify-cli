export function normalizeAndParse(amount: string): number {
  const normalizedAmount = amount.replace(',', '.')
  const parsedAmount = parseFloat(normalizedAmount)

  if (isNaN(parsedAmount)) {
    throw new Error(`Ungültiger Betrag: ${amount}`)
  }

  return parsedAmount
}
