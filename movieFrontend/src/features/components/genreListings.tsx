import { Button } from "@/components/ui/button"
import { useGetGenres } from "../hooks/use-getGenres";
import { useState,useEffect } from "react";
import { Link } from "@tanstack/react-router";

export function GenreListings(){

    const {data = []} = useGetGenres();
    // function onClick(genreId: number){
    //     console.log(genreId)
        
    // }
    //onClick={() => onClick(item.id)}
    return (
        <div>
            <div className = "text-4xl flex justify-center mb-10">
                Please Select A Genre  
            </div>
            <div className="columns-2 justify-items-center">
                {data.map((item) => (
                    <div key = {item.id} >
                        <Link to = {`/movie/$genreId`} params={{ genreId: item.id }} key = {item.id}>
                        {item.name}
                        </Link> 
                    </div>
                ))}
            </div>
        </div>
        
       
    )
}