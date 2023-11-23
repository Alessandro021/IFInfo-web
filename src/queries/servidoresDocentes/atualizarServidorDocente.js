import api from "../../services/api.js";
import { useMutation } from "@tanstack/react-query";
import { useServidoresDocentes } from "@/src/store/useServidoresDocentes.js";


const fetchAtualizarServidorDocente = async ({id, values}) => {
	const {data} = await api.put(`/servidor/docente/${id}`, values);
	return data;
};

export const useAtualizarServidoresDocentes = () => {
	const atualizarServidorDocente = useServidoresDocentes(state => state.atualizarServidorDocente);

	const mutation = useMutation({mutationKey: ["servidores-docentes"], mutationFn: fetchAtualizarServidorDocente,
		onSettled: (data, error, variables) => {
			if (error) {
				alert(error.message);
			} else {
				atualizarServidorDocente(variables.id, data?.result);
				alert("Update realizado com sucesso");
			}
		}    
	});

	return mutation;
};
