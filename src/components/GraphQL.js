import { useEffect, useState } from "react"
import Input from "./form/Input"
import { Link } from "react-router-dom"

const GraphQL = () => {
    // set up stateful vars
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [fullList, setFullList] = useState([])

    // perform search
    const performSearch = () => {
        const payload = `
        {
            search(titleContains: "${searchTerm}") {
                id
                title
                runtime
                release_date
                mpaa_rating
            }
        }`;

        const headers = new Headers();
        headers.append("Content-Type", "application/graphql");

        const requestOptions = {
            method: "POST",
            headers: headers,
            body: payload
        }

        fetch(`${process.env.REACT_APP_BACKEND}/graph`, requestOptions)
            .then((response) => response.json())
            .then((response) => {
                let theList = Object.values(response.data.search)
                setMovies(theList)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleChange = (event) => {
        event.preventDefault()

        let value = event.target.value
        setSearchTerm(value)

        if (value.length > 1) {
            performSearch()
        } else {
            setMovies(fullList)
        }
    }

    // useEffect
    useEffect(() => {
        const payload = `
        {
            list {
                id
                title
                runtime
                release_date
                mpaa_rating
            }
        }`;

        const headers = new Headers();
        headers.append("Content-Type", "application/graphql");

        const requestOptions = {
            method: "POST",
            headers: headers,
            body: payload
        }

        fetch(`${process.env.REACT_APP_BACKEND}/graph`, requestOptions)
            .then((response) => response.json())
            .then((response) => {
                let theList = Object.values(response.data.list)
                setMovies(theList)
                setFullList(theList)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    return (
        <div className="text-center">
            <h2>GraphQL</h2>
            <hr />

            <div className="text-start">
                <form onSubmit={handleChange}>
                    <Input
                    title={"Search"}
                    type={"search"}
                    name={"search"}
                    className={"form-control"}
                    value={searchTerm}
                    onChange={handleChange} />
                </form>

                {movies ? (
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
                                    <td>{new Date(m.release_date).toLocaleDateString()}</td>
                                    <td>{m.rating}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No movies yet</p>
                )}
            </div>
        </div>
    )
}

export default GraphQL