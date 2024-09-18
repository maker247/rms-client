import {
    useState,
    useMemo
} from "react"

import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Card,
    CardContent,  
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { BreadCrumb } from "@/components/admin/BreadCrumb"

import { DataTable } from "@/components/admin/DataTable"

import { useNavigate } from "react-router-dom"

import { useQuery } from "@tanstack/react-query"

import { getUsers } from "../../../lib/admin/userFetcher"

export function Index() {
    const navigate = useNavigate()

    const [sorting, setSorting] = useState([])

    const [columnFilters, setColumnFilters] = useState([])

    const [columnVisibility, setColumnVisibility] = useState({})

    const [rowSelection, setRowSelection] = useState({})

    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 10,
    })

    const columns = [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("role").name}</div>
        ),
      },
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
      },
      {
        accessorKey: "email",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Email
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const user = row.original
    
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigate(`/admin/users/${user.uuid}`)}
                >View</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate(`/admin/users/${user.uuid}`)}
                >Edit</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {}}
                >Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ]

    const { 
      data: serverData,
      error,
      isPending
    } = useQuery({
      queryKey: ['users'],
      queryFn: async () => {
        const {data} = await getUsers()

        return data
      },
    })

    const data = useMemo(() => serverData ?? [], [serverData])

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        rowCount: data.length,
        state: {
          sorting,
          columnFilters,
          columnVisibility,
          rowSelection,
          pagination
        },
    })

    isPending && (<h1>Loading...</h1>)

    error && (<h1>Error!</h1>)

    return data && (
        <div className="p-8">
            <BreadCrumb />
            
            <Card>
                <CardHeader className='flex flex-row justify-between items-center'>
                    <CardTitle className="capitalize">Users</CardTitle>
                    <Button
                        onClick={() => navigate("/admin/users/create")}
                    >Create</Button>
                </CardHeader>

                <CardContent>
                    <DataTable
                        table={table}
                        columns={columns}
                    />
                </CardContent>
            </Card>
        </div>
    )
}
