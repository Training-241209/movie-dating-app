import { Button } from "@/components/ui/button"
import { useGetGenres } from "../hooks/use-getGenres"
import { useGetMovies } from "../hooks/use-getMovies";
export function MovieListings(){
    const {data} = useGetMovies();
    function onClick(){
        console.log(data)
    }
    return (
        <div className="flex justify-between items-center p-5 bg-gray-300">
            <Button onClick={onClick}></Button>
        </div>
    )
}