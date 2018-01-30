import classNames from 'classnames'
import styles from './styles'

const Preloader = ({ size, position }) => {
  const classList = classNames({
    [styles.preloader]: true,
    [styles.isSmall]: size === 'small',
    [styles.isAbsolute]: position === 'absolute'
  })

  return (<div className={classList} />)
}

export default Preloader

Preloader.defaultProps = {
  size: 'regular',
  position: 'relative'
}

Preloader.propTypes = {
  size: PropTypes.oneOf(['small', 'regular']),
  position: PropTypes.oneOf(['absolute', 'relative'])
}
