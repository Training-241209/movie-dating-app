import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_chat')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet/>
}