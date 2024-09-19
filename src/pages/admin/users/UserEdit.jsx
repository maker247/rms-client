import { 
    useEffect,
    useMemo
} from "react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { BreadCrumb } from "@/components/admin/BreadCrumb"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"

import { z } from "zod"
 
import { toast } from "@/components/hooks/use-toast"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useQueries} from "@tanstack/react-query"

import { useNavigate, useParams } from "react-router-dom"

import { getRoles } from "@/lib/admin/roleFetcher"

import { 
    getUser,
    updateUser
} from "@/lib/admin/userFetcher"

const FormSchema = z.object({
    name: z
        .string({
            required_error: "Please enter name"
        }),
    password: z
        .string({
            required_error: "Please enter password"
        })
        .min(6, { message: 'password must be 6 characters long' })
        .nullable(),
    email: z
        .string({
            required_error: "Please enter email",
        })
        .email(),
    roleUuid: z
        .string({
            required_error: "Please select role"
        })
})

export function UserEdit() {
    const {uuid} = useParams()

    const navigate = useNavigate()

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            email: '',
            roleUuid: ''
        }
    })

    const queries = useQueries({
        queries: [
            {
                queryKey: ['roles'],
                queryFn: async () => await getRoles()
            },
            {
                queryKey: ['user'],
                queryFn: async () => await getUser(uuid)
            }
        ]
    })

    const [rolesQuery, userQuery] = useMemo(() => queries ?? [], [queries])

    const isPending = rolesQuery.isPending || userQuery.isPending

    const error = rolesQuery.error || userQuery.error

    useEffect(() => {
        if (userQuery.data) {
            const {data} = userQuery.data

            form.reset({
                name: data.name,
                email: data.email,
                roleUuid: data.role.uuid
            });
        }
    }, [isPending])

    async function onSubmit(data) {
        const res = await updateUser(uuid, data)

        if(res.success) {
            navigate("/admin/users")

            toast({
                description: "user has been updated successfully.",
            })

            return
        } 


        toast({
          title: "update error",
          variant: "destructive",
          description: "something went wrong!",
        })
    }

    if(isPending) return (<h1>Loading...</h1>)

    if(error) {
        console.log(error)
        return (<h1>Error!</h1>)
    }

    return (
        <div className="p-8">
            <BreadCrumb />
            
            <Card>
                <CardHeader className='flex flex-row justify-between items-center'>
                    <CardTitle className="capitalize">Edit</CardTitle>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <Input
                                            onChange={field.onChange}
                                            defaultValue={field.value}
                                            type="text"
                                            placeholder="Name" 
                                        />
                                    
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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

                            <FormField
                                control={form.control}
                                name="roleUuid"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <Select 
                                            onValueChange={field.onChange}
                                            value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a verified role" />
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent>
                                                {rolesQuery.data?.map((role, key) => (
                                                    <SelectItem 
                                                        key={key}
                                                        value={role.uuid}
                                                    >
                                                        {role.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />

                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}