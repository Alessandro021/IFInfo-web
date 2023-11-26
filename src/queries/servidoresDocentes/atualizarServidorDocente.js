import api from "../../services/api.js";
import { useMutation } from "@tanstack/react-query";
import { useServidoresDocentes } from "@/src/store/useServidoresDocentes.js";
import { toast } from "react-toastify";


const fetchAtualizarServidorDocente = async ({id, values}) => {
	const {data} = await api.put(`/servidor/docente/${id}`, values);
	return data;
};

export const useAtualizarServidoresDocentes = () => {
	const atualizarServidorDocente = useServidoresDocentes(state => state.atualizarServidorDocente);

	const mutation = useMutation({mutationKey: ["servidores-docentes"], mutationFn: fetchAtualizarServidorDocente,
		onSettled: (data, error, variables) => {
			if (error) {
				toast.error(error.message);
			} else {
				atualizarServidorDocente(variables.id, data?.result);
				toast.success("Servidor docente atualizado com sucesso");
			}
		}    
	});

	return mutation;
};
