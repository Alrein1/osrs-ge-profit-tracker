import React, {useState, useEffect} from 'react';
import './global.css'
import styles from './css_modules/NewTransaction.module.css'
import InvalidInput from './InvalidInput';


function NewTransaction({setTransactions}) {
    const [formItemName, setFormItemName] = useState('');
    const [formItemBuyPrice, setFormItemBuyPrice] = useState('');
    const [formItemQuantity, setFormItemQuantity] = useState('');
    const [addTransactionMode, toggleAddTransactionMode] = useState(false);
    const [invalidInputError, setInvalidInputError] = useState(false);
    
    const clearFields = () => {
        setFormItemName('');
        setFormItemQuantity('');
        setFormItemBuyPrice('');
    }
    const validateInput = () => {
        if (formItemName.length > 0 && formItemBuyPrice > 0 && formItemQuantity > 0) {
            return true;
        }
        return false;
    }
    const fetchData = () => {
        if (validateInput()) {
            fetch(`/api/m=itemdb_oldschool/api/catalogue/items.json?category=1&alpha=${formItemName.toLowerCase()}&page=1`)
            .then(response => response.json())
            .then(jsonData => {
                const item = jsonData.items[0];
                if(!item) {
                    return
                }
                setTransactions(prev => [{quantity: formItemQuantity, buyPrice: formItemBuyPrice, sellPrice: 0, profit: 0, name: item.name, icon: item.icon_large, id: `${item.id}-${Math.floor(Math.random() * 1000)}`, sold: false}, ...prev])
            })
            .catch(err => {
                console.log(err);
            })
            clearFields();
            toggleAddTransactionMode(!addTransactionMode)  
            setInvalidInputError(false);
        } else {
            setInvalidInputError(true);
        }
    }
    return(
        <div className='newTransaction'>
            {
                addTransactionMode ? 
            <div>
                <form className='addTransactionForm' autoComplete='off' onSubmit={(e) => {
                    e.preventDefault();
                    fetchData();
                }}>
                    <div className='labels'>
                        <label className='newTransactionLabel' htmlFor='itemName'>Name </label>
                        <label className='newTransactionLabel' htmlFor='quantity'>Quantity </label>
                        <label className='newTransactionLabel' htmlFor='buyPrice'>Buy price </label>
                    </div>
                    <div className='inputs'>
                        <input className='newTransactionInput' name='itemName' value={formItemName} onChange={({target}) => setFormItemName(target.value)}/>
                        <input className='newTransactionInput' value={formItemQuantity} onChange={({target}) => setFormItemQuantity(target.value)}/>
                        <input className='newTransactionInput' value={formItemBuyPrice} onChange={({target}) => setFormItemBuyPrice(target.value)}/>
                    </div>
                    
                    <button id='cancel' onClick={() => {
                        toggleAddTransactionMode(!addTransactionMode);
                        clearFields();
                        setInvalidInputError(false);
                    }}>Cancel</button>
                    <button id='add' type='submit'>Add transaction</button>
                    <div className='error'>
                        {invalidInputError ?
                        <InvalidInput name={formItemName} quantity={formItemQuantity} price={formItemBuyPrice}/>
                        : null
                        }
                    </div>
                </form>
            </div>
            : 
            <button id='toggleAddModeButton' onClick={() => {
                toggleAddTransactionMode(!addTransactionMode)
            }}>
                New transaction
            </button>
            }
        </div>
    )
}

export default NewTransaction;