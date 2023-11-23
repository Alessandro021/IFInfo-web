import api from "../../services/api.js";
import { useMutation } from "@tanstack/react-query";
import { useAdministrador } from "@/src/store/useAdministrador.js";


const fetchAtualizarUsuario = async ({id, values}) => {
	const {data} = await api.put(`/admin/usuario/${id}`, values);
	return data;
};

export const useEditarUsuario = () => {
	const atualizarUsuario = useAdministrador(state => state.atualizarUsuario);

	const mutation = useMutation({mutationKey: ["administrador"], mutationFn: fetchAtualizarUsuario,
		onSettled: (data, error, variables) => {
			if (error) {
				alert(error.message);
			} else {
				atualizarUsuario(variables.id, data?.result);
				alert("Update realizado com sucesso");
			}
		}    
	});

	return mutation;
};