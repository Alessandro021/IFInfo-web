import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {MoreHorizontal} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { AtualizarHorario } from "../../modal/horario/atualizarHorario";
import { CriarHorario } from "../../modal/horario/criarHorario";
import { useDeletarHorario } from "@/src/queries/horarios/deletarHorario";

const url = import.meta.env.VITE_API_URL+"/uploads/horarios/";

export const colunasHorarios = [
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
		header: "id",
	},
	{
		accessorKey: "nome",
		header: "nome",
		cell: ({ row }) => {
			return <p className=" font-medium line-clamp-2">{row.getValue("nome")}</p>;
		},
	},
	{
		accessorKey: "tipo",
		header: "tipo",
		cell: ({ row }) => {
			return <p className=" font-medium line-clamp-2">{row.getValue("tipo")}</p>;
		},
	},
	{
		accessorKey: "pdf",
		header: "horario",
		cell: ({ row }) => {
			return <a href={`${url}${row.getValue("pdf")}`} target="_blank" className="font-medium line-clamp-2 max-w-[500px] hover:text-sky-600" rel="noreferrer">{row.getValue("pdf")}</a>;
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
			const {mutate} = useDeletarHorario();

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
							<DropdownMenuItem onClick={() => criarHorario()}>criar</DropdownMenuItem>
							<DropdownMenuItem onClick={() => mutate({id: Number(horario.id)})}>Deletar</DropdownMenuItem>
							<DropdownMenuItem onClick={() => atualizarHorario()}>atualizar</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					{abrirAtualizar && <AtualizarHorario open={abrirAtualizar} id={horario?.id} onClose={() => setAbrirAtualizar(false)} />}
					{abrirCriar && <CriarHorario open={abrirCriar} onClose={() => setAbrirCriar(false)} />}
				</>
			);
		},
	},
];