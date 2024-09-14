import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import {calculate} from "@/lib/pagination"

export function CustomPagination({table, pagination, setPaginationIndex, current}) {
    const pageRanges = calculate(current, table.getPageCount())

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                <PaginationPrevious
                    className={`cursor-pointer ${!table.getCanPreviousPage() ? 'cursor-not-allowed' : ''}`}
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                />
                </PaginationItem>

                {pageRanges.map((page, key) => {
                    if(typeof(page) === "number") {
                        return (
                            <PaginationItem 
                                key={key}                                 
                            >
                                <PaginationLink
                                    onClick={() => setPaginationIndex(page - 1)}
                                    isActive={Number(page - 1) === Number(current)}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>         
                        )
                    }

                    if(typeof(page) === "string") {
                        return (
                            <PaginationItem key={key}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )
                    }
                })}

                <PaginationItem>

                    <PaginationNext 
                        className={`cursor-pointer ${!table.getCanNextPage() ? 'cursor-not-allowed' : ''} `}
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    />

                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}