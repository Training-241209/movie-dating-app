import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_protected/tsx/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/tsx/dashboard"!</div>
}
