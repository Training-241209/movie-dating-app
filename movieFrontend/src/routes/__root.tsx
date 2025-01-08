import { createRootRoute, Outlet } from '@tanstack/react-router'
import QueryProvider from '@/providers/query-provider'
import { Toaster } from '@/components/ui/toaster'

export const Route = createRootRoute({
  component: () => (
    <QueryProvider>
      <Outlet />
      <Toaster/>
    </QueryProvider>
  ),
})