import { GenderCard } from '@/features/components/genderCard'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useAuth } from '@/features/hooks/use-auth';
import { useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';
export const Route = createLazyFileRoute('/_protected/genderSelection')({
  component: RouteComponent,
})

function RouteComponent() {

  return(
    <div>
        <GenderCard/>
    </div>
    
    )
}
