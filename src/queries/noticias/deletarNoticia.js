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
		}, onError: (data) => {
			if(data.message === "Request failed with status code 401"){
				return toast.error("Usuário não autorizado ou token expirado.");
			}
			toast.error("Erro ao deletar noticias.");
		}});

	return mutation;
};