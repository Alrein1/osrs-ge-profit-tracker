import styles from './css_modules/InvalidInput.module.css'

function InvalidInput({ name, quantity, price }) {
  return (
    <div className={styles.error}>
      {name === '' ? <p>Name field must not be empty</p> : null}
      {quantity <= 0 ? <p>Quantity must be greater than 0</p> : null}
      {price <= 0 ? <p>Buy price must be greater than 0</p> : null}
    </div>
  )
}

export default InvalidInput
