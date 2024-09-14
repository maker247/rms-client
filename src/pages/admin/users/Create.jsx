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
  FormDescription,
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
    roleId: z
        .string({
            required_error: "Please select role"
        })
})

export function Create() {

    const form = useForm({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data) {
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        })
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
                                name="roleId"
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
                                                <SelectItem value="1">role 1</SelectItem>
                                                <SelectItem value="2">role 2</SelectItem>
                                                <SelectItem value="3">role 3</SelectItem>
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