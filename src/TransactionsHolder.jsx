import { useMemo, useState } from 'react'
import './global.css'
import styles from './css_modules/TransactionsHolder.module.css'
import { Transaction } from './Transaction'
import { MOCK_DATA } from './test/example'

const getNumberOfPages = (transactions, filteredTransactions, filter, itemsPerPage) => {
  if (transactions.length === 0) {
    return 1
  }

  if (filter === 'all') {
    return Math.ceil(transactions.length / itemsPerPage)
  }

  return Math.ceil(transactions.length / itemsPerPage)
}

function TransactionsHolder({ transactions, setTransactions }) {
  const [filter, setFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10
  let numberOfPages = 0

  const filteredTransactions = useMemo(() => {
    const getCurrentTransactions = () => {
      switch (filter) {
        case 'all':
          return transactions
        case 'active':
          return transactions.filter((transaction) => transaction.sold === false)
        case 'completed':
          return transactions.filter((transaction) => transaction.sold === true)
        default:
          return transactions
      }
    }
    return getCurrentTransactions().slice(
      (currentPage - 1) * itemsPerPage,
      (currentPage - 1) * itemsPerPage + itemsPerPage,
    )
  }, [filter, transactions, currentPage])

  const generateExample = () => {
    setTransactions(MOCK_DATA)
  }

  const totalProfit = useMemo(() => {
    let profit = 0
    transactions.forEach((transaction) => {
      profit += transaction.profit
    })
    return profit
  }, [transactions])

  const updateTransaction = (transactionId, data) => {
    const transaction = transactions.find(({ id }) => id === transactionId)
    const updatedTransaction = { ...transaction, ...data }
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === transactionId ? updatedTransaction : transaction,
      ),
    )
  }

  const markAsSold = (id, price) => {
    const transaction = transactions.find((transaction) => transaction.id === id)
    const profit = Math.floor(
      (price - transaction.buyPrice) * transaction.quantity - transaction.quantity * price * 0.01,
    )

    updateTransaction(id, {
      price,
      profit,
    })
  }
  const removeTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id))
  }

  const handleSetFilter = (filter) => () => {
    setCurrentPage(1)
    setFilter(filter)
  }

  return (
    <div className="transactionsHolder">
      {!transactions.length ? (
        <button
          onClick={() => {
            generateExample()
          }}
        >
          Generate example
        </button>
      ) : null}

      <div className={styles.holder}>
        <div className={styles.header}>
          <div className={styles.filters}>
            <p>Show</p>
            <button
              className={filter === 'all' ? styles.selected : null}
              onClick={handleSetFilter('all')}
            >
              All
            </button>
            <button
              className={filter === 'active' ? styles.selected : null}
              onClick={handleSetFilter('active')}
            >
              Active
            </button>
            <button
              className={filter === 'completed' ? styles.selected : null}
              onClick={handleSetFilter('completed')}
            >
              Completed
            </button>
          </div>
          <div className={styles.total}>
            <p>Total profit: {totalProfit.toLocaleString('en-US')}</p>
            <p>Number of transactions: {transactions.length}</p>
          </div>
          <div className={styles.navigation}>
            <button
              onClick={() => {
                if (currentPage !== 1) {
                  setCurrentPage((prev) => prev - 1)
                }
              }}
            >
              Previous page
            </button>
            <p>
              {currentPage}/{numberOfPages}
            </p>
            <button
              onClick={() => {
                if (currentPage !== numberOfPages) {
                  setCurrentPage((prev) => prev + 1)
                }
              }}
            >
              Next page
            </button>
          </div>
        </div>
        <div className={styles.transactions}>
          {filteredTransactions.map((transaction) => (
            <Transaction
              key={transaction.id}
              quantity={transaction.quantity}
              buyPrice={transaction.buyPrice}
              sellPriceProp={transaction.sellPrice}
              name={transaction.name}
              icon={transaction.icon}
              id={transaction.id}
              profitProp={transaction.profit}
              soldStatusProp={transaction.sold}
              markAsSold={markAsSold}
              removeTransaction={removeTransaction}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TransactionsHolder
