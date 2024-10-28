import './index.css'

const MovieDetails = props => {
  const {singleMovieDetails} = props
  const {
    id,
    posterPath,
    originalTitle,
    voteAverage,
    runtime,
    genres,
    releaseDate,
    overview,
    backdropPath,
  } = singleMovieDetails
  //   console.log(singleMovieDetails)

  const posterImageUrl = `https://image.tmdb.org/t/p/w500/${posterPath}`

  const backdropImgUrl = `https://image.tmdb.org/t/p/w500/${backdropPath}`

  return (
    <div className="movie-details-card-container">
      <div className="movie-details-card-content">
        <div className="movie-details-and-small-img">
          <img src={posterImageUrl} alt={id} className="movie-small-img" />
          <div className="movie-details-container">
            <h2 className="movie-card-title">{originalTitle}</h2>
            <p className="movie-card-rating">
              Rating: {voteAverage?.toFixed(1)}
            </p>
            <div className="movie-duration-and-genres-container">
              <div className="movie-duration-details">
                <p className="movie-duration">{runtime} min</p>
              </div>
              <ul className="movie-genres-details">
                {genres?.map(genre => (
                  <li key={genre.id} className="genre-item">
                    {genre.name},
                  </li>
                ))}
              </ul>
            </div>
            <p className="movie-release-date">Release Date: {releaseDate}</p>
          </div>
        </div>
        <h2 className="movie-overview-heading">Overview</h2>
        <p className="movie-overview-description">{overview}</p>
      </div>
      <img src={backdropImgUrl} alt={id} className="backdrop-image" />
    </div>
  )
}

export default MovieDetails
