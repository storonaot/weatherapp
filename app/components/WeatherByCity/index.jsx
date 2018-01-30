import { Container, Preloader, Title } from '_shared'
import { fetchWeatherByCity } from 'store/actions'
import { connect } from 'react-redux'
import List from './List'

class WeatherByCity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { onFetchWeatherByCity, routeParams } = this.props
    onFetchWeatherByCity(routeParams.id)
  }

  render() {
    const { loading, errors, data } = this.props.weather
    return (
      <Container>
        {loading && <Preloader position="absolute" />}
        {data && (
          <div>
            <Title h={1}>{data.city.name}</Title>
            <List data={data.list} />
          </div>
        )}
        {errors && <div>Ooops.... Smth went wrong :(</div>}
      </Container>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    weather: state.weatherByCity,
    ownProps
  }),
  dispatch => ({
    onFetchWeatherByCity: (id) => {
      dispatch(fetchWeatherByCity(id))
    }
  })
)(WeatherByCity)

WeatherByCity.propTypes = {
  weather: PropTypes.shape({
    loading: PropTypes.bool,
    errors: PropTypes.shape({}),
    data: PropTypes.shape({})
  }).isRequired,
  routeParams: PropTypes.shape({}).isRequired,
  onFetchWeatherByCity: PropTypes.func.isRequired
}
