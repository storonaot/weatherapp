import { groupByDate } from 'helpers'
import config from '../config'

const apiKey = config.OPEN_WEATHER_MAP_API_KEY
const baseUrl = config.OPEN_WEATHER_MAP_BASE_URL

const fetchWeatherByCity = cityId => (dispatch) => {
  dispatch({
    type: 'FETCH_WEATHER_BY_CITY_ONLOAD'
  })
  const url = `${baseUrl}forecast?id=${cityId}&units=metric&appid=${apiKey}`

  return axios.get(url).then((response) => {
    const list = groupByDate(response.data.list, 'dt_txt')
    dispatch({
      type: 'FETCH_WEATHER_BY_CITY_SUCCESS',
      payload: { ...response.data, list }
    })
  }, (error) => {
    console.error('error', error)
    dispatch({
      type: 'FETCH_WEATHER_BY_CITY_ERROR',
      payload: error.response
    })
  })
}

export default fetchWeatherByCity
