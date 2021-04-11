import { useState, useEffect, ReactNode } from 'react'
import { createContext } from 'react'
import { api } from './services/api'

interface Transaction {
  id: number
  title: string
  amount: number
  type: string
  category: string
  createdAt: string
}

interface TransactionsProviderProps {
  children: ReactNode // Esse ReactNode significa que aceita qualquer coisa JSX, ou seja, qualquer coisa dentro dele
}

export const TransactionsContext = createContext<Transaction[]>([])

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  useEffect(() => {
    api('transactions').then((response) => {
      console.log(response.data)
      setTransactions(response.data.transactions)
    })
  }, []) // vai buscar uma única vez

  return (
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>
  )
}
