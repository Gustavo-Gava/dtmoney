import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react"
import { api } from "./services/api"

type Transaction = {
  id: number
  title: string
  type: string
  category: string
  amount: number
  createdAt: string
}

type TransactionInput = Omit<Transaction, "id" | "createdAt">

type TransactionsProviderProps = {
  children: ReactNode
}

type TransactionsContextData = {
  transactions: Transaction[]
  createTransaction: (transaction: TransactionInput) => Promise<void>
  setTransactions: Dispatch<SetStateAction<Transaction[]>>
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api
      .get("transactions")
      .then((response) => setTransactions(response.data.transactions))
  }, [])

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post("/transactions", transactionInput)
    const { transaction } = response.data

    setTransactions([...transactions, transaction])
  }

  return (
    <TransactionsContext.Provider
      value={{ transactions, setTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
