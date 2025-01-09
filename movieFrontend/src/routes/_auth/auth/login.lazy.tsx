import { createLazyFileRoute } from '@tanstack/react-router'

import { LoginForm } from "@/components/shared/loginform"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Link } from "@tanstack/react-router"
import logo from "@/assets/cinematchLogo.png"

export const Route = createLazyFileRoute('/_auth/auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
    <div className='min-h-screen flex justify-center items-center bg-pink-200'>

      <img src={logo} className='w-[200px]' alt='logo' />

      <div className=''>
        <Card className="w-[500px]">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Welcome Back!</CardTitle>
              <CardDescription>Please enter your credentials</CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm/>
            </CardContent>
            <CardFooter>
              <p>Don't have an account? </p>
              <Link to={"/auth/register"} className="underline font-bold text-blue-800 ml-2">Register</Link>
            </CardFooter>
          </Card>
        </div>

      </div>
  )
}
