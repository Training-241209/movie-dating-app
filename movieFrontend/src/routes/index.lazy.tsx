import { useAuth } from '@/features/hooks/use-Auth';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {

  const {data: auth} = useAuth();
  const router = useRouter();


  useEffect(() => {
    console.log(auth);
    if (auth) {
      router.navigate({ to: "/genrePicking"});
    }
  }, [auth]);
  return null;
}