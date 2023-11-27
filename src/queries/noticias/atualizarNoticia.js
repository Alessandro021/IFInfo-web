import api from "../../services/api.js";
import { useMutation } from "@tanstack/react-query";
import { useNoticia } from "@/src/store/useNoticias.js";
import { toast } from "react-toastify";

const atualizarNoticias = async ({id, values}) => {
	const formValues = {...values};
	for (let key in values) {
		if (values[key] === "") {
			values[key] = null;
		}
	}
	const {data} = await api.put(`/noticia/${id}`, formValues);
	return data;
};

export const useAtualizarNoticia = () => {
	const atualizarNoticia = useNoticia(state => state.atualizarNoticia);

	

	const mutation = useMutation({mutationKey: ["noticias"], mutationFn: atualizarNoticias, 
		onSuccess: (data, variables) => {
			atualizarNoticia(variables.id, data?.result);
			toast.success("Noticia relizada com sucesso");
		},
		onError: (data) => {
			toast.error(data.message);
		}
	});

	return mutation;
};

