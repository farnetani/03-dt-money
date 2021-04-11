import React, { useState } from 'react'
import { Dashboard } from './components/Dashboard'
import { Header } from './components/Header'
import { NewTransactionModal } from './components/NewTransactionModal'
import { GlobalStyle } from './styles/global'
import {
  // TransactionsContext,
  TransactionsProvider
} from './TransactionsContext'

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(
    false
  )

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false)
  }
  return (
    // <TransactionsContext.Provider value={[]}>
    // Aqui eu uso o componente que criamos no Contexto que inclusive vai substituir o Contexto.Provider com a propriedade children (que pega tudo que tá entre ele)
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />

      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle />
    </TransactionsProvider>
    // </TransactionsContext.Provider>>
  )
}
