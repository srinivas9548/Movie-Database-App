import {Link, withRouter} from 'react-router-dom'

import {IoSearch, IoMenu, IoClose} from 'react-icons/io5'

import './index.css'

const Header = props => {
  const {
    isMenubarOpen,
    toggleMenubar,
    isSearchOpen,
    toggleSearchbar,
    searchInput,
    onChangeSearchInput,
    location,
    onClickSearchBtn,
  } = props

  const onClickKeyDown = event => {
    if (event.key === 'Enter') {
      onClickSearchBtn()
    }
  }

  const getActiveClass = path => (location.pathname === path ? 'active' : '')

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/" className="nav-link">
          <h1 className="nav-logo-heading">movieDB</h1>
        </Link>
        <div className="nav-mobile-container">
          <IoSearch className="search-menu" onClick={toggleSearchbar} />
          <IoMenu className="hamburger-menu" onClick={toggleMenubar} />
        </div>
        <div className="nav-desktop-container">
          <ul className="nav-item-container">
            <Link to="/" className="nav-link">
              <li className={`nav-item ${getActiveClass('/')}`}>Popular</li>
            </Link>
            <Link to="/top-rated" className="nav-link">
              <li className={`nav-item ${getActiveClass('/top-rated')}`}>
                Top Rated
              </li>
            </Link>
            <Link to="/upcoming" className="nav-link">
              <li className={`nav-item ${getActiveClass('/upcoming')}`}>
                Upcoming
              </li>
            </Link>
          </ul>
          <input
            type="search"
            className="nav-search-input"
            placeholder="Movie Name"
            value={searchInput}
            onChange={onChangeSearchInput}
            onKeyDown={onClickKeyDown}
          />
          <button
            type="button"
            className="search-button"
            onClick={onClickSearchBtn}
          >
            Search
          </button>
        </div>
      </div>

      {/* isSearchbar is true then it open the Searchbar */}
      {isSearchOpen && (
        <div className="mobile-search-bar">
          <input
            type="search"
            className="mobile-search-input"
            placeholder="Movie Name"
            value={searchInput}
            onChange={onChangeSearchInput}
            onKeyDown={onClickKeyDown}
          />
          <button
            type="button"
            className="search-btn-mobile"
            onClick={onClickSearchBtn}
          >
            Search
          </button>
        </div>
      )}

      {/* isMenubarOpen is true then it open the Menubar */}
      {isMenubarOpen && (
        <div className="mobile-menubar">
          <IoClose className="close-icon" onClick={toggleMenubar} />
          <ul className="menubar-item-container">
            <Link to="/" className="nav-link">
              <li className={`menubar-item ${getActiveClass('/')}`}>Popular</li>
            </Link>
            <Link to="/top-rated" className="nav-link">
              <li className={`menubar-item ${getActiveClass('/top-rated')}`}>
                Top Rated
              </li>
            </Link>
            <Link to="/upcoming" className="nav-link">
              <li className={`menubar-item ${getActiveClass('/upcoming')}`}>
                Upcoming
              </li>
            </Link>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default withRouter(Header)
