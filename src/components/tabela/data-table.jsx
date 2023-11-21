import { flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export function DataTable({ columns , data, ComponenteCriarItem, criar, ...props}) {
	const [rowSelection, setRowSelection] = useState({});
	const [columnVisibility, setColumnVisibility] = useState({});
	const [sorting, setSorting] = useState([]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onRowSelectionChange: setRowSelection,
		onColumnVisibilityChange: setColumnVisibility,
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			rowSelection,
			columnVisibility,
			sorting,
		},
	});

	return (
		<div className="flex flex-col gap-4 p-8">
			<div className="flex">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="mr-auto">colunas</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						{table
							.getAllColumns()
							.filter(
								(column) => column.getCanHide()
							)
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
				{ComponenteCriarItem && <Button onClick={criar} >Criar</Button>}
				{ComponenteCriarItem &&  <ComponenteCriarItem  {...props}/>}
			</div>
	
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">Nenhum resultado.</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex justify-between">
				<div className="flex text-sm text-muted-foreground space-x-2 py-4">
					{/* {table.getFilteredSelectedRowModel().rows.map(item => console.log(item.original.id))} */}
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} linhas(s) selecionadas.
				</div>
				<div className="flex items-center justify-end gap-4">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
                    Anterior
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
                    Proximo
					</Button>
				</div>
			</div>
		</div>
	);
    
}

