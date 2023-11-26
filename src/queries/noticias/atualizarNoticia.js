import api from "../../services/api.js";
import { useMutation } from "@tanstack/react-query";
import { useNoticia } from "@/src/store/useNoticias.js";
import { toast } from "react-toastify";

const atualizarNoticias = async (id, values) => {
	const {data} = await api.put(`/noticia/${id}`, values);
	return data;
};

export const useAtualizarNoticia = (id, formValues) => {
	const atualizarNoticia = useNoticia(state => state.atualizarNoticia);

	const values = {...formValues};
	for (let key in values) {
		if (values[key] === "") {
			values[key] = null;
		}
	}

	const mutation = useMutation({mutationKey: ["noticias"], mutationFn: () => atualizarNoticias(id, values), 
		onSuccess: (data) => {
			atualizarNoticia(id, data?.result);
			toast.success("Noticia relizada com sucesso");
		},
		onError: (data) => {
			toast.error(data.message);
		}
	});

	return mutation;
};

