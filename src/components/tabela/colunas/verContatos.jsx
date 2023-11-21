import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {MoreHorizontal,  ArrowUpDown} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { CriarContato } from "../../modal/contatos/criarContato";
import { useDeletarContato } from "@/src/queries/contatos/deletarContato";
import { AtualizarContato } from "../../modal/contatos/atualizarContato";
import { useContatos } from "@/src/store/useContatos";

export const colunasVerContatos = [
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
		accessorKey: "email",
		header: "email",
		cell: ({ row }) => {
			return (
				<p className=" font-medium line-clamp-2">{row.getValue("email")}</p>
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
		accessorKey: "telefone",
		header: "telefone",
		cell: ({ row }) => {
			return (
				<p className=" font-medium line-clamp-2">{row.getValue("telefone")}</p>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row, column }) => {
			const contato = row.original;
			const contatos = useContatos(state => state.contatos);

			// console.log(contato);
			const { mutate } = useDeletarContato();
			// const deletarNoticia = useNoticia(state => state.deletarNoticia);

			const [abrirAtualizar, setAbrirAtualizar] = useState(false);
			const [abrirCriar, setAbrirCriar] = useState(false);

			const atualizarContato = () => {
				setAbrirAtualizar(true);
			};

			const criarontato = () => {
				setAbrirCriar(true);
			};
			const deletarconatato = () => {
				const quantConatatos = contatos.find(setor => setor.id === contato?.setor_id);

				if(quantConatatos?.contato?.length > 1){
					return mutate({ id: Number(contato.id) });
				}
				alert("Pelo menos um contato deve ser mantido");

			};
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
							<DropdownMenuItem onClick={() => criarontato()}>Criar</DropdownMenuItem>
							<DropdownMenuItem onClick={() => deletarconatato()}>Deletar</DropdownMenuItem>
							<DropdownMenuItem onClick={() => atualizarContato()}>Atualizar</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					{abrirAtualizar && (<AtualizarContato open={abrirAtualizar} idSetor={contato?.setor_id} idContato={contato?.id} onClose={() => setAbrirAtualizar(false)}/>)}
					{abrirCriar && ( <CriarContato idSetor={contato?.setor_id} open={abrirCriar} onClose={() => setAbrirCriar(false)}/>
					)}
				</>
			);
		},
	},
];