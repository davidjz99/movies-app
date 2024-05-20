import { useState } from "react"

export const MovieApp = () => {

    const url = 'https://api.themoviedb.org/3/search/movie'
    const apiKey = '80a91c1f71b96328cd21e130f19be2b6'

    const [movie, setMovie] = useState('')
    const [dataMovies, setDataMovie] = useState([])

    const handleMovieChange = (e: any) => {
        setMovie(e.target.value)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if(movie.length > 0) fetchMovie()
    }

    const fetchMovie = async () => {
        try {

            const response = await fetch(`${url}?query=${movie}&api_key=${apiKey}`)
            const data = await response.json()
            setDataMovie(data.results)

        } catch (error) {
            console.error('Ocurrio un error: ', error)
        }
    }

  return (
    <div className="container">
        <h1>Buscador de peliculas</h1>

        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Ingresa el nombre de la pelicula" value={movie} onChange={handleMovieChange}/>
            <button className="btn-buscar" type="submit">Buscar</button>
        </form>

        <div className="movie-list">
            {dataMovies.map((movie) => (
                <div key={movie.id} className="movie-card">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <h2>{movie.title}</h2>
                    <p>
                        <b>Descripcion: </b>
                        {movie.overview}
                    </p>
                </div>
            ))}
        </div>
        
    </div>
    
  )
}