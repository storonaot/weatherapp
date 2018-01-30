const setDataToLS = (key, data) => {
  const serialData = JSON.stringify(data)
  localStorage.setItem(key, serialData)
}

const getDataFromLS = (key) => {
  const data = localStorage.getItem(key)
  if (data) {
    return JSON.parse(data)
  }
  return null
}

const pushDataToLS = (key, item) => {
  const data = getDataFromLS(key)
  if (data) {
    const uniqArr = _.uniq([...data, item])
    setDataToLS(key, uniqArr)
  } else {
    setDataToLS(key, [item])
  }
}

const removeItemFromLSArr = (key, itemId) => {
  const data = getDataFromLS(key)
  return setDataToLS(key, data.filter(i => i !== itemId))
}

export { setDataToLS, getDataFromLS, pushDataToLS, removeItemFromLSArr }
