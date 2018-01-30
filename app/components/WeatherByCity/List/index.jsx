import DayItem from './DayItem'

const List = ({ data }) => (
  <div>
    {data.map(day => (
      <DayItem key={day[0].dt} data={day} />
    ))}
  </div>
)

export default List

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.array).isRequired
}
