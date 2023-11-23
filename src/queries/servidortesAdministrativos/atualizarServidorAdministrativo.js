import api from "../../services/api.js";
import { useMutation } from "@tanstack/react-query";
import { useServidoresAdministrativos } from "@/src/store/useServidoresAdministrativos.js";


const fetchAtualizarServidorAdministrativo = async ({id, values}) => {
	const {data} = await api.put(`/servidor/administrativo/${id}`, values);
	return data;
};

export const useAtualizarServidorAdministrativo = () => {
	const atualizarServidorAdministrativo = useServidoresAdministrativos(state => state.atualizarServidorAdministrativo);

	const mutation = useMutation({mutationKey: ["servidores-administrativo"], mutationFn: fetchAtualizarServidorAdministrativo,
		onSettled: (data, error, variables) => {
			if (error) {
				alert(error.message);
			} else {
				atualizarServidorAdministrativo(variables.id, data?.result);
				alert("Update realizado com sucesso");
			}
		}    
	});

	return mutation;
};
