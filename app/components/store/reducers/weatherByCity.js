const defaultState = {
  loading: true,
  data: null,
  errors: null
}

export default function weatherByCity(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_WEATHER_BY_CITY_ONLOAD':
      return {
        loading: true,
        data: null,
        errors: null
      }
    case 'FETCH_WEATHER_BY_CITY_SUCCESS':
      return {
        loading: false,
        data: action.payload,
        errors: null
      }
    case 'FETCH_WEATHER_BY_CITY_ERROR':
      return {
        loading: false,
        data: null,
        errors: action.payload
      }
    default:
      return state
  }
}
