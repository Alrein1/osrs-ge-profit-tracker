import styles from './css_modules/App.module.css'
import './global.css'
import { TransactionsPage } from './pages/TransactionsPage'

function App() {
  return (
    <div className={styles.app}>
      <TransactionsPage />
    </div>
  )
}

export default App
