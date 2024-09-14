import {
    Menu
} from "lucide-react"

import { 
    Button
} from "@/components/ui/button"

import { 
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
  
export function Header() {
    return (
        <div className="w-full px-8 py-4 border-slate-800 border-b bg-slate-900 text-slate-300 flex justify-between">
            <Button variant="ghost" className="border border-slate-800" >
                <Menu />
            </Button>

            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger className="rounded-circle outline-none">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>MF</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}