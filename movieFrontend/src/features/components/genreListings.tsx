import { Button } from "@/components/ui/button"
import { useGetGenres } from "../hooks/use-getGenres";
import { useState,useEffect } from "react";

export function GenreListings(){

    const {data = []} = useGetGenres();

    return (
        <div>
            <div className = "text-4xl flex justify-center mb-10">
                Please Select A Genre  
            </div>
            <div className="columns-2 justify-items-center">
                {data.map((item) => (
                    <div key = {item.id}>{item.name}</div>
                ))}
            </div>
        </div>
        
       
    )
}