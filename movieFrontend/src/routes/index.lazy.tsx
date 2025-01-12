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
    console.log("index_auth", auth);
    if (localStorage.getItem("token") != "") {
      router.navigate({ to: "/genrePicking"});
    }
    else{
      router.navigate({ to: "/auth/login"});
    }
  }, []);

  return null;
}