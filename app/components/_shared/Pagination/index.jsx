import { range as _range } from 'lodash'
import styles from './styles'

const Pagination = ({
  countOfBtns, onChangePage, totalItems, itemsOnPage, currentPage
}) => {
  const margin = countOfBtns - 1
  const floorMargin = Math.floor(margin / 2)
  const ceilMargin = Math.ceil(margin / 2)

  const pager = () => {
    const totalPages = Math.ceil(totalItems / itemsOnPage)
    let startPage = 1
    let endPage = totalPages

    if (totalPages > countOfBtns) {
      if (currentPage <= ceilMargin) {
        startPage = 1
        endPage = countOfBtns
      } else if (currentPage + floorMargin >= totalPages) {
        startPage = totalPages - (countOfBtns - 1)
        endPage = totalPages
      } else {
        startPage = currentPage - ceilMargin
        endPage = (startPage + countOfBtns) - 1
      }
    }

    const startIndex = (currentPage - 1) * itemsOnPage
    const endIndex = Math.min((startIndex + itemsOnPage) - 1, totalItems - 1)

    const pages = _range(startPage, endPage + 1)

    return {
      totalItems,
      currentPage,
      itemsOnPage,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages
    }
  }

  const changePage = (page) => {
    if (page >= 1 && page <= pager().totalPages) onChangePage(page)
  }

  const getDots = (type) => {
    const { totalPages } = pager()
    if (totalPages > countOfBtns) {
      if (type === 'prew' && currentPage + floorMargin > countOfBtns) {
        return (<div disabled className={styles.item}>...</div>)
      }
      if (type === 'next' && currentPage + floorMargin < totalPages) {
        return (<div disabled className={styles.item}>...</div>)
      }
    }
    return null
  }

  const getUltraNumber = (type) => {
    const { totalPages } = pager()
    if (totalPages > countOfBtns) {
      if (type === 'prew' && currentPage + floorMargin > countOfBtns) {
        return (
          <div
            role="button"
            tabIndex={0}
            disabled={currentPage === 1}
            className={styles.item}
            onClick={() => { changePage(1) }}
          >1</div>
        )
      }
      if (type === 'next' && currentPage + floorMargin < totalPages) {
        return (
          <div
            role="button"
            tabIndex={0}
            disabled={currentPage === totalPages}
            className={styles.item}
            onClick={() => { changePage(totalPages) }}
          >{totalPages}</div>
        )
      }
    }
    return null
  }

  const getBtnClass = page => (
    currentPage === page ? `${styles.item} ${styles.isActive}` : styles.item
  )

  if (!pager().pages || pager().pages.length <= 1) return null

  return (
    <div className={styles.wrapper}>
      <div
        disabled={pager().currentPage === 1}
        className={styles.item}
        role="button"
        tabIndex={0}
        onClick={() => { changePage(pager().currentPage - 1) }}
      >«</div>
      {getUltraNumber('prew')}
      {getDots('prew')}
      {pager().pages.map(page => (
        <div
          key={page}
          className={getBtnClass(page)}
          role="button"
          tabIndex={0}
          onClick={() => { changePage(page) }}
        >{page}</div>
      ))}
      {getDots('next')}
      {getUltraNumber('next')}
      <div
        disabled={pager().currentPage === pager().totalPages}
        className={styles.item}
        role="button"
        tabIndex={0}
        onClick={() => { changePage(pager().currentPage + 1) }}
      >»</div>
    </div>
  )
}


export default Pagination

Pagination.defaultProps = {
  countOfBtns: 3,
  itemsOnPage: 20
}

Pagination.propTypes = {
  countOfBtns: PropTypes.number,
  itemsOnPage: PropTypes.number,
  onChangePage: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
}
