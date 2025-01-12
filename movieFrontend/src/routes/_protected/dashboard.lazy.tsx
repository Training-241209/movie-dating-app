import { useAuth } from '@/features/hooks/use-auth';
import { createLazyFileRoute } from '@tanstack/react-router'
import { GenreListings } from '@/features/components/genreListings';
import { GenderCard } from '@/features/components/genderCard';
import { useEffect } from 'react';

export const Route = createLazyFileRoute('/_protected/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {


    const { data: auth, refetch } = useAuth();
    console.log("dashboard", auth);

    useEffect(() => {
        if (auth && (auth.gender != "" || auth.genderPreference != "")) {
          refetch(); // Trigger a refetch if the auth data is incomplete or changed
        }
      }, [auth, refetch]);


    if(auth){

        if(auth.gender == ""){
            return(
                <div>
                    <GenderCard/>
                </div>
            )
        }
        else{
            return(
                <div>
                    <GenreListings/>
                </div>
            )
        }
    }
}