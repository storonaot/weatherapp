const defaultState = {
  loading: true,
  data: null,
  errors: null
}

export default function favoriteCities(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_FAVORITE_CITY_LIST_ONLOAD':
      return {
        loading: true,
        data: null,
        errors: null
      }
    case 'FETCH_FAVORITE_CITY_LIST_SUCCESS':
      return {
        loading: false,
        data: action.payload,
        errors: null
      }
    case 'FETCH_FAVORITE_CITY_LIST_ERROR':
      return {
        loading: false,
        data: null,
        errors: action.payload
      }
    case 'PUSH_TO_FAVORITES': {
      const { list } = state.data
      const newItem = action.payload
      const hasItem = list.find(i => i.id === newItem.id)
      if (hasItem) return state

      const newList = [...list, action.payload]

      return {
        loading: false,
        data: { ...state.data, list: newList },
        errors: null
      }
    }
    case 'REMOVE_FROM_FAVORITES': {
      const { list } = state.data
      const cityId = action.payload
      const newList = list.filter(i => i.id !== cityId)

      return {
        loading: false,
        data: { ...state.data, list: newList },
        errors: null
      }
    }
    default:
      return state
  }
}
