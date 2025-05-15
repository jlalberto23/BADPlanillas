import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  // getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
  Table as TableType,
  OnChangeFn
} from '@tanstack/react-table'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Column } from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from './button'
import { ReactNode, useEffect, useId, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Columns,
  Download,
  EyeOff,
  MoreVertical,
  Search
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './select'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Separator } from './separator'
import { ScrollArea } from './scroll-area'
import { Link, router } from '@inertiajs/react'
import { Label } from './label'
import { Pagination } from '@/types'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  children?: ReactNode
  canFilter?: boolean
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  children,
  canFilter = true,
  className
}: DataTableColumnHeaderProps<TData, TValue>) {
  const [filterValue, setFilterValue] = useState(
    (column?.getFilterValue() as string) ?? ''
  )
  const titleContent = children || column.id

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{titleContent}</div>
  }

  const applyFilter = () => {
    column?.setFilterValue(filterValue)
  }

  const highlighted = column.getIsFiltered() || column.getIsSorted()
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={highlighted ? 'secondary' : 'ghost'}
            size="sm"
            className="w-full flex justify-between -ml-3 h-8 data-[state=open]:bg-accent group"
          >
            <div className={highlighted ? 'font-bold' : ''}>{titleContent}</div>

            {column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 size-4" />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 size-4" />
            ) : (
              <MoreVertical className="ml-2 size-4 transition-opacity opacity-0 group-hover:opacity-100" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="grid gap-1 w-48 p-2">
          {canFilter && (
            <>
              <div className="flex">
                <Input
                  placeholder={`Filter ${column.id}...`}
                  value={filterValue}
                  onChange={(event) => setFilterValue(event.target.value)}
                  className="rounded-r-none focus-visible:ring-0"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      applyFilter()
                    }
                  }}
                />
                <Button
                  onClick={applyFilter}
                  size="icon"
                  className="rounded-l-none"
                >
                  <Search className="size-4" />
                </Button>
              </div>
              <Separator />
            </>
          )}
          <Button
            size="sm"
            variant={column.getIsSorted() === false ? 'secondary' : 'ghost'}
            className="flex justify-start"
            onClick={() => column.clearSorting()}
          >
            <ArrowUpDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Default
          </Button>
          <Button
            size="sm"
            variant={column.getIsSorted() === 'asc' ? 'secondary' : 'ghost'}
            className="flex justify-start"
            onClick={() => column.toggleSorting(false)}
          >
            <ArrowUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </Button>
          <Button
            size="sm"
            variant={column.getIsSorted() === 'desc' ? 'secondary' : 'ghost'}
            className="flex justify-start"
            onClick={() => column.toggleSorting(true)}
          >
            <ArrowDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </Button>
          <Separator />
          <Button
            size="sm"
            variant="ghost"
            className="flex justify-start"
            onClick={() => column.toggleVisibility(false)}
          >
            <EyeOff className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export interface DataTableSearchOption {
  value: string | number
  label?: string | number
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pagination: Pagination
  noDataContent?: ReactNode
  calcTotals?: ReactNode
  headerContent?: ReactNode
  canExport?: boolean
  exportedFileName?: string
  initialColumnVisibility?: VisibilityState
  columnVisibilityValue?: VisibilityState
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>
  hideViewOptions?: boolean
  searchPlaceholder?: string
  searchOptions?: DataTableSearchOption[]
}

export function DataTablePaginated<TData, TValue>({
  columns,
  noDataContent,
  calcTotals = true,
  headerContent,
  data,
  canExport = true,
  exportedFileName,
  initialColumnVisibility = {},
  columnVisibilityValue,
  pagination,
  hideViewOptions,
  searchPlaceholder,
  searchOptions,
  onColumnVisibilityChange
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialColumnVisibility
  )

  const resetColumnVisibility = () => {
    if (onColumnVisibilityChange)
      onColumnVisibilityChange(initialColumnVisibility)
    else setColumnVisibility(initialColumnVisibility)
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: onColumnVisibilityChange || setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility: columnVisibilityValue || columnVisibility
    }
  })

  return (
    <div className="p-1 flex flex-col grow w-full overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 pb-4">
        <DataTableSearch
          pagination={pagination}
          searchPlaceholder={searchPlaceholder}
          searchOptions={searchOptions}
        />
        {headerContent}
        {canExport && (
          <DataTableExport table={table} exportedFileName={exportedFileName} />
        )}
        {!hideViewOptions && (
          <DataTableViewOptions
            table={table}
            resetColumnVisibility={resetColumnVisibility}
          />
        )}
      </div>

      <div className="flex grow rounded-md border bg-card w-full h-44">
        <Table className="grow w-full">
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-1.5">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="p-0 text-center">
                  {noDataContent || <div className="p-8">Sin datos.</div>}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableHeader className="sticky top-0 bg-card rounded-t-md">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className=''>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='first:rounded-tl-md last:rounded-tr-md'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          {calcTotals && table.getRowModel().rows?.length ? (
            <DataTableTotal table={table} />
          ) : null}
        </Table>
      </div>
      <div className="h-2"></div>
      <DataTablePagination pagination={pagination} />
    </div>
  )
}

