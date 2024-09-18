import { 
    Navigate,
    useNavigate
} from "react-router-dom"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"

import { z } from "zod"

import { useMutation } from "@tanstack/react-query"
 
import { toast } from "@/components/hooks/use-toast"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
    login
} from "../../lib/admin/authFetcher"

import {
    getToken
} from "@/lib/admin/utils"

import { useApp } from "@/ThemeApp"

const FormSchema = z.object({
    email: z
        .string({
            required_error: "Please enter email",
        })
        .email(),
    password: z
        .string({
            required_error: "Please enter password"
        })
        .min(5, { message: 'Must have at least 5 character' }),
})


export function Login() {
    const token = getToken()

    const {
        setAuth
    } = useApp()

    const navigate = useNavigate()

    const form = useForm({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data) {
        authenticate.mutate(data)
    }

    const authenticate = useMutation({
        mutationFn: async (data) => await login(data.email, data.password),
        onError: (error) => {
            console.log(error)

            toast({
                variant: "destructive",
                title: "login error",
                description: "unauthenticated!"
            })
        },
        onSuccess: ({data}) => {
            localStorage.setItem('token', data.token)

            console.log(data)

            setAuth(data)
                
            // navigate('/admin/dashboard')
        }
    })

    if(token) {
        return <Navigate to="/admin/dashboard" />
    }

    return (
        <div className="w-full flex justify-center items-center h-[100vh] bg-slate-950">
            <div className="w-1/3">
                <Card>
                    <CardHeader className='flex flex-row justify-between items-center'>
                        <CardTitle className="capitalize">Login</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <Form {...form}>
                            <form 
                                onSubmit={form.handleSubmit(onSubmit)} 
                            >
                                <div className="w-full space-y-6">
                                    <FormField 
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <Input 
                                                    onChange={field.onChange}
                                                    defaultValue={field.value}
                                                    type="email" 
                                                    placeholder="Email" 
                                                />
                                            
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField 
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <Input
                                                    onChange={field.onChange}
                                                    defaultValue={field.value}
                                                    type="password"
                                                    placeholder="Password" 
                                                />
                                            
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="mt-4">
                                    <Button className="w-full" type="submit">Login</Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}