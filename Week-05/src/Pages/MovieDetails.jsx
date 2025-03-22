import React from 'react';
import '../App.css';

const MovieDetails = ({ selected, close }) => {
    return (
        <div className="movie-details-container">
            <h3 className="movie-details-title">Movie Details</h3>

            <div className="container movie-card">
                <div className="row">
                    {/* Movie Poster Section */}
                    <div className="col-12 col-md-5 text-center">
                        <img src={selected.Poster} alt={selected.Title} className="movie-poster" />
                    </div>

                    {/* Movie Information Section */}
                    <div className="col-12 col-md-7 movie-info">
                        <h2 className="movie-title">{selected.Title}</h2>
                        <p className="movie-year">{selected.Year}</p>
                        <p className="movie-rating"><strong>Rating:</strong> {selected.imdbRating}</p>
                        <p className="movie-plot">{selected.Plot}</p>
                        <button onClick={close} className="movie-close-btn">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
