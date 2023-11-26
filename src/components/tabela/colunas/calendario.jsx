import { Button } from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { AtualizarCalendario } from "../../modal/calendario/atualizarCalendario";
import { useDeletarCalendario } from "@/src/queries/calendario/deletarCalendario";
import { useState } from "react";
import { CriarCalendario } from "../../modal/calendario/criarCalendario";

const url = import.meta.env.VITE_API_URL+"/uploads/calendarios/";

export const colunasCalendario = [
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
		accessorKey: "pdf",
		header: "calendario",
		cell: ({ row }) => {
			return <a href={`${url}${row.getValue("pdf")}`} target="_blank" className="font-medium line-clamp-2 max-w-[500px] hover:text-sky-600" rel="noreferrer">{row.getValue("pdf")}</a>;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => { 
			const calendario = row.original;
			// const deletarNoticia = useNoticia(state => state.deletarNoticia);

			const [abrirAtualizar, setAbrirAtualizar] = useState(false);
			const [abrirCriar, setAbrirCriar] = useState(false);

			const atualizarCalendario = () => {
				setAbrirAtualizar(true);
			};

			const criarCalendario = () => {
				setAbrirCriar(true);
			};
			const {mutate} = useDeletarCalendario();

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
							<DropdownMenuItem onClick={() => criarCalendario()}>criar</DropdownMenuItem>
							<DropdownMenuItem onClick={() => mutate({id: Number(calendario.id)})}>Deletar</DropdownMenuItem>
							<DropdownMenuItem onClick={() => atualizarCalendario()}>atualizar</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					{abrirAtualizar && <AtualizarCalendario open={abrirAtualizar} id={calendario?.id} onClose={() => setAbrirAtualizar(false)} />}
					{abrirCriar && <CriarCalendario open={abrirCriar} onClose={() => setAbrirCriar(false)} />}
				</>
			);
		},
	},
];