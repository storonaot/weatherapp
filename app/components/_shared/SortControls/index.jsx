import styles from './styles'

const SortControls = ({ setSort, activeSort }) => (
  <div className={styles.controls}>
    <button
      className={styles.button}
      disabled={activeSort === 'alpha'}
      onClick={() => { setSort('alpha') }}
    >A-Z</button>
    <button
      className={styles.button}
      disabled={activeSort === 't'}
      onClick={() => { setSort('t') }}
    > t&ordm; &uarr;-&darr;</button>
  </div>
)

export default SortControls

SortControls.defaultProps = {
  activeSort: null
}

SortControls.propTypes = {
  setSort: PropTypes.func.isRequired,
  activeSort: PropTypes.string
}
