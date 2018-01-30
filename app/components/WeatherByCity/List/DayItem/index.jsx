import { Title } from '_shared'
import moment from 'moment'
import ForecastItem from '../ForecastItem'
import styles from './styles'

const DayItem = ({ data }) => {
  const date = moment(data[0].dt_txt).format('MMMM Do YYYY')

  return (
    <div>
      <Title h={4}>{date}</Title>
      <ul className={styles.dayBlock} key={data[0].dt}>
        {data.map(item => (
          <ForecastItem key={item.dt} item={item} />
        ))}
      </ul>
    </div>
  )
}

export default DayItem

DayItem.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired
}
