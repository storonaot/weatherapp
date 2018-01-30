import Item from './Item'
import styles from './styles'

const List = ({ data, clickOnItem, addToFavorites, removeFromFavorites }) => (
  <ul className={styles.list}>
    {data.map(item => (
      <Item
        handleClick={clickOnItem}
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
        key={item.id}
        item={item}
      />
    ))}
  </ul>
)

export default List

List.defaultProps = {
  addToFavorites: null,
  removeFromFavorites: null
}

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  clickOnItem: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func,
  removeFromFavorites: PropTypes.func
}
