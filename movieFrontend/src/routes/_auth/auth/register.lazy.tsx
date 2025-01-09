import { createLazyFileRoute } from '@tanstack/react-router'
import { RegisterForm } from "@/components/shared/registerform"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Link } from "@tanstack/react-router"

export const Route = createLazyFileRoute('/_auth/auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
    <div className='min-h-screen flex justify-center items-center bg-slate-800'>
      <Card className="w-[500px] ">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Welcome!</CardTitle>
          <CardDescription>Please enter your credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm/>
        </CardContent>
        <CardFooter>
          <p>Have an account? </p>
          <Link to={"/auth/login"} className="underline font-bold text-blue-800 ml-2">Login</Link>
        </CardFooter>
      </Card>
    </div>
  )
}
