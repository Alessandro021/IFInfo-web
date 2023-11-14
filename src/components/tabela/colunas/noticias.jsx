import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageIcon, ImageOffIcon, MoreHorizontal} from "lucide-react";
import { useNavigate} from "react-router-dom";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNoticia } from "@/src/store/useNoticias";
import { useMutation } from "@tanstack/react-query";
import { useStorage } from "@/src/useHooks/useStorage";
import api from "@/src/services/api";

export const colunasNoticias = [
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
			return <p className=" font-medium line-clamp-2 max-w-[500px]">{row.getValue("conteudo")}</p>;
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
			const deletarNoticia = useNoticia(state => state.deletarNoticia);

			const navigate = useNavigate();
			const verNoticia = (id) => {
				return navigate(`/${id}`);
			};

			const atualizarNoticia = (id) => {
				return navigate(`/atualizar/${id}`);
			};
			const excluirNoticia = async (id) => {
				const {data} = await api.delete(`/noticia/${id}`);
				return data;
			};
			const mutation = useMutation({mutationKey: ["noticias"], mutationFn: excluirNoticia, 
				onSuccess: (data) => {
					deletarNoticia(data?.result);
					alert("Notícia deletada com sucesso.");
				}, onError: (err) => {
					console.log(err.message);
					alert("Erro ao deletar noticia");
				}});

			return (
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
						<DropdownMenuItem onClick={() => mutation.mutate(noticia.id)}>Deletar</DropdownMenuItem>
						<DropdownMenuItem onClick={() => atualizarNoticia(noticia.id)}>Atualizar</DropdownMenuItem>
						<DropdownMenuItem onClick={() => verNoticia(noticia.id)}>Ver</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];