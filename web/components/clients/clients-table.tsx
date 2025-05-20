"use client"

import { useState } from "react"
import Link from "next/link"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

type Client = {
  id: string
  name: string
  email: string
  phone: string
  status: "Active" | "Inactif" | "Prospect"
  projects: number
  lastContact: string
}


  // dummy data ( fetching from api)
const data: Client[] = [
  {
    id: "1",
    name: "Acme Inc",
    email: "contact@acme.com",
    phone: "+33 1 23 45 67 89",
    status: "Active",
    projects: 3,
    lastContact: "Il y a 2 jours",
  },
  {
    id: "2",
    name: "Globex Corporation",
    email: "info@globex.com",
    phone: "+33 1 23 45 67 90",
    status: "Active",
    projects: 2,
    lastContact: "Il y a 5 jours",
  },
  {
    id: "3",
    name: "Stark Industries",
    email: "contact@stark.com",
    phone: "+33 1 23 45 67 91",
    status: "Inactif",
    projects: 1,
    lastContact: "Il y a 2 semaines",
  },
  {
    id: "4",
    name: "Wayne Enterprises",
    email: "info@wayne.com",
    phone: "+33 1 23 45 67 92",
    status: "Active",
    projects: 4,
    lastContact: "Hier",
  },
  {
    id: "5",
    name: "Umbrella Corporation",
    email: "contact@umbrella.com",
    phone: "+33 1 23 45 67 93",
    status: "Prospect",
    projects: 0,
    lastContact: "Il y a 1 mois",
  },
  {
    id: "6",
    name: "Cyberdyne Systems",
    email: "info@cyberdyne.com",
    phone: "+33 1 23 45 67 94",
    status: "Prospect",
    projects: 0,
    lastContact: "Il y a 3 semaines",
  },
  {
    id: "7",
    name: "Oscorp Industries",
    email: "contact@oscorp.com",
    phone: "+33 1 23 45 67 95",
    status: "Active",
    projects: 2,
    lastContact: "Il y a 4 jours",
  },
  {
    id: "8",
    name: "LexCorp",
    email: "info@lexcorp.com",
    phone: "+33 1 23 45 67 96",
    status: "Inactif",
    projects: 1,
    lastContact: "Il y a 3 mois",
  },
  {
    id: "9",
    name: "Massive Dynamic",
    email: "contact@massive.com",
    phone: "+33 1 23 45 67 97",
    status: "Active",
    projects: 3,
    lastContact: "Il y a 1 semaine",
  },
  {
    id: "10",
    name: "Soylent Corp",
    email: "info@soylent.com",
    phone: "+33 1 23 45 67 98",
    status: "Prospect",
    projects: 0,
    lastContact: "Il y a 2 mois",
  },
]

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Nom",
    cell: ({ row }) => (
      <Link href={`/clients/${row.original.id}`} className="font-medium text-primary hover:underline">
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "phone",
    header: "Téléphone",
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "Active" ? "default" : status === "Inactif" ? "secondary" : "outline"}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "projects",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Projets
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const projects = Number.parseInt(row.getValue("projects"))
      return <div className="text-center font-medium">{projects}</div>
    },
  },
  {
    accessorKey: "lastContact",
    header: "Dernier contact",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const client = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Ouvrir le menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(client.id)}>
              Copier l&apos;ID client
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/clients/${client.id}`}>Voir les détails</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Modifier</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Supprimer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function ClientsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filtrer par nom..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colonnes <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id === "name"
                      ? "Nom"
                      : column.id === "email"
                        ? "Email"
                        : column.id === "phone"
                          ? "Téléphone"
                          : column.id === "status"
                            ? "Statut"
                            : column.id === "projects"
                              ? "Projets"
                              : column.id === "lastContact"
                                ? "Dernier contact"
                                : column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Aucun résultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} sur {table.getFilteredRowModel().rows.length} ligne(s)
          sélectionnée(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Précédent
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Suivant
          </Button>
        </div>
      </div>
    </div>
  )
}
