import Modal from 'react-modal'
import { Container } from './styles'

// Modal.setAppElement('root') // recomendação da react-modal

interface NewTransactionModalProps {
  isOpen: boolean
  onResquestClose: () => void
}

export function NewTransactionModal({
  isOpen,
  onResquestClose
}: NewTransactionModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onResquestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container>
        <h2>Cadastrar transação</h2>
        <input type="text" className="input" placeholder="Título" />
        <input type="number" className="input" placeholder="Valor" />
        <input type="text" className="input" placeholder="Categoria" />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  )
}
