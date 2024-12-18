import { UUID } from 'crypto'

export interface Transaction {
  id: number
  date: string
  category: string
  description: string
  amount: number
}
