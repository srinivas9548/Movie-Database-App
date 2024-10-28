import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import MovieCard from '../MovieCard'

import './index.css'

let originalArray

class Home extends Component {
  state = {
    moviesData: [],
    isMenubarOpen: false,
    isSearchOpen: false,
    searchInput: '',
    isLoading: true,
    pageDetails: {
      pageArray: [], // stores the current page's movies
      currentPage: 1, // current page number
      totalPages: 1, // total pages available
    },
  }

  MOVIES_PER_PAGE = 10 // number movies per page

  componentDidMount() {
    this.getPopularMoviesData()
  }

  getPopularMoviesData = async () => {
    const API_KEY = '96b7d4a3d469e7b177a4e7408dd82a69'
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    const response = await fetch(apiUrl)
    const data = await response.json()
    // console.log(data)
    const updatedData = data.results.map(eachResult => ({
      adult: eachResult.adult,
      backdropPath: eachResult.backdrop_path,
      genreIds: eachResult.genre_ids,
      id: eachResult.id,
      originalLanguage: eachResult.original_language,
      originalTitle: eachResult.original_title,
      overview: eachResult.overview,
      popularity: eachResult.popularity,
      posterPath: eachResult.poster_path,
      releaseDate: eachResult.release_date,
      title: eachResult.title,
      video: eachResult.video,
      voteAverage: eachResult.vote_average,
      voteCount: eachResult.vote_count,
    }))
    originalArray = updatedData

    const totalPages = Math.ceil(updatedData.length / this.MOVIES_PER_PAGE) // number of pages in a component

    this.setState({
      moviesData: updatedData,
      pageDetails: {
        pageArray: updatedData.slice(0, this.MOVIES_PER_PAGE), // show the first 10 movies
        currentPage: 1,
        totalPages,
      },
      isLoading: false,
    })
  }

  toggleMenubar = () => {
    this.setState(prevState => ({
      isMenubarOpen: !prevState.isMenubarOpen,
    }))
  }

  toggleSearchbar = () => {
    this.setState(prevState => ({
      isSearchOpen: !prevState.isSearchOpen,
    }))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchBtn = () => {
    const {searchInput, pageDetails} = this.state
    const searchQuery = searchInput.toLowerCase()
    if (searchQuery === '') {
      // Reset to show the original movies with pagination starting from page 1
      this.setState({
        pageDetails: {
          ...pageDetails,
          pageArray: originalArray.slice(0, this.MOVIES_PER_PAGE),
          totalPages: Math.ceil(originalArray.length / this.MOVIES_PER_PAGE),
        },
      })
    } else {
      // Filter movies based on search input
      const getFilteredData = originalArray.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery),
      )
      const totalPages = Math.ceil(
        getFilteredData.length / this.MOVIES_PER_PAGE,
      )
      this.setState({
        pageDetails: {
          ...pageDetails,
          pageArray: getFilteredData.slice(0, this.MOVIES_PER_PAGE), // slice to show the first 10 filtered movies
          totalPages,
          currentPage: 1,
        },
      })
    }
  }

  goToPage = pageNum => {
    const {pageDetails, moviesData} = this.state
    const startIndex = (pageNum - 1) * this.MOVIES_PER_PAGE
    const endIndex = pageNum * this.MOVIES_PER_PAGE
    this.setState({
      pageDetails: {
        ...pageDetails,
        pageArray: moviesData.slice(startIndex, endIndex),
        currentPage: pageNum,
      },
    })
  }

  render() {
    const {
      isMenubarOpen,
      isSearchOpen,
      searchInput,
      isLoading,
      pageDetails,
    } = this.state

    return (
      <>
        <Header
          isMenubarOpen={isMenubarOpen}
          toggleMenubar={this.toggleMenubar}
          isSearchOpen={isSearchOpen}
          toggleSearchbar={this.toggleSearchbar}
          searchInput={searchInput}
          onChangeSearchInput={this.onChangeSearchInput}
          onClickSearchBtn={this.onClickSearchBtn}
        />
        <div className="popular-movies-container">
          {isLoading ? (
            <div className="loader-container">
              <Loader type="Oval" color="#ffffff" height={50} width={50} />
            </div>
          ) : (
            <>
              <h1 className="popular-movies-heading">Popular Movies</h1>
              <ul className="movies-list-container">
                {pageDetails.pageArray.length > 0 ? (
                  pageDetails.pageArray.map(eachMovie => (
                    <MovieCard key={eachMovie.id} movieDetails={eachMovie} />
                  ))
                ) : (
                  <p className="no-movies-found">No Movies Found</p>
                )}
              </ul>

              {/* Pagination Controls */}
              <div className="pagination-container">
                {Array.from({length: pageDetails.totalPages}, (_, index) => (
                  <button
                    type="button"
                    key={index + 1}
                    className={`page-button ${
                      pageDetails.currentPage === index + 1 ? 'page-active' : ''
                    }`}
                    onClick={() => this.goToPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </>
    )
  }
}

export default Home
