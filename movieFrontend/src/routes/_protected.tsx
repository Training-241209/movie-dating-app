import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='bg-slate-800'>
        <Outlet/> 
    </div>
 
)
}
