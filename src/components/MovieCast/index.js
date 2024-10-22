import './index.css'

const MovieCast = props => {
  const {movieCastDetails} = props
  const {id, profilePath, originalName, character} = movieCastDetails
  //   console.log(movieCastDetails)

  if (!profilePath) {
    return null
  }

  const profilePathUrl = `https://image.tmdb.org/t/p/w500/${profilePath}`

  return (
    <li className="movie-cast-list-item">
      <img src={profilePathUrl} alt={id} className="movie-cast-profile-img" />
      <p className="movie-cast-name">{originalName}</p>
      <p className="movie-cast-character-name">Character: {character}</p>
    </li>
  )
}

export default MovieCast
