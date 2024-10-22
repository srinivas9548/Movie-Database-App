import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import MovieDetails from '../MovieDetails'
import MovieCast from '../MovieCast'

import './index.css'

class SingleMovieDetails extends Component {
  state = {
    singleMovieData: [],
    movieCastData: [],
    isMenubarOpen: false,
    isSearchOpen: false,
    isLoading: true,
  }

  componentDidMount() {
    this.getSingleMovieData()
    this.getMovieCastData()
  }

  getSingleMovieData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)
    const API_KEY = '96b7d4a3d469e7b177a4e7408dd82a69'
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    const response = await fetch(apiUrl)
    const data = await response.json()
    // console.log(data)
    const updatedData = {
      adult: data.adult,
      backdropPath: data.backdrop_path,
      belongsToCollection: data.belongs_to_collection
        ? {
            backdropPath: data.belongs_to_collection.backdrop_path,
            id: data.belongs_to_collection.id,
            name: data.belongs_to_collection.name,
            posterPath: data.belongs_to_collection.poster_path,
          }
        : null,
      budget: data.budget,
      genres: data.genres.map(genre => ({
        id: genre.id,
        name: genre.name,
      })),
      homepage: data.homepage,
      id: data.id,
      imdbId: data.imdb_id,
      originCountry: data.origin_country,
      originalLanguage: data.original_language,
      originalTitle: data.original_title,
      overview: data.overview,
      popularity: data.popularity,
      posterPath: data.poster_path,
      productionCompanies: data.production_companies.map(eachCompany => ({
        id: eachCompany.id,
        logoPath: eachCompany.logo_path,
        name: eachCompany.name,
        originCountry: eachCompany.origin_country,
      })),
      productionCountries: data.production_countries.map(eachCountry => ({
        iso31661: eachCountry.iso_3166_1,
        name: eachCountry.name,
      })),
      releaseDate: data.release_date,
      revenue: data.revenue,
      runtime: data.runtime,
      spokenLanguages: data.spoken_languages.map(language => ({
        englishName: language.english_name,
        iso6391: language.iso_639_1,
        name: language.name,
      })),
      status: data.status,
      tagline: data.tagline,
      title: data.title,
      video: data.video,
      voteAverage: data.vote_average,
      voteCount: data.vote_count,
    }

    this.setState({singleMovieData: updatedData, isLoading: false})
  }

  getMovieCastData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)
    const API_KEY = '96b7d4a3d469e7b177a4e7408dd82a69'
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
    const response = await fetch(apiUrl)
    const data = await response.json()
    // console.log(data)
    const formattedData = data.cast.map(eachCast => ({
      adult: eachCast.adult,
      castId: eachCast.cast_id,
      character: eachCast.character ? eachCast.character : 'NA',
      creditId: eachCast.credit_id,
      gender: eachCast.gender,
      id: eachCast.id,
      knownForDepartment: eachCast.known_for_department,
      name: eachCast.name,
      order: eachCast.order,
      originalName: eachCast.original_name,
      popularity: eachCast.popularity,
      profilePath: eachCast.profile_path,
    }))

    this.setState({movieCastData: formattedData, isLoading: false})
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

  render() {
    const {
      singleMovieData,
      movieCastData,
      isMenubarOpen,
      isSearchOpen,
      isLoading,
    } = this.state
    // console.log(movieCastData)

    return (
      <>
        <Header
          isMenubarOpen={isMenubarOpen}
          toggleMenubar={this.toggleMenubar}
          isSearchOpen={isSearchOpen}
          toggleSearchbar={this.toggleSearchbar}
        />
        <div className="single-movie-details-container">
          {isLoading ? (
            <div className="loader-container">
              <Loader
                type="BallTriangle"
                color="#ffffff"
                height={50}
                width={50}
              />
            </div>
          ) : (
            <>
              <MovieDetails singleMovieDetails={singleMovieData} />
              <h2 className="movie-cast-heading">Cast</h2>
              <ul className="movie-cast-list-container">
                {movieCastData.map(cast => (
                  <MovieCast key={cast.id} movieCastDetails={cast} />
                ))}
              </ul>
            </>
          )}
        </div>
      </>
    )
  }
}

export default SingleMovieDetails
