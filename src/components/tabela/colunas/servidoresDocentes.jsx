import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {MoreHorizontal,  ArrowUpDown} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { CriarServidorDocente } from "../../modal/servidoresDocentes/criarServidorDocente";
import { useDeletarServidorDocente } from "@/src/queries/servidoresDocentes/deletarServidorDocente";
import { AtualizarServidorDocente } from "../../modal/servidoresDocentes/atualizarServidorDocente";

export const colunasServidoresDocentes = [
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
				<p className=" font-medium line-clamp-2  max-w-[200px]">{row.getValue("nome")}</p>
			);
		},
	},
	{
		accessorKey: "area",
		header: "area",
		cell: ({ row }) => {
			return (
				<p className=" font-medium line-clamp-2  max-w-[200px]">{row.getValue("area")}</p>
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
		accessorKey: "curriculo",
		header: "curriculo",
		cell: ({ row }) => {
			return <a href={row.getValue("curriculo")} target="_blank" className="font-medium line-clamp-2 max-w-[300px] hover:text-sky-600" rel="noreferrer">{row.getValue("curriculo")}</a>;
		},
	},
		
	{
		id: "actions",
		cell: ({ row }) => {
			const docente = row.original;

			const [abrirAtualizar, setAbrirAtualizar] = useState(false);
			const [abrirCriar, setAbrirCriar] = useState(false);

			const atualizarServidorDocente = () => {
				setAbrirAtualizar(true);
			};

			const criarServidorDocente = () => {
				setAbrirCriar(true);
			};
			const { mutate } = useDeletarServidorDocente();

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
							<DropdownMenuItem onClick={() => criarServidorDocente()}>Criar</DropdownMenuItem>
							<DropdownMenuItem onClick={() => mutate({ id: Number(docente.id) })}>Deletar</DropdownMenuItem>
							<DropdownMenuItem onClick={() => atualizarServidorDocente()}>Atualizar</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					{abrirAtualizar && (<AtualizarServidorDocente open={abrirAtualizar} id={docente?.id} onClose={() => setAbrirAtualizar(false)}/>)}
					{abrirCriar && ( <CriarServidorDocente open={abrirCriar} onClose={() => setAbrirCriar(false)}/>)}
				</>
			);
		},
	},
];