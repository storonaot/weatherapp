const defaultState = {
  loading: true,
  data: null,
  errors: null
}

export default function citiesByPage(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_CITY_LIST_ONLOAD': {
      if (state.data) {
        return state
      }
      return {
        loading: true,
        data: null,
        errors: null
      }
    }
    case 'FETCH_CITY_LIST_SUCCESS':
      return {
        loading: false,
        data: action.payload,
        errors: null
      }
    case 'FETCH_CITY_LIST_ERROR':
      return {
        loading: false,
        data: null,
        errors: action.payload
      }
    default:
      return state
  }
}
