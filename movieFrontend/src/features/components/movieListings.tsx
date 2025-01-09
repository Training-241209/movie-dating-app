import { Button } from "@/components/ui/button"
import { useGetMovies } from "../hooks/use-getMovies";
export function MovieListings(){
    const {data = []} = useGetMovies();
    
    return (
        <div>
            <div className = "text-4xl flex justify-center mb-10">
                Please Select A Movie  
            </div>
            <div className="columns-4 justify-items-center">
            {data.map(item => (
                <>
                <img className="w-[300px]" src = {`https://image.tmdb.org/t/p/original/${item.poster_path}`}></img>
                <div key = {item.id}>{item.title}</div>
                </>
                
            ))}
            </div>
        </div>
    )
}