import api from "../../services/api.js";
import { useMutation } from "@tanstack/react-query";
import { useNoticia } from "@/src/store/useNoticias.js";
import { toast } from "react-toastify";

const atualizarNoticias = async ({id, values}) => {
	
	const {data} = await api.put(`/noticia/${id}`, values);
	return data;
};

export const useAtualizarNoticia = () => {
	const atualizarNoticia = useNoticia(state => state.atualizarNoticia);

	const mutation = useMutation({mutationKey: ["noticias"], mutationFn: atualizarNoticias, 
		onSuccess: (data, variables) => {
			toast.success("Noticia atualizada com sucesso");
			atualizarNoticia(variables.id, data?.result);
		},
		onError: (data) => {
			if(data.message === "Request failed with status code 401"){
				return toast.error("Usuário não autorizado ou token expirado.");
			}
			toast.error(data.message);
		}
	});

	return mutation;
};

