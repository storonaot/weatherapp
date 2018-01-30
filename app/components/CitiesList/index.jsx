import { Container, Title, Preloader, Pagination, SortControls } from '_shared'
import { getDataFromLS, setDataToLS } from 'helpers'
import { connect } from 'react-redux'
import {
  fetchCityListByPage, fetchFavoriteCityList,
  pushToFavorites, removeFromFavorites
} from 'store/actions'
import cityList from 'helpers/city.list.json'
import List from './List'

class CitiesList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: getDataFromLS('currentPage') || 1,
      itemsOnPage: 5,
      activeSort: getDataFromLS('activeSort'),
      countOfCities: cityList.length
    }

    this.changePage = this.changePage.bind(this)
    this.showMore = this.showMore.bind(this)
    this.addCityToFavorites = this.addCityToFavorites.bind(this)
    this.removeCityFromFavorites = this.removeCityFromFavorites.bind(this)
    this.setSort = this.setSort.bind(this)
  }

  componentDidMount() {
    const { onFetchCityList, onFetchFavorites } = this.props
    const { itemsOnPage, currentPage } = this.state

    setTimeout(() => { onFetchCityList(currentPage - 1, itemsOnPage) }, 1000)
    onFetchFavorites()
  }

  setSort(type) {
    this.setState({ activeSort: type }, () => {
      setDataToLS('activeSort', type)
    })
  }

  changePage(page) {
    const { onFetchCityList } = this.props
    const { itemsOnPage } = this.state
    this.setState({ currentPage: page }, () => {
      onFetchCityList(page - 1, itemsOnPage)
      setDataToLS('currentPage', page)
    })
  }

  addCityToFavorites(cityId) {
    const { cities, onPushToFavorites } = this.props
    const city = cities.data.list.find(item => item.id === cityId)
    onPushToFavorites(city)
  }

  removeCityFromFavorites(cityId) {
    const { onRemoveFromFavorites } = this.props
    onRemoveFromFavorites(cityId)
  }

  showMore(cityId) {
    const { router } = this.props
    router.push(`/${cityId}`)
  }

  checkFetchStatus(key) {
    const { favoriteCities, cities } = this.props
    if (key === 'data') return favoriteCities[key] && cities[key]
    return favoriteCities[key] || cities[key]
  }

  sortedCities() {
    const { list } = this.props.cities.data
    const { activeSort } = this.state
    if (activeSort === 'alpha') return _.sortBy(list, [i => i.name])
    else if (activeSort === 't') return _.sortBy(list, [i => i.main.temp])
    return list
  }

  render() {
    const { favoriteCities, cities } = this.props
    const loading = this.checkFetchStatus('loading')
    const error = this.checkFetchStatus('errors')
    const data = this.checkFetchStatus('data')
    const hasFavorites = favoriteCities.data ? !!favoriteCities.data.list.length : false

    if (cities.data) this.sortedCities()

    return (
      <Container>
        <Title h={1}>Simple Weather App</Title>
        {loading && <Preloader />}
        {data && (<div>
          {hasFavorites && (
            <div>
              <Title h={3}>Favorites</Title>
              <List
                data={favoriteCities.data.list}
                clickOnItem={this.showMore}
                removeFromFavorites={this.removeCityFromFavorites}
              />
            </div>
          )}
          <SortControls setSort={this.setSort} activeSort={this.state.activeSort} />
          <List
            data={this.sortedCities()}
            clickOnItem={this.showMore}
            addToFavorites={this.addCityToFavorites}
          />
          <Pagination
            onChangePage={this.changePage}
            itemsOnPage={this.state.itemsOnPage}
            totalItems={this.state.countOfCities}
            currentPage={this.state.currentPage}
          />
        </div>)}
        {error && <div>Ooops.... Smth went wrong :(</div>}
      </Container>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    cities: state.citiesByPage,
    favoriteCities: state.favoriteCities,
    ownProps
  }),
  dispatch => ({
    onFetchCityList: (offset, count) => {
      dispatch(fetchCityListByPage(offset, count))
    },
    onFetchFavorites: () => {
      dispatch(fetchFavoriteCityList())
    },
    onPushToFavorites: (item) => {
      dispatch(pushToFavorites(item))
    },
    onRemoveFromFavorites: (id) => {
      dispatch(removeFromFavorites(id))
    }
  })
)(CitiesList)

CitiesList.propTypes = {
  cities: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.shape({}),
    data: PropTypes.shape({
      list: PropTypes.array
    })
  }).isRequired,
  favoriteCities: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.shape({}),
    data: PropTypes.shape({})
  }).isRequired,
  router: PropTypes.shape({}).isRequired,
  onFetchCityList: PropTypes.func.isRequired,
  onFetchFavorites: PropTypes.func.isRequired,
  onPushToFavorites: PropTypes.func.isRequired,
  onRemoveFromFavorites: PropTypes.func.isRequired
}
