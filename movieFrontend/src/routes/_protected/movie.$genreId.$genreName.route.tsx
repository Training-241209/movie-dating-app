import { MovieListings } from '@/features/components/movieListings'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/movie/$genreId/$genreName')({
  component: RouteComponent,
})

function RouteComponent() {
  const { genreId, genreName } = Route.useParams()
  return <div>{<MovieListings genreId={genreId} genreName={genreName} />}</div>
}
