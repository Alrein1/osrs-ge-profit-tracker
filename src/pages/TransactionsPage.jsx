import { useState } from 'react'
import NewTransaction from '../NewTransaction'
import TransactionsHolder from '../TransactionsHolder'

export const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([])

  return (
    <div style={{ width: '100%', padding: '1rem', display: 'flex' }}>
      <NewTransaction setTransactions={setTransactions} />
      <TransactionsHolder transactions={transactions} setTransactions={setTransactions} />
    </div>
  )
}
