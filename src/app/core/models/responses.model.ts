import { Movie, MovieDate, Screening } from "./movie.model";

export interface MovieScreeningResponse {
 movie: Movie;
 dates: MovieDate[]
}