import { Button } from "@/components/ui/button"
import { useGetGenres } from "../hooks/use-getGenres";
import { useState,useEffect } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { useGetMovies } from "../hooks/use-getMovies";

export function GenreListings(){

    const {data = []} = useGetGenres();
    const router = useRouter();

    function handleGenreClick(genreId: number){
        router.navigate({ to: `/movie/${genreId}` });
        useGetMovies(genreId.toString());
    }

    return (
        <div>
            <div className = "text-4xl flex justify-center mb-10">
                Please Select A Genre  
            </div>
            <div className="columns-2 justify-items-center">
                {data.map((item) => (
                    <div key = {item.id} >
                        <Button onClick={() => handleGenreClick(item.id)}>
                        {item.name}
                        </Button> 
                    </div>
                ))}
            </div>
        </div>
        
       
    )
}