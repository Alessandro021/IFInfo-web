import { Button } from "@/components/ui/button";
import { ArrowUpDown, ImageIcon, ImageOffIcon, MoreHorizontal} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { useDeletarNoticia } from "@/src/queries/noticias/deletarNoticia";
import { useState } from "react";
import { VerNoticias } from "../../modal/noticias/verNoticias";
import { AtualizarNoticia } from "../../modal/noticias/atualizarNoticia";

export const colunasNoticias = [
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
		accessorKey: "titulo",
		header: "titulo",
		cell: ({ row }) => {
			return <p className=" font-medium line-clamp-2 max-w-[350px]">{row.getValue("titulo")}</p>;
		},
	},
	{
		accessorKey: "conteudo",
		header: "conteudo",
		cell: ({ row }) => {
			return <p className=" font-medium line-clamp-2 max-w-[400px]">{row.getValue("conteudo")}</p>;
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
		cell: ({ row }) => {
			return <div>{row.getValue("url_foto") ? <ImageIcon /> : <ImageOffIcon />}</div>;
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
			const noticia = row.original;
			const [abrirVerNoticia, setAbrirVerNoticia] = useState(false);
			const [abrirAtualizar, setAbrirAtualizar] = useState(false);
		
			const verNoticia = () => {
				setAbrirVerNoticia(true);
			};

			const atualizarNoticia = () => {
				setAbrirAtualizar(true);
			};
			const {mutate} = useDeletarNoticia(noticia?.id);


			return (
				<>
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
							<DropdownMenuItem onClick={() => mutate(noticia.id)}>Deletar</DropdownMenuItem>
							<DropdownMenuItem onClick={() => atualizarNoticia(noticia.id)}>Atualizar</DropdownMenuItem>
							<DropdownMenuItem onClick={() => verNoticia()}>Ver</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					{abrirVerNoticia && (<VerNoticias open={abrirVerNoticia} id={noticia?.id} onClose={() => setAbrirVerNoticia(false)}/>)}
					{abrirAtualizar && (<AtualizarNoticia open={abrirAtualizar} id={noticia?.id} onClose={() => setAbrirAtualizar(false)}/>)}
				</>
			);
		},
	},
]; 