import { useGetMovies } from "../hooks/use-getMovies";
import { MovieTitle } from "./movieTitle";

export function MovieListings({genreId,genreName}:{genreId: string,genreName:string}){
    
    const {data = []} = useGetMovies({genreId});

  function onClick(movieName: string) {
    console.log("CLICKED", movieName);
    console.log("Genre", genreId);
  }

  return (
    <div>
      <MovieTitle genreName={genreName}/>
      <div className="columns-5 justify-items-center ml-5 mr-5">
        {data.map((item:any) => (
          <div key={item.id} className="mb-5">
            <a
              href="/chat"
            >
              <img
                className="rounded-lg w-[250px] h-[400px] transition-opacity duration-300 hover:opacity-20"
                src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                onClick={() => onClick(item.id)}
                alt={item.title || "Movie Poster"}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
