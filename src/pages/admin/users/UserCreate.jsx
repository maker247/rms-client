import { useQuery } from "@tanstack/react-query"

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

import { getRoles } from "@/lib/admin/roleFetcher"

import { storeUser } from "@/lib/admin/userFetcher"

import { useNavigate } from "react-router-dom"

const FormSchema = z.object({
    name: z
        .string({
            required_error: "Please enter name"
        }),
    password: z
        .string({
            required_error: "Please enter password"
        }),
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

export function UserCreate() {
    const navigate = useNavigate()

    const form = useForm({
        resolver: zodResolver(FormSchema),
    })

    const { data: roles, isPending, error } = useQuery({
        queryKey: ['roles'],
        queryFn: async () => {
            const res = await getRoles()

            return res.data
        }
    })

    async function onSubmit(data) {
        const res = await storeUser(data)

        if(! res.success) {
            toast({
                variant: "destructive",
                title: "user create",
                description: "something went wrong!",
            })

            return false
        }

        navigate("/admin/users")

        toast({
            title: "user create",
            description: "user has been created successfully."
        })
    }

    if(error) {
        toast({
            description: error.message
        })
    }

    if(isPending) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="p-8">
            <BreadCrumb />
            
            <Card>
                <CardHeader className='flex flex-row justify-between items-center'>
                    <CardTitle className="capitalize">Create</CardTitle>
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
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a verified role" />
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent>
                                                {roles.map((role, key) => 
                                                    <SelectItem 
                                                        value={role.uuid}
                                                        key={key}
                                                    >
                                                        {role.name}
                                                    </SelectItem>
                                                )}
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