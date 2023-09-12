import React, {useState} from 'react';
import Transaction from './Transaction';
import './global.css'
import styles from './css_modules/TransactionsHolder.module.css';
import exampleData from './test/example.json'


function TransactionsHolder({transactions, setTransactions}) {
    const [filter, setFilter] = useState('all');
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [totalProfit, setTotalProfit] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [exampleGenerated, setExampleGenerated] = useState(false);
    const itemsPerPage = 10;
    const pageIndex = currentPage - 1;
    let numberOfPages = transactions.length !== 0 ? Math.ceil(filter === 'all' ? transactions.length / itemsPerPage : (filteredTransactions.length !== 0 ? filteredTransactions.length / itemsPerPage : 1)) : 1;

    const generateExample = () => {
        exampleData.forEach(transaction => {
            setTransactions(prev => [{quantity: transaction.quantity, buyPrice: transaction.buyPrice, sellPrice: transaction.sellPrice, profit: transaction.profit, name: transaction.name, icon: transaction.icon, id: transaction.id, sold: transaction.sold}, ...prev])
        })
    }
    const markAsSold = (id, price) => {
        const transactionsCopy = transactions;
        for (const transaction of transactionsCopy) {
            if (transaction.id === id) {
                transaction.sold = true;
                transaction.sellPrice = price;
                transaction.profit = Math.floor((transaction.sellPrice - transaction.buyPrice) * transaction.quantity - transaction.sellPrice * 0.01)
                setTransactions(transactionsCopy);
                setTotalProfit(prev => prev + transaction.profit)
            }
        }
    }
    const removeTransaction = (id) => {
        if ((transactions.length - 1) % itemsPerPage === 0 && currentPage > 1) {
            setCurrentPage(current => current - 1);
        } 
        setTransactions(transactions.filter(transaction => transaction.id !== id));
        setFilteredTransactions(filteredTransactions.filter(transaction => transaction.id !== id));
        setTotalProfit(prev => prev - transactions.filter(transaction => transaction.id === id)[0].profit);
        
    }
    const makeTransactionPropsObject = (transaction) => {
        return {
            key: transaction.id,
            quantity: transaction.quantity,
            buyPrice: transaction.buyPrice,
            sellPriceProp: transaction.sellPrice,
            name: transaction.name,
            icon: transaction.icon,
            id: transaction.id,
            profitProp: transaction.profit,
            soldStatusProp: transaction.sold,
            markAsSold: markAsSold,
            removeTransaction: removeTransaction
        }
    }
    return (
        <div className='transactionsHolder'>
            { !exampleGenerated ?
                <button onClick={() => {
                setExampleGenerated(true);
                generateExample();
            }}>Generate example</button>
            : null
            }
            <div className={styles.holder}>
                <div className={styles.header}>
                    <div className={styles.filters}>
                        <p>Show</p>
                        <button className={filter === 'all' ? styles.selected : null} onClick={ () => {
                            setCurrentPage(1);
                            setFilter('all') }}>All</button>
                        <button className={filter === 'active' ? styles.selected : null} onClick={ () => {
                            setCurrentPage(1);
                            setFilteredTransactions(transactions.filter(transaction => transaction.sold === false));
                            setFilter('active')}}>Active</button>
                        <button className={filter === 'completed' ? styles.selected : null} onClick={ () => {
                            setCurrentPage(1);
                            setFilteredTransactions(transactions.filter(transaction => transaction.sold === true));
                            setFilter('completed');}}>Completed</button>
                    </div>
                    <div className={styles.total}>
                        <p>Total profit: {totalProfit.toLocaleString('en-US')}</p>
                        <p>Number of transactions: {transactions.length}</p>
                    </div>
                    <div className={styles.navigation}>
                    <button onClick={() => {
                        if (currentPage  !== 1) {
                            setCurrentPage(current => current - 1)
                        }
                    }}>Previous page</button>
                    <p>{currentPage}/{numberOfPages}</p>
                    <button onClick={() => {
                        if (currentPage !== numberOfPages) {
                            setCurrentPage(current => current + 1)
                        }
                    }}>Next page</button>
                    </div>
                </div>
                <div className={styles.transactions}>
                    {
                    filter === 'all' ?
                    transactions.slice(pageIndex * itemsPerPage, pageIndex * itemsPerPage + itemsPerPage).map(transaction => (
                        <Transaction {...makeTransactionPropsObject(transaction)}/>
                    ))
                    :
                    filteredTransactions.slice(pageIndex * itemsPerPage, pageIndex * itemsPerPage + itemsPerPage).map(transaction => (
                        <Transaction {...makeTransactionPropsObject(transaction)}/>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default TransactionsHolder;