import { useGetGenres } from "../hooks/use-getGenres";
import { Link } from "@tanstack/react-router";
import { useGetMovies } from "../hooks/use-getMovies";

export function GenreListings(){
    const {data = []} = useGetGenres();
    function onClick(genreId: number,genreName: string){
        console.log(genreId)
        useGetMovies({genreId});
        <Link to = {`/movie/$genreId/$genreName`} params={{ genreId:genreId,genreName:genreName }} key = {genreId}></Link>
    }
    
    return (
        <div>
            <div className = "text-4xl flex justify-center mb-10">
                Please Select A Genre  
            </div>
            <div className="flex flex-wrap justify-center  gap-5 mb-5 mx-5">
                {data.map((item:any) => (  
                    <div key = {item.id} className="w-[300px] h-[400px] text-center flex flex-col items-center gap-5 overflow-hidden" >
                        <a href= {`/movie/${item.id}/${item.name}`}>
                        <img className = "w-full h-[350px] object-center rounded-lg duration-300 hover:opacity-20 aspect-auto"
                        src = {`src/assets/GenrePictures/${item.name}.jpg`} onClick={()=> onClick(item.id,item.name)}>
                        </img>
                        <p className="mb-2">{item.name}</p>
                        </a>
                    </div>
                ))}
            </div>
        </div>
        
       
    )
}