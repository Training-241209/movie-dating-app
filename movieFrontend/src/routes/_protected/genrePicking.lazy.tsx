import { createLazyFileRoute } from '@tanstack/react-router'
import { GenreListings } from '@/features/components/genreListings'
export const Route = createLazyFileRoute('/_protected/genrePicking')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>{<GenreListings />}</div>
}
