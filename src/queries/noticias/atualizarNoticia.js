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
			toast.error(data.message);
		}
	});

	return mutation;
};

