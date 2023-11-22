import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {MoreHorizontal,  ArrowUpDown} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { CriarCursoTecnico } from "../../modal/cursosTecnicos/criarCursoTecnico";
import { useDeletarCursoTecnico } from "@/src/queries/cursosTecnicos/deletarCursoTecnico";
import { AtualizarCursoTecnico } from "../../modal/cursosTecnicos/atualizarCursoTecnico";
import { CriarCursoSuperior } from "../../modal/cursosSuperiores/criarCursoSuperior";
import { useDeletarCursoSuperior } from "@/src/queries/cursosSuperiores/deletarCursoSuperior";
import { AtualizarCursoSuperior } from "../../modal/cursosSuperiores/atualizarCursoSuperior";

export const colunasCursosSuperiores = [
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
		accessorKey: "link",
		header: "link",
		cell: ({ row }) => {
			return <a href={row.getValue("link")} target="_blank" className="font-medium line-clamp-2 max-w-[500px] hover:text-sky-600" rel="noreferrer">{row.getValue("link")}</a>;
		},
	},
		
	{
		id: "actions",
		cell: ({ row }) => {
			const cursoSuperior = row.original;

			const [abrirAtualizar, setAbrirAtualizar] = useState(false);
			const [abrirCriar, setAbrirCriar] = useState(false);

			const atualizarCursoSuperior = () => {
				setAbrirAtualizar(true);
			};

			const criarCursoSuperior = () => {
				setAbrirCriar(true);
			};
			const { mutate } = useDeletarCursoSuperior();

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
							<DropdownMenuItem onClick={() => criarCursoSuperior()}>Criar</DropdownMenuItem>
							<DropdownMenuItem onClick={() => mutate({ id: Number(cursoSuperior.id) })}>Deletar</DropdownMenuItem>
							<DropdownMenuItem onClick={() => atualizarCursoSuperior()}>Atualizar</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					{abrirAtualizar && (<AtualizarCursoSuperior open={abrirAtualizar} id={cursoSuperior?.id} onClose={() => setAbrirAtualizar(false)}/>)}
					{abrirCriar && ( <CriarCursoSuperior open={abrirCriar} onClose={() => setAbrirCriar(false)}/>)}
				</>
			);
		},
	},
];