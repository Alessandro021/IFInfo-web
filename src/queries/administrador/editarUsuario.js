import api from "../../services/api.js";
import { useMutation } from "@tanstack/react-query";
import { useAdministrador } from "@/src/store/useAdministrador.js";
import { toast } from "react-toastify";


const fetchAtualizarUsuario = async ({id, values}) => {
	const {data} = await api.put(`/admin/usuario/${id}`, values);
	return data;
};

export const useEditarUsuario = () => {
	const atualizarUsuario = useAdministrador(state => state.atualizarUsuario);

	const mutation = useMutation({mutationKey: ["administrador"], mutationFn: fetchAtualizarUsuario,
		onSettled: (data, error, variables) => {
			if (error) {

				if(data.message === "Request failed with status code 401"){
					return toast.error("Usuário não autorizado ou token expirado.");
				}
				toast.error(data.message);
			} else {
				atualizarUsuario(variables.id, data?.result);
				toast.success("Update realizado com sucesso");
			}
		}    
	});

	return mutation;
};


