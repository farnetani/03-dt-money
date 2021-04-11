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

// interface TransactionInput {
//   title: string
//   amount: number
//   type: string
//   category: string
// }

// Sintaxe reduzida que faz a mesma coisa que se eu criasse o código acima do TransactionInput sem o id e o createdAt
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

// ou poderíamos utilizar o Pick que é o contrário do Omit
// type TransactionInput = Pick<
//   Transaction,
//   'title' | 'amount' | 'type' | 'category'
// >

interface TransactionsProviderProps {
  children: ReactNode // Esse ReactNode significa que aceita qualquer coisa JSX, ou seja, qualquer coisa dentro dele
}

interface TransactionsContextData {
  transactions: Transaction[]
  createTransaction: (transaction: TransactionInput) => Promise<void>
}

// export const TransactionsContext = createContext<Transaction[]>([])
export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
)

// Componente do tipo TransactionsContext.Provider (vai substituir ele na verdade)
export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api('transactions').then((response) => {
      console.log(response.data)
      setTransactions(response.data.transactions)
    })
  }, []) // vai buscar uma única vez

  // Pegamos a lógica que tava no NewTransactionModal e jogamos pra cá
  async function createTransaction(transactionInput: TransactionInput) {
    // const data = { title, value, category, type }

    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date()
    })
    const { transaction } = response.data

    setTransactions([...transactions, transaction])
  }

  return (
    // <TransactionsContext.Provider value={transactions}>
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}
