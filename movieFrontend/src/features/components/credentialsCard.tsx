import { useAuth } from "../hooks/use-Auth.ts";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input.tsx";
import { UsernameSchema,usernameSchema } from "../schemas/usernameCredentialSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema, PasswordSchema } from "../schemas/passwordCredentialsSchema.ts";
import { useUpdateUsername } from "../hooks/use-updateUsername.ts";
import { useUpdatePassword } from "../hooks/use-updatePassword.ts";
import { Link } from "@tanstack/react-router";
export function CredentialsCard(){
    const formUser = useForm<UsernameSchema>({
        resolver: zodResolver(usernameSchema),
        defaultValues: {
          username: "",
          newUsername: "",
        },
      });
    const formPassword = useForm<PasswordSchema>({
        resolver: zodResolver(passwordSchema),
        defaultValues:{
            password: "",
            newPassword: "",
            confirmNewPassword: "",
        }
    })
    const {data: auth } = useAuth()
    const {mutate: updateUsername} = useUpdateUsername()
    const {mutate: updatePassword} = useUpdatePassword()
    
    function submitUsername(values:UsernameSchema){
        // updateUsername(values.username)
        console.log("Updated Username: ",values.newUsername)
        formUser.reset()
    }

    function submitPassword(values:PasswordSchema){
        
        if(values.newPassword !== values.confirmNewPassword){
            formPassword.setError("confirmNewPassword", {
                message: "Passwords do not match.",
            });
            return;
        }
        if(values.password === values.newPassword){
            formPassword.setError("confirmNewPassword", {
                message: "Can not update to same password.",
            });
            return;
        }
        const password = values.newPassword
        console.log("Update Password: ",password)
        updatePassword({password})
        
        formPassword.reset()
    }
    function clearUsername(){
        formUser.reset()
    }
    function clearPassword(){
        formPassword.reset()
    }
    return(
        <div className="min-h-screen justify-c  enter items-center bg-slate-800">    
            <Card className="max-w-lg mx-auto shadow-md">
                <CardHeader>
                    <CardTitle>Update Credentials</CardTitle>
                    <Link to = '/dashboard'>
                <Button>Back</Button>
            </Link>
                </CardHeader>
                    <Form {...formUser}>
                    <CardTitle>Update Username</CardTitle>
                    <CardContent>
                    <form onSubmit={formUser.handleSubmit(submitUsername)}>
                    <FormField
                        control={formUser.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className = "w-full">
                                <FormControl>
                                    <Input type="username" placeholder="Username" {...field} />
                                </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField
                        control={formUser.control}
                        name="newUsername"
                        render={({ field }) => (
                            <FormItem className = "w-full">
                                <FormControl>
                                    <Input type="newUsername" placeholder="New Username" {...field} />
                                </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}/>
                        <div>
                            <Button type = 'reset' onClick={clearUsername}>Clear</Button>
                            <Button type = 'submit'>Submit</Button>
                        </div>
                        
                        </form>
                    </CardContent>
                </Form>
                
                <Form {...formPassword}>
                <CardTitle>Update Password</CardTitle>
                    <CardContent>
                        <form onSubmit={formPassword.handleSubmit(submitPassword)}>
                            <FormField
                            control={formPassword.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className = "w-full">
                                    <FormControl>
                                        <Input type="password" placeholder="Password" {...field} />
                                    </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}/>
                            <FormField
                            control={formPassword.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem className = "w-full">
                                    <FormControl>
                                        <Input type="password" placeholder="New Password" {...field} />
                                    </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}/>
                            <FormField
                            control={formPassword.control}
                            name="confirmNewPassword"
                            render={({ field }) => (
                                <FormItem className = "w-full">
                                    <FormControl>
                                        <Input type="password" placeholder="Confirm New Password" {...field} />
                                    </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}/>
                            <div>
                                <Button type = 'reset' onClick ={clearPassword}>Reset</Button>
                            <Button type = 'submit' >Submit</Button>
                            </div>
                            
                        </form>
                        </CardContent>
                </Form>            
                
            </Card>
        </div>
    )
}