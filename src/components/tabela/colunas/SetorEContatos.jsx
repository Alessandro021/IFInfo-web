import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {MoreHorizontal,  ArrowUpDown} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { VerContatos } from "../../modal/contatos/verContatos";
import { CriarSetorEContato } from "../../modal/contatos/criarSetorEContato";
import { useDeletarSetorEContato } from "@/src/queries/contatos/deletarSetorEContato";
import { AtualizarSetor } from "../../modal/contatos/atualizarSetor";

export const colunasSetorEContatos = [
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
		accessorKey: "setor",
		header: "setor",
		cell: ({ row }) => {
			return (
				<p className=" font-medium line-clamp-2">{row.getValue("setor")}</p>
			);
		},
	},
	{
		accessorKey: "contato",
		cell: ({ row }) => {
			return (
				<VerContatos contatos={row.getValue("contato")} />
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const setorEContatos = row.original;

			const [abrirAtualizar, setAbrirAtualizar] = useState(false);
			const [abrirCriar, setAbrirCriar] = useState(false);

			const atualizarSetor = () => {
				setAbrirAtualizar(true);
			};

			const criarSetorEContatos = () => {
				setAbrirCriar(true);
			};
			const { mutate } = useDeletarSetorEContato();

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
							<DropdownMenuItem onClick={() => criarSetorEContatos()}>Criar</DropdownMenuItem>
							<DropdownMenuItem onClick={() => mutate({ idSetor: Number(setorEContatos.id) })}>Deletar</DropdownMenuItem>
							<DropdownMenuItem onClick={() => atualizarSetor()}>Atualizar</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					{abrirAtualizar && (<AtualizarSetor open={abrirAtualizar} idSetor={setorEContatos?.id} onClose={() => setAbrirAtualizar(false)}/>)}
					{abrirCriar && ( <CriarSetorEContato open={abrirCriar} onClose={() => setAbrirCriar(false)}/>
					)}
				</>
			);
		},
	},
];