interface DataTableSearchProps {
  pagination: Pagination
  searchPlaceholder?: string
  searchOptions?: DataTableSearchOption[]
}

const getSearchParamValue = () => {
  const params = new URLSearchParams(window.location.search)
  return params.get('search') || ''
}

function DataTableSearch({
  pagination,
  searchPlaceholder,
  searchOptions
}: DataTableSearchProps) {
  const [searchValue, setSearchValue] = useState(getSearchParamValue())
  const { path, per_page } = pagination
  const applyFilter = () => {
    router.visit(`${path}?per_page=${per_page}&search=${searchValue}`)
  }
  const id = useId()

  return (
    <div className="flex flex-grow mr-2">
      <Input
        placeholder={searchPlaceholder || 'Buscar ...'}
        defaultValue={searchValue}
        onChange={({ target }) => setSearchValue(target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            applyFilter()
          }
        }}
        className="max-w-sm h-9 rounded-r-none focus-visible:ring-0"
        list={`search-${id}`}
      />
      <datalist id={`search-${id}`}>
        {searchOptions?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </datalist>
      <Button
        onClick={applyFilter}
        size="icon"
        variant={searchValue ? 'default' : 'outline'}
        className="rounded-l-none h-9"
      >
        <Search className="size-4" />
      </Button>
    </div>
  )
}

interface DataTableExportProps<TData> {
  table: TableType<TData>
  exportedFileName?: string
}

export function DataTableExport<TData>({
  table,
  exportedFileName
}: DataTableExportProps<TData>) {
  const [isLoading, setIsLoading] = useState(false)

  const handleExport = async () => {
    setIsLoading(true)
    try {
      // Crear un nuevo workbook y una hoja
      const ExcelJS = await import('exceljs')
      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet(exportedFileName || 'Export')

      // Obtener los nombres de las columnas
      const columnNames = table
        .getAllColumns()
        .filter((column) => column.getIsVisible())
        .map((column) => {
          const meta = column.columnDef.meta as { title: string }
          return typeof meta?.title === 'string' ? meta?.title : column.id
        })

      // Agregar los nombres de las columnas como la primera fila
      const headerRow = worksheet.addRow(columnNames)

      // Estilizar la fila de encabezados
      headerRow.eachCell((cell) => {
        cell.font = { bold: true }
        cell.alignment = { vertical: 'middle', horizontal: 'center' }
      })
      worksheet.views = [{ state: 'frozen', ySplit: 1 }] // Fijar la primera fila

      // Obtener los datos de las filas filtradas y agregarlos al worksheet
      const data = table
        .getFilteredRowModel()
        .rows.map((row) =>
          row.getVisibleCells().map((cell) => String(cell.getValue()))
        )
      data.forEach((row) => worksheet.addRow(row))

      // Configurar estilos opcionales (opcional)
      worksheet.columns.forEach((column) => {
        column.width = 20 // Ajustar el ancho de las columnas
      })

      // Descargar el archivo
      const buffer = await workbook.xlsx.writeBuffer()
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `${
        exportedFileName || 'export'
      } - ${new Date().toLocaleString()}.xlsx`
      link.click()
    } catch (error) {
      console.error('Error al exportar:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="ml-auto"
      onClick={handleExport}
      disabled={isLoading}
    >
      {isLoading ? (
        'Exportando...'
      ) : (
        <>
          <Download className="size-4" />
          <span className="hidden md:inline ml-2">Exportar</span>
        </>
      )}
    </Button>
  )
}

interface DataTablePaginationProps {
  pagination: Pagination
}

export function DataTablePagination({ pagination }: DataTablePaginationProps) {
  const searchValue = useRef(getSearchParamValue())
  useEffect(() => {}, [pagination.per_page, searchValue])
  const options = [10, 30, 50, 100, 500]

  if (!options.includes(pagination.per_page)) {
    options.push(pagination.per_page)
    options.sort((a, b) => a - b)
  }

  const getClassNameByLink = (link: Pagination['links'][0]) => {
    const page = Number(link.label)

    if (!page || page == pagination.current_page || page == 1 || page == pagination.last_page) return
		if(page > 5 && page < pagination.last_page - 5) return 'hidden @4xl/pagination:inline'
    if (page > 3 && page < pagination.last_page - 4) return 'hidden @2xl/pagination:inline'
    if (page > 2 && page < pagination.last_page - 1) return 'hidden @xl/pagination:inline'
    if (page > 1 && page < pagination.last_page) return 'hidden @lg/pagination:inline'
    return 'hidden'
  }

  return (
    <div className="flex items-center justify-between overflow-x-hidden @container/pagination">
      <div className="flex items-center justify-between w-full gap-y-2 gap-x-2 lg:gap-8 overflow-x-auto">
        <div className="flex items-center gap-2">
          {pagination.links.map((link, index) =>
            link.url ? (
              <Link
                key={index}
                href={`${link.url}&per_page=${pagination.per_page}&search=${searchValue.current}`}
                className={getClassNameByLink(link)}
              >
                <Button
                  variant={link.active ? 'default' : 'outline'}
                  className="h-8 w-8 p-0 flex"
                >
                  <span className="sr-only">{link.label}</span>
                  {link.label === '&laquo; Previous' ? (
                    <ChevronLeft className="h-4 w-4" />
                  ) : link.label === 'Next &raquo;' ? (
                    <ChevronRight className="h-4 w-4" />
                  ) : (
                    link.label
                  )}
                </Button>
              </Link>
            ) : link.label !== '...' ? (
              <Button
                key={index}
                variant={link.active ? 'default' : 'outline'}
                className="h-8 w-8 p-0 flex"
                disabled
              >
                <span className="sr-only">{link.label}</span>
                {link.label === '&laquo; Previous' ? (
                  <ChevronLeft className="h-4 w-4" />
                ) : link.label === 'Next &raquo;' ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  link.label
                )}
              </Button>
            ) : (
              <PopoverPageSelector
                key={index}
                pagination={pagination}
                link={link}
              />
            )
          )}
        </div>
        <div className="flex items-center justify-center text-sm font-medium">
          <div className="flex items-center gap-x-2">
            <p className="hidden sm:inline text-sm font-medium">Mostrar</p>
            <Select
              value={`${pagination.per_page}`}
              onValueChange={(value) =>
                router.visit(
                  pagination.path +
                    `?per_page=${value}&search=${searchValue.current}`
                )
              }
            >
              <SelectTrigger className="h-8 w-[80px]">
                <SelectValue placeholder={pagination.per_page} />
              </SelectTrigger>
              <SelectContent side="top">
                {options.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <span className="ml-1 text-center">de {pagination.total}</span>
        </div>
      </div>
    </div>
  )
}

interface PopoverPageSelectorProps {
  pagination: Pagination
  link: Pagination['links'][0]
}

function PopoverPageSelector({ pagination, link }: PopoverPageSelectorProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const input = event.currentTarget.querySelector('input')
    const page = Number(input?.value)
    if (page) {
      router.visit(pagination.path + `?page=${page}`)
    }
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={link.active ? 'default' : 'outline'}
          className="h-8 w-8 p-0 flex"
        >
          ...
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Página</h4>
            <p className="text-sm text-muted-foreground">
              Escribe el número de página al que deseas ir.
            </p>
          </div>
          <form className="grid gap-2" onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="pag">Pág</Label>
              <div className="flex col-span-2 gap-2">
                <Input
                  id="pag"
                  type="number"
                  min={1}
                  max={pagination.last_page}
                  className="h-8"
                  required
                />
                <Button type="submit" className="h-8 w-16 p-0 flex">
                  Ir
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  )
}

interface DataTableViewOptionsProps<TData> {
  table: TableType<TData>
  resetColumnVisibility: () => void
}

export function DataTableViewOptions<TData>({
  table,
  resetColumnVisibility
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto">
          <Columns className="h-4 w-4" />
          <span className="hidden md:inline ml-2">Columnas</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Visibilidad</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[200px]">
          <DropdownMenuCheckboxItem onClick={resetColumnVisibility}>
            Por defecto
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={table
              .getAllColumns()
              .every((column) => column.getIsVisible())}
            onCheckedChange={() => {
              table
                .getAllColumns()
                .forEach((column) => column.toggleVisibility(true))
            }}
          >
            Todas
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== 'undefined' && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface DataTableTotalProps<TData> {
  table: TableType<TData>
}

export function DataTableTotal<TData>({ table }: DataTableTotalProps<TData>) {
  const totalRow = useMemo(() => {
    const totals: Record<string, number> = {}
    table.getRowModel().rows.forEach((row) => {
      row.getVisibleCells().forEach((cell) => {
        if (typeof cell.getValue() === 'number') {
          totals[cell.column.id] =
            (totals[cell.column.id] || 0) + Number(cell.getValue())
        }
      })
    })
    return totals
  }, [
    table.getRowModel().rows.length,
    table.getState().pagination.pageIndex,
    table.getState().pagination.pageSize,
    table.getState().sorting,
    table.getIsSomeColumnsVisible()
  ])
  return (
    <TableFooter className="sticky bottom-0 bg-muted">
      <TableRow>
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            if (column.getIsVisible() === false) return null
            return (
              <TableCell key={column.id}>
                {typeof totalRow[column.id] === 'number'
                  ? totalRow[column.id]
                  : null}
              </TableCell>
            )
          })}
      </TableRow>
    </TableFooter>
  )
}