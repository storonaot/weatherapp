const groupByDate = (arr, keyName) => {
  const resArr = []
  const groupped = _.groupBy(arr, i => (
    `${new Date(i[keyName]).getMonth() + 1}.${new Date(i[keyName]).getDate()}`
  ))

  _.forIn(groupped, (val) => { resArr.push(val) })

  return resArr
}

export default groupByDate
