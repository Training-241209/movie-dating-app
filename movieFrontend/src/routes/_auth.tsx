import { useAuth } from '@/features/hooks/use-Auth'
import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'
export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})
function RouteComponent() {
  const {data: auth} = useAuth();
  const router = useRouter();


  useEffect(() => {
    if (auth) {
      console.log("AUTH: ", auth)
      router.navigate({ to: "/genrePicking"});
    }
  }, [auth]);
  return <div>
    <Outlet/>
    </div>
}

