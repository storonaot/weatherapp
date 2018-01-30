import { getCityIds, pushDataToLS, removeItemFromLSArr, getDataFromLS } from 'helpers'
import config from '../config'

const apiKey = config.OPEN_WEATHER_MAP_API_KEY
const baseUrl = config.OPEN_WEATHER_MAP_BASE_URL

const getUrl = ids => `${baseUrl}group?id=${ids}&units=metric&appid=${apiKey}`

const fetchCityListByPage = (offset, count) => (dispatch) => {
  dispatch({
    type: 'FETCH_CITY_LIST_ONLOAD'
  })

  const ids = getCityIds(offset, count)

  return axios.get(getUrl(ids)).then((response) => {
    dispatch({
      type: 'FETCH_CITY_LIST_SUCCESS',
      payload: response.data
    })
  }, (error) => {
    console.error('error', error)
    dispatch({
      type: 'FETCH_CITY_LIST_ERROR',
      payload: error.response
    })
  })
}

const fetchFavoriteCityList = () => (dispatch) => {
  dispatch({
    type: 'FETCH_FAVORITE_CITY_LIST_ONLOAD'
  })

  const ids = (getDataFromLS('favoriteCities') || []).join(',')

  if (ids.length) {
    return axios.get(getUrl(ids)).then((response) => {
      dispatch({
        type: 'FETCH_FAVORITE_CITY_LIST_SUCCESS',
        payload: response.data
      })
    }, (error) => {
      console.error('error', error)
      dispatch({
        type: 'FETCH_FAVORITE_CITY_LIST_ERROR',
        payload: error.response
      })
    })
  }
  dispatch({
    type: 'FETCH_FAVORITE_CITY_LIST_SUCCESS',
    payload: { list: [] }
  })
  return null
}

const pushToFavorites = item => (dispatch) => {
  pushDataToLS('favoriteCities', item.id)
  dispatch({
    type: 'PUSH_TO_FAVORITES',
    payload: item
  })
}

const removeFromFavorites = id => (dispatch) => {
  removeItemFromLSArr('favoriteCities', id)
  dispatch({
    type: 'REMOVE_FROM_FAVORITES',
    payload: id
  })
}

export {
  fetchCityListByPage, fetchFavoriteCityList, pushToFavorites,
  removeFromFavorites
}
