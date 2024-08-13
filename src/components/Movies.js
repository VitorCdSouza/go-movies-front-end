import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Movies = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        let moviesList = [
            {
                id: 1,
                title: "Deadpool e Wolverine",
                release_date: "2024-08-01",
                runtime: 120,
                mpaa_rating: "Adult",
                description: "Description big"
            },
            {
                id: 2,
                title: "Borderlands",
                release_date: "2024-08-01",
                runtime: 120,
                mpaa_rating: "12+",
                description: "Worst movie"
            },
            {
                id: 3,
                title: "Borderlands",
                release_date: "2024-08-01",
                runtime: 120,
                mpaa_rating: "12+",
                description: "Worst movie"
            },
        ]
        setMovies(moviesList)
    }, [])

    return (
        <div>
            <h2 className="text-center">Movies</h2>
            <hr />
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Movie</th>
                        <th>Release Date</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((m) => (
                        <tr key={m.id}>
                            <td>
                                <Link to={`/movies/${m.id}`}>
                                    {m.title}
                                </Link>
                            </td>
                            <td>{m.release_date}</td>
                            <td>{m.mpaa_rating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Movies