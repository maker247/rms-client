import {
    useState
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

import { BreadCrumb } from "@/components/admin/BreadCrumb"

import { Button } from "@/components/ui/button"

import { DataTable } from "@/components/admin/DataTable"

import { useNavigate } from "react-router-dom"

const data = [
    {
      "id": 1,
      "amount": 316,
      "status": "success",
      "email": "ken99@yahoo.com"
    },
    {
      "id": 2,
      "amount": 242,
      "status": "success",
      "email": "Abe45@gmail.com"
    },
    {
      "id": 3,
      "amount": 837,
      "status": "processing",
      "email": "Monserrat44@gmail.com"
    },
    {
      "id": 4,
      "amount": 874,
      "status": "success",
      "email": "Silas22@gmail.com"
    },
    {
      "id": 5,
      "amount": 721,
      "status": "failed",
      "email": "carmella@hotmail.com"
    },
    {
      "id": 6,
      "amount": 316,
      "status": "success",
      "email": "ken99@yahoo.com"
    },
    {
      "id": 7,
      "amount": 242,
      "status": "success",
      "email": "Abe45@gmail.com"
    },
    {
      "id": 8,
      "amount": 837,
      "status": "processing",
      "email": "Monserrat44@gmail.com"
    },
    {
      "id": 9,
      "amount": 874,
      "status": "success",
      "email": "Silas22@gmail.com"
    },
    {
      "id": 10,
      "amount": 721,
      "status": "failed",
      "email": "carmella@hotmail.com"
    },
    {
      "id": 11,
      "amount": 316,
      "status": "success",
      "email": "ken99@yahoo.com"
    },
    {
      "id": 12,
      "amount": 242,
      "status": "success",
      "email": "Abe45@gmail.com"
    },
    {
      "id": 13,
      "amount": 837,
      "status": "processing",
      "email": "Monserrat44@gmail.com"
    },
    {
      "id": 14,
      "amount": 874,
      "status": "success",
      "email": "Silas22@gmail.com"
    },
    {
      "id": 15,
      "amount": 721,
      "status": "failed",
      "email": "carmella@hotmail.com"
    },
    {
      "id": 16,
      "amount": 316,
      "status": "success",
      "email": "ken99@yahoo.com"
    },
    {
      "id": 17,
      "amount": 242,
      "status": "success",
      "email": "Abe45@gmail.com"
    },
    {
      "id": 18,
      "amount": 837,
      "status": "processing",
      "email": "Monserrat44@gmail.com"
    },
    {
      "id": 19,
      "amount": 874,
      "status": "success",
      "email": "Silas22@gmail.com"
    },
    {
      "id": 20,
      "amount": 721,
      "status": "failed",
      "email": "carmella@hotmail.com"
    }
]  

export const columns = [
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
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
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
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

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
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

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

    return (
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
                    />
                </CardContent>
            </Card>
        </div>
    )
}
