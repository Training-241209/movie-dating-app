import { Toaster } from '@/components/ui/sonner'
import QueryProvider from '@/providers/query-provider'
import { createRootRoute, Outlet} from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => {


    return (
      <QueryProvider>
      <div>
        <Outlet />
        <Toaster />
      </div>
      </QueryProvider>
    )
  },
})
