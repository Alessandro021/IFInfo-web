import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useNoticia } from "@/src/store/useNoticias";
import { toast } from "react-toastify";

const excluirNoticia = async (id) => {
	const {data} = await api.delete(`/noticia/${id}`);
	return data;
};

export const useDeletarNoticia = (id) => {
	const deletarNoticia = useNoticia(state => state.deletarNoticia);

	const mutation = useMutation({mutationKey: ["noticias"], mutationFn:() => excluirNoticia(id), 
		onSuccess: (data) => {
			toast.success("Notícia deletada com sucesso.");
			deletarNoticia(data?.result);
		}, onError: (err) => {
			// console.log(err.message);
			toast.error("Erro ao deletar noticia");
		}});

	return mutation;
};