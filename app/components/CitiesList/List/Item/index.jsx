import { getDataFromLS } from 'helpers'
import { RoundBtn } from '_shared'
import styles from './styles'

const Item = ({ item, handleClick, addToFavorites, removeFromFavorites }) => {
  const stopProp = (event, id, func) => {
    event.stopPropagation()
    func(id)
  }

  // TODO: take out this logic
  const favoriteCities = getDataFromLS('favoriteCities')
  const hasItem = id => _.findIndex(favoriteCities, i => i === id) < 0

  return (
    <li>
      <div
        className={styles.item}
        role="button"
        tabIndex={0}
        onClick={() => handleClick(item.id)}
      >
        <div style={{ display: 'flex' }}>
          <div>{item.name}</div>
          <div className={styles.t}>{item.main.temp} &#8451;</div>
        </div>
        {(addToFavorites && hasItem(item.id)) && (
          <RoundBtn
            handleClick={(e) => { stopProp(e, item.id, addToFavorites) }}
            color="green"
          >+</RoundBtn>
        )}
        {removeFromFavorites && (
          <RoundBtn
            handleClick={(e) => { stopProp(e, item.id, removeFromFavorites) }}
            color="red"
          >-</RoundBtn>
        )}
      </div>
    </li>
  )
}

export default Item

Item.defaultProps = {
  addToFavorites: null,
  removeFromFavorites: null
}

Item.propTypes = {
  item: PropTypes.shape({}).isRequired,
  handleClick: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func,
  removeFromFavorites: PropTypes.func
}
