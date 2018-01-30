import classNames from 'classnames'
import styles from './styles'

const Title = ({ h, children, bold, className }) => {
  const Tag = `h${h}`
  const classList = classNames({
    [styles[Tag]]: true,
    [styles.isBold]: bold,
    [className]: className
  })
  return <Tag className={classList}>{children}</Tag>
}

export default Title

Title.defaultProps = {
  h: 3,
  bold: false,
  className: null
}

Title.propTypes = {
  h: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  children: PropTypes.string.isRequired,
  bold: PropTypes.bool,
  className: PropTypes.string
}
