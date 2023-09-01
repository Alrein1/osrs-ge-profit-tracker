import React, {useState} from 'react';
import styles from './css_modules/Transaction.module.css';

function Transaction({ quantity, buyPrice, sellPriceProp, name, icon, id, profitProp, soldStatusProp, markAsSold, removeTransaction}) {
    const [sold, setSold] = useState(soldStatusProp);
    const [sellPrice, setSellPrice] = useState(sellPriceProp);
    const [profit, setProfit] = useState(profitProp);
    return(
        <div className={styles.transaction}>
            <div className={styles.info}>
                <img src={icon} />
                <h1 className={styles.itemName}>{name}</h1>
                <p>Quantity: {parseInt(quantity).toLocaleString('en-US')}</p>
                <p>Buy price: {parseInt(buyPrice).toLocaleString('en-US')}</p>
            { !sold ? 
            <>
                <label htmlFor='sellPrice'>Sell price: </label>
                <input id={styles['sellPriceField']} autoComplete='off' name='sellPrice' value={sellPrice} onChange={({target}) => setSellPrice(target.value)}></input>
            </>
            :
            <>
            <p>Sell price: {parseInt(sellPrice).toLocaleString('en-US')}</p>
            <p>Profit: {profit.toLocaleString('en-US')}</p>
            </>
            }
            </div>
            { !sold ?
            <button id={styles['sellButton']} onClick={() => {
                if(sellPrice > 0) {
                    setProfit((Math.floor((sellPrice - buyPrice) * quantity - quantity * sellPrice * 0.01).toLocaleString('en-US')));
                    markAsSold(id, sellPrice);
                    setSold(true);}
                }}>Mark as sold</button>
                : null
                }
            <button id={styles['deleteButton']} onClick={() => {
                    removeTransaction(id);
                }}>Delete</button>
        </div>
    )
}

export default Transaction;