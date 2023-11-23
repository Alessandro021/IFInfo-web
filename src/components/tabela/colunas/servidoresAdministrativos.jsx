import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {MoreHorizontal,  ArrowUpDown} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { CriarServidorAdministrativo } from "../../modal/servidoresAdministrativos/criarServidorAdministrativo";
import { useDeletarServidorAdministrativo } from "@/src/queries/servidortesAdministrativos/deletarServidorAdministartivo";
import { AtualizarServidorAdministrativo } from "../../modal/servidoresAdministrativos/atualizarServidorAdministrativo";

export const colunasServidoresAdministrativos = [
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
		accessorKey: "id",
		header: ({ column }) => {
			return (
				<Button className="p-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					id
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "nome",
		header: ({ column }) => {
			return (
				<Button className="p-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					nome
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<p className=" font-medium line-clamp-2">{row.getValue("nome")}</p>
			);
		},
	},
	{
		accessorKey: "cargo",
		header: "cargo",
		cell: ({ row }) => {
			return (
				<p className=" font-medium line-clamp-2">{row.getValue("cargo")}</p>
			);
		},
	},		
	{
		id: "actions",
		cell: ({ row }) => {
			const administrativo = row.original;

			const [abrirAtualizar, setAbrirAtualizar] = useState(false);
			const [abrirCriar, setAbrirCriar] = useState(false);

			const atualizarServidorAdministrativo= () => {
				setAbrirAtualizar(true);
			};

			const criarServidorAdministartivo = () => {
				setAbrirCriar(true);
			};
			const { mutate } = useDeletarServidorAdministrativo();

			return (
				<>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Selecione</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => criarServidorAdministartivo()}>Criar</DropdownMenuItem>
							<DropdownMenuItem onClick={() => mutate({ id: Number(administrativo.id) })}>Deletar</DropdownMenuItem>
							<DropdownMenuItem onClick={() => atualizarServidorAdministrativo()}>Atualizar</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					{abrirAtualizar && (<AtualizarServidorAdministrativo open={abrirAtualizar} id={administrativo?.id} onClose={() => setAbrirAtualizar(false)}/>)}
					{abrirCriar && ( <CriarServidorAdministrativo open={abrirCriar} onClose={() => setAbrirCriar(false)}/>)}
				</>
			);
		},
	},
];