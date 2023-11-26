import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {MoreHorizontal,  ArrowUpDown} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { AtualizarHorario } from "../../modal/horario/atualizarHorario";
import { CriarHorario } from "../../modal/horario/criarHorario";
import { useDeletarHorario } from "@/src/queries/horarios/deletarHorario";

const url = import.meta.env.VITE_API_URL+"/uploads/horarios/";

export const colunasHorarios = [
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
		accessorKey: "tipo",
		header: ({ column }) => {
			return (
				<Button className="p-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					tipo
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<p className=" font-medium line-clamp-2">{row.getValue("tipo")}</p>
			);
		},
	},
	{
		accessorKey: "pdf",
		header: "horario",
		cell: ({ row }) => {
			return (
				<a
					href={`${url}${row.getValue("pdf")}`}
					target="_blank"
					className="font-medium line-clamp-2 max-w-[500px] hover:text-sky-600"
					rel="noreferrer"
				>
					{row.getValue("pdf")}
				</a>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const horario = row.original;
			// const deletarNoticia = useNoticia(state => state.deletarNoticia);

			const [abrirAtualizar, setAbrirAtualizar] = useState(false);
			const [abrirCriar, setAbrirCriar] = useState(false);

			const atualizarHorario = () => {
				setAbrirAtualizar(true);
			};

			const criarHorario = () => {
				setAbrirCriar(true);
			};
			const { mutate } = useDeletarHorario();

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
							<DropdownMenuItem onClick={() => criarHorario()}>Criar</DropdownMenuItem>
							<DropdownMenuItem onClick={() => mutate({ id: Number(horario.id) })}>Deletar</DropdownMenuItem>
							<DropdownMenuItem onClick={() => atualizarHorario()}>Atualizar</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					{abrirAtualizar && (<AtualizarHorario open={abrirAtualizar} id={horario?.id} onClose={() => setAbrirAtualizar(false)}/>)}
					{abrirCriar && ( <CriarHorario open={abrirCriar} onClose={() => setAbrirCriar(false)}/>
					)}
				</>
			);
		},
	},
];