import { Link } from "react-router-dom"

import {
    ChefHat
} from "lucide-react"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function SideBar() {
    return (
        <div className="w-[260px] border-r h-auto border-slate-800 bg-slate-900 text-slate-300">
            <h1 className="text-lg h-10 px-4 py-10 border-b border-slate-800 flex items-center space-x-3 mb-3"><ChefHat className="mb-1" /> <span>My food</span> </h1>

            <Accordion type="single" collapsible>
                <div className="cursor-pointer hover:bg-slate-800 px-3">
                    <Link to="/admin/dashboard"><p className="py-3">Dashboard</p></Link>
                </div>

                <AccordionItem value="item-1" className="border-none">
                    <AccordionTrigger className="!no-underline h-12 hover:bg-slate-800 px-3">Authorization</AccordionTrigger>
                    <AccordionContent className="mt-1">
                        <div className="border rounded-md mx-1 cursor-pointer border-slate-800 p-3 hover:bg-slate-700">
                            <ul>
                                <Link to="/admin/users"><li className="capitilize">Users</li></Link>
                            </ul>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-none">
                    <AccordionTrigger className="!no-underline h-12 hover:bg-slate-800 px-3">Orders</AccordionTrigger>
                    <AccordionContent className="mt-1">
                        <div className="border mx-1 cursor-pointer border-slate-800 p-3 rounded-md hover:bg-slate-700">
                            <ul>
                                <li>Users</li>
                            </ul>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-none">
                    <AccordionTrigger className="!no-underline h-12 hover:bg-slate-800 px-3">Menus</AccordionTrigger>
                    <AccordionContent className="mt-1">
                        <div className="border rounded-b-md mx-1 cursor-pointer border-slate-800 rounded-md">
                            <ul>
                                <li className="p-2 hover:bg-slate-700 rounded-t-md">Drinks</li>
                                <li className="p-2 hover:bg-slate-700 rounded-b-md">Foods</li>
                            </ul>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border-none">
                    <AccordionTrigger className="!no-underline h-12 hover:bg-slate-800 px-3">Reservations</AccordionTrigger>
                    <AccordionContent className="mt-1">
                        <div className="border rounded-b-md mx-1 cursor-pointer border-slate-800 rounded-md">
                            <ul>
                                <li className="p-2 hover:bg-slate-700 rounded-t-md">Reservations</li>
                                <li className="p-2 hover:bg-slate-700 rounded-b-md">Tables</li>
                            </ul>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}