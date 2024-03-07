import styles from './Button.module.css'

function Button({ children, onClick, id }) {
  return (
    <button id={id} className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
