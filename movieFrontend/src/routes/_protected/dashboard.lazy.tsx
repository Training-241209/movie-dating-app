import { createLazyFileRoute } from '@tanstack/react-router'
import { MovieListings } from '@/features/components/movieListings'
import { GenreListings } from '@/features/components/genreListings'
export const Route = createLazyFileRoute('/_protected/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <div>
        {<GenreListings/>}
        </div>
    )
}
