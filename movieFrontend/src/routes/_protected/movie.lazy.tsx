import { MovieListings } from '@/features/components/movieListings'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_protected/movie')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
          {<MovieListings/>}
          </div>
}
