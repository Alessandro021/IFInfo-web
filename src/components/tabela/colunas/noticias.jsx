// import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CarrotIcon, MoreHorizontal} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const colunasNoticias = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
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
		accessorKey: "titulo",
		header: "titulo",
		cell: ({ row }) => {
			return <p className=" font-medium line-clamp-2">{row.getValue("conteudo")}</p>;
		},
	},
	{
		accessorKey: "conteudo",
		header: "conteudo",
		cell: ({ row }) => {
			return <p className=" font-medium line-clamp-2">{row.getValue("conteudo")}</p>;
		},
	},
	{
		accessorKey: "data",
		header: "data",
	},
	{
		accessorKey: "hora",
		header: "hora",
	},
	{
		accessorKey: "url_foto",
		header: "foto",
	},
	{
		id: "actions",
		cell: ({ row }) => { 
			const noticia = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Escolha</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Selecione</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => console.log(noticia.id)}>Deletar</DropdownMenuItem>
						<DropdownMenuItem onClick={() => console.log(noticia.id)}>Atualizar</DropdownMenuItem>
						<DropdownMenuItem onClick={() => console.log(noticia.id)}>Ver</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];