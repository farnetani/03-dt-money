import { useContext } from 'react'
import { TransactionsContext } from '../../TransactionsContext'
import { Container } from './styles'

export function TransactionsTable() {
  // Importando o contexto
  const { transactions } = useContext(TransactionsContext)
  // const [transactions, setTransactions] = useState<Transaction[]>([])
  // useEffect(() => {
  //   api('transactions').then((response) => {
  //     console.log(response.data)
  //     setTransactions(response.data.transactions)
  //   })
  // }, []) // vai buscar uma única vez

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(
                  new Date(transaction.createdAt)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}
