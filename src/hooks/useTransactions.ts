import {useContext} from 'react';
import {TransactionsContext} from '../TransactionsContext'

export function useTransactions() {
  const value = useContext(TransactionsContext)

  return value
}
