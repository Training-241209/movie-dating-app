import { Link } from "@tanstack/react-router";
import { useGetMovies } from "../hooks/use-getMovies";
import { useSelectGenres } from "../hooks/use-SelectGenres";
import { MovieTitle } from "./movieTitle";

export function MovieListings({genreId,genreName}:{genreId: number,genreName:string}){
    
    const {data = []} = useGetMovies({genreId});
    const {mutate: selectGenres} = useSelectGenres()

    function onClick(genreId: number,movieId: number) {
      console.log("CLICKED", movieId);
      console.log("Genre", genreId);
      selectGenres({genreId,movieId})
  }

  return (
    <div>
      <MovieTitle genreName={genreName}/>
      <div>
      <div className="columns-5 justify-items-center ml-5 mr-5">
        {data.map((item: any) => (
          <div key={item.id} className="mb-5">
            <Link to="/chat" onClick={() => onClick(genreId, item.id)}>
              <img
                className="rounded-lg w-[250px] h-[400px] transition-opacity duration-300 hover:opacity-20"
                src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                alt={item.title || "Movie Poster"}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
