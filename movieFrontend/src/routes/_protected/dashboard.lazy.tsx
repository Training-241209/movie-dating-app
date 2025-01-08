import { createLazyFileRoute } from '@tanstack/react-router'
import { MovieListings } from '@/features/components/movieListings'
export const Route = createLazyFileRoute('/_protected/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <div>
        {<MovieListings/>}
        </div>
    )
}
