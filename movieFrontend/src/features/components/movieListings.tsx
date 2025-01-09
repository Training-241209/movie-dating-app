import { Button } from "@/components/ui/button"
import { useGetMovies } from "../hooks/use-getMovies";
import { useParams} from "@tanstack/react-router";

export function MovieListings({genreId,genreName}){
    
    const {data = []} = useGetMovies(genreId);

    function onClick(movieName: string){
        console.log("CLICKED",movieName)
        console.log("Genre",genreId)
    }
    return (
        <div>
            <div className = "text-4xl flex justify-center mb-10">
                Please Select A {genreName} Movie  
            </div>
            <div className="columns-5 justify-items-center ml-5 mr-5">
            {data.map(item => (
                <div key = {item.id} className="mb-5">
                    <a href = {`https://image.tmdb.org/t/p/original/${item.poster_path}`} ></a>
                    <img className="rounded-lg w-[250px] h-[400px] transition-opacity duration-300 hover:opacity-20" src = {`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                    onClick={() => onClick(item.id)}></img>
                    </div>
                
            ))}
            </div>
        </div>
    )
}