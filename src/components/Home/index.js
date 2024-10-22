import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import MovieCard from '../MovieCard'

import './index.css'

class Home extends Component {
  state = {
    moviesData: [],
    // filteredMoviesData: [],
    isMenubarOpen: false,
    isSearchOpen: false,
    searchInput: '',
    isLoading: true,
  }

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

    this.setState({moviesData: updatedData, isLoading: false})
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

  getFilteredMovies = () => {
    const {moviesData, searchInput} = this.state
    const filteredMovies = moviesData.filter(eachMovie =>
      eachMovie.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return filteredMovies
  }

  onClickSearchBtn = () => {
    this.getFilteredMovies()
  }

  render() {
    const {isMenubarOpen, isSearchOpen, searchInput, isLoading} = this.state
    const filteredMoviesData = this.getFilteredMovies()
    // console.log(moviesData)

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
                {filteredMoviesData.map(eachMovie => (
                  <MovieCard key={eachMovie.id} movieDetails={eachMovie} />
                ))}
              </ul>
            </>
          )}
        </div>
      </>
    )
  }
}

export default Home
