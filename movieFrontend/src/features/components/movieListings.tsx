import { Button } from "@/components/ui/button"
import { useGetMovies } from "../hooks/use-getMovies";
import { useParams} from "@tanstack/react-router";

export function MovieListings(){
    
    const {genreId} = useParams({strict : false})
    const {data = []} = useGetMovies(genreId);

    function onClick(movieName: string){
        console.log("CLICKED",movieName)
    }

    return (
        <div>
            <div className = "text-4xl flex justify-center mb-10">
                Please Select A Movie  
            </div>
            <div className="columns-4 justify-items-center">
            {data.map(item => (
                <div key = {item.id} >
                    <a href = {`https://image.tmdb.org/t/p/original/${item.poster_path}`} ></a>
                    <img className="w-[300px] transition-opacity duration-300 hover:opacity-20" src = {`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                    onClick={() => onClick(item.id)}></img>
                    </div>
                
            ))}
            </div>
        </div>
    )
}