import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useNoticia } from "@/src/store/useNoticias";

const excluirNoticia = async (id) => {
	const {data} = await api.delete(`/noticia/${id}`);
	return data;
};

export const useDeletarNoticia = (id) => {
	const deletarNoticia = useNoticia(state => state.deletarNoticia);

	const mutation = useMutation({mutationKey: ["noticias"], mutationFn:() => excluirNoticia(id), 
		onSuccess: (data) => {
			alert("Notícia deletada com sucesso.");
			deletarNoticia(data?.result);
		}, onError: (err) => {
			// console.log(err.message);
			alert("Erro ao deletar noticia");
		}});

	return mutation;
};