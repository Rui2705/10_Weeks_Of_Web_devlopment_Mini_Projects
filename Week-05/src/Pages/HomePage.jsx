import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import MovieDetails from './MovieDetails';
import Result from './Result';
import Search from './Search';

function HomePage() {
    const [state, setState] = useState({
        search: "",
        results: [],
        selected: {}
    });

    useEffect(() => {
        // Set initial page title
        document.title = "Movie Searching Website";

        // Set favicon
        const favicon = document.querySelector("link[rel='icon']");
        if (favicon) {
            favicon.href = "./icon.png"; // Change to your custom favicon path
        }

        // Random movies list
        const randomMovies = ["Avengers", "Inception", "Batman", "Spider-Man", "Interstellar", "Joker", "The Matrix", "King Kong", "Gladiator", "Deadpool"];
        
        // Generate a truly random movie each time
        const randomMovie = randomMovies[Math.floor(Math.random() * randomMovies.length)];

        axios.get(`https://www.omdbapi.com/?apikey=b5382e81&type=movie&s=${randomMovie}`)
            .then(res => {
                if (res.data.Search) {
                    setState(prevState => ({
                        ...prevState,
                        results: res.data.Search
                    }));
                }
            })
            .catch(err => console.log(err));
    }, []); // Runs only once on page load

    const handleInput = (event) => {
        let search = event.target.value;
        setState(prevState => ({
            ...prevState,
            search: search
        }));
    };

    const openDetails = (id) => {
        axios.get(`https://www.omdbapi.com/?i=${id}&apikey=b5382e81`)
            .then(({ data }) => {
                setState(prevState => ({
                    ...prevState,
                    selected: data
                }));
            })
            .catch(err => console.log(err));
    };

    const SearchResult = (event) => {
        if (event.key === 'Enter') {
            axios.get(`https://www.omdbapi.com/?apikey=b5382e81&s=${state.search}`)
                .then(res => {
                    if (res.data.Search) {
                        setState(prevState => ({
                            ...prevState,
                            results: res.data.Search
                        }));
                    }
                })
                .catch(err => console.log(err));
        }
    };

    const close = () => {
        setState(prevState => ({
            ...prevState,
            selected: {}
        }));

        // Reset title and favicon when closing movie details
        document.title = "Movie Searching Website";
        const favicon = document.querySelector("link[rel='icon']");
        if (favicon) {
            favicon.href = "/favicon.ico";
        }
    };

    return (
        <div className="w-100 main-wrapper d-flex flex-column align-items-center min-vh-100">
            {state.selected.Title ? (
                <MovieDetails selected={state.selected} close={close} />
            ) : (
                <header className="w-100 text-center text-white mt-5">
                    <h2>Movie Searching Website</h2>
                    <Search handleInput={handleInput} SearchResult={SearchResult} />
                    <div className="container">
                        <div className="row">
                            {state.results && state.results.map((result, i) => (
                                <div className="col-12 col-sm-6 col-md-3 col-lg-3 my-2" key={i}>
                                    <Result result={result} openDetails={openDetails} />
                                </div>
                            ))}
                        </div>
                    </div>
                </header>
            )}
        </div>
    );
}

export default HomePage;
