import { Link, useLocation } from "react-router-dom"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function BreadCrumb() {
    const path = useLocation().pathname

    const routes = path.replace(/^\//, '').split('/')

    const urls = []

    routes.map((routeName, key) => {
        console.log(routeName)
        if(routeName === 'admin' && Number(key) === 0) {
            urls.push({
                name: 'dashboard',
                url: '/admin/dashboard'
            }) 
        } else if(Number((routes.length -1)) === key) {
            urls.push({
                name: routeName,
                url: ''
            })
        } else {
            const url = routes.slice(0, key+1).join('/')

            urls.push({
                name: routeName,
                url: '/'.url
            })
        }
    })

    return (
        <Breadcrumb className="mb-8 px-1">
            <BreadcrumbList>
                {urls.map((url, key) => {
                    console.log(url)
                    if((urls.length -1) !== key) {
                        return (
                            <div className="flex space-x-2 items-center" key={key}>
                                <BreadcrumbItem className="capitalize">
                                    <Link to={url.url}>{url.name}</Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                            </ div>
                        )
                    } else {
                        return (
                            <BreadcrumbItem key={key}>
                                <BreadcrumbPage className="capitalize">{url.name}</BreadcrumbPage>
                            </BreadcrumbItem>
                        )
                    }
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}