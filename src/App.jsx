import React, {useEffect, useState} from 'react';
import NewTransaction from './NewTransaction';
import TransactionHolder from './TransactionsHolder'
import styles from './css_modules/App.module.css';
import './global.css'

function App() {
    const [transactions, setTransactions] = useState([]);
    
    return(
        <div className='app'>
            <NewTransaction setTransactions={setTransactions} />
            <TransactionHolder transactions={transactions} setTransactions={setTransactions}/>
        </div>
    )
}

export default App;