import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {MoreHorizontal,  ArrowUpDown} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { CriarUsuario } from "../../modal/administrador/criarUsuario";
import { EditarUsuario } from "../../modal/administrador/editarUsuario";
import { useDeletarUsuario } from "@/src/queries/administrador/deletarUsuario";


export const colunasAdministrador = [
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
		header: "nome",
		cell: ({ row }) => {
			return (
				<p className=" font-medium line-clamp-2">{row.getValue("nome")}</p>
			);
		},
	},
	{
		accessorKey: "email",
		header: "email",
		cell: ({ row }) => {
			return (
				<p className=" font-medium line-clamp-2">{row.getValue("email")}</p>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const usurio = row.original;

			const [abrirAtualizar, setAbrirAtualizar] = useState(false);
			const [abrirCriar, setAbrirCriar] = useState(false);

			const atualizarUsuario = () => {
				setAbrirAtualizar(true);
			};

			const criarUsuario = () => {
				setAbrirCriar(true);
			};
			const { mutate } = useDeletarUsuario();

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
							<DropdownMenuItem onClick={() => criarUsuario()}>Criar</DropdownMenuItem>
							<DropdownMenuItem onClick={() => mutate({ id: usurio.id})}>Deletar</DropdownMenuItem>
							<DropdownMenuItem onClick={() => atualizarUsuario()}>Atualizar</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					{abrirAtualizar && (<EditarUsuario open={abrirAtualizar} id={usurio?.id} onClose={() => setAbrirAtualizar(false)}/>)}
					{abrirCriar && ( <CriarUsuario open={abrirCriar} onClose={() => setAbrirCriar(false)}/>
					)}
				</>
			);
		},
	},
];