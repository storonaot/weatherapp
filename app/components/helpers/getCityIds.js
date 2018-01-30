import cityList from './city.list.json'

const getCityIds = (offset, count) => {
  const start = offset * count
  const end = start + count
  const resArr = cityList.slice(start, end)
  return resArr.map(i => i.id).join(',')
}

export default getCityIds
