import api from "../../services/api.js";
import { useMutation } from "@tanstack/react-query";
import { useNoticia } from "@/src/store/useNoticias.js";



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
			alert("Update relizado com sucesso");
		},
		onError: (data) => {
			alert(data.message);
		}
	});

	return mutation;
};

