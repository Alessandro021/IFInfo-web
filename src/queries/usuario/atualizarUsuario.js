import { useMutation } from "@tanstack/react-query";
import { useUsuario } from "@/src/store/useUsuario.js";
import api from "@/src/services/api";


const atualizarUsuario = async (value) => {
	const {data} = await api.put("/usuario", value);
	return data;
};

export const useAtualizarUsuario = (value) => {
	const alterarUsuario = useUsuario(state => state.alterarUsuario);

	const mutation = useMutation({mutationKey: ["usuario"], mutationFn: () => atualizarUsuario(value), 
		onSuccess: (data) => {
			alterarUsuario(data?.result);
			alert("Perfil atualizado com sucesso");
		},
		onError: (data) => {
			alert(data.message);
		}
	});

	return mutation;
};