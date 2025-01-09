import { MovieListings } from '@/features/components/movieListings'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/movie/$genreId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>{<MovieListings />}</div>
}
