import moment from 'moment'
import styles from './styles'

const ForecastItem = ({ item }) => {
  const date = moment(item.dt_txt).format('LT')
  const icon = item.weather[0].icon
  const iconSrc = `http://openweathermap.org/img/w/${icon}.png`

  return (
    <li className={styles.item}>
      <div className={styles.date}>{date}</div>
      <div
        className={styles.icon}
        style={{ backgroundImage: `url(${iconSrc})` }}
      />
      <div className={styles.t}>{item.main.temp} &#8451;</div>
    </li>
  )
}

export default ForecastItem

ForecastItem.propTypes = {
  item: PropTypes.shape({}).isRequired
}
