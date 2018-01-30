import classNames from 'classnames'
import styles from './styles'

const RoundBtn = ({ handleClick, children, color }) => {
  const classList = classNames({
    [styles.button]: true,
    [styles[color]]: true
  })
  return (
    <button className={classList} onClick={(e) => { handleClick(e) }}>{children}</button>
  )
}
export default RoundBtn

RoundBtn.defaultProps = {
  handleClick: () => {},
  color: 'green'
}

RoundBtn.propTypes = {
  handleClick: PropTypes.func,
  children: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['green', 'red'])
}
