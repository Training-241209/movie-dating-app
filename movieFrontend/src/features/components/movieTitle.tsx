import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"

export function MovieTitle({genreName}:{genreName:string}){
    const vowels = ['a','e','i','o','u']
    if(vowels.includes(genreName[0].toLowerCase())){
        return(
            <div>
                <div className="text-4xl flex justify-center mb-10">
                    Please Select An {genreName} Movie
                </div> 
                <Link to = '/dashboard'>
                    <Button>Back</Button>
                </Link>
            </div>
            
    )}else{
        return(
            <div>
                <div className="text-4xl flex justify-center mb-10">
                    Please Select A {genreName} Movie
                </div> 
                <Link to = '/dashboard'>
                    <Button>Back</Button>
                </Link>
            </div>
            
         )  
    }
    
    
}