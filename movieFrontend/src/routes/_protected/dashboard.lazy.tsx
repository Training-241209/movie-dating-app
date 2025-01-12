import { useAuth } from '@/features/hooks/use-auth';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router'
import { GenreListings } from '@/features/components/genreListings';
import { GenderCard } from '@/features/components/genderCard';
import { useEffect } from 'react';

export const Route = createLazyFileRoute('/_protected/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
    const router = useRouter();
    const { data: auth, refetch } = useAuth();
    console.log("dashboard", auth);
  
    useEffect(() => {
      if (auth && (auth.gender !== "" || auth.genderPreference !== "")) {
        refetch(); // Trigger a refetch if the auth data is incomplete or changed
      }
    }, [auth, refetch]);
  
    useEffect(() => {
      if (auth) {
        if (auth.gender !== "" && auth.genre !== "") {
          // Navigate to the chat route only when both are non-empty
          router.navigate({ to: "/chat" });
        }
      }
    }, [auth, router]);
  
    if (auth) {
      if (auth.gender === "") {
        return (
          <div>
            <GenderCard />
          </div>
        );
      } else if (auth.genre === "") {
        return (
          <div>
            <GenreListings />
          </div>
        );
      }
    }
  
    // Optionally, render a loading or fallback UI if `auth` is undefined or null
    return null;
  }
  