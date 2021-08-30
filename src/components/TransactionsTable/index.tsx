import { useTransactions } from "../../hooks/useTransactions"
import { Container } from "./styles"
import { api } from "../../services/api"

import closeImg from "../../assets/close.svg"

export function TransactionsTable() {
  const { setTransactions, transactions } = useTransactions()

  async function handleDeleteTransaction(transactionId: number) {
    await api.delete(`/transactions/${transactionId}`)

    const response = await api.get("/transactions")

    setTransactions(response.data.transactions)
  }

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
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
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat("pt-BR").format(
                  new Date(transaction.createdAt)
                )}
              </td>
              <td>
                <img
                  onClick={() => handleDeleteTransaction(transaction.id)}
                  src={closeImg}
                  alt="Excluir depósito"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}
