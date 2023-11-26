import { useMutation } from "@tanstack/react-query";
import { useUsuario } from "@/src/store/useUsuario.js";
import api from "@/src/services/api";
import { toast } from "react-toastify";


const atualizarUsuario = async ({values}) => {
	const {data} = await api.put("/usuario", values);
	return data;
};

export const useAtualizarUsuario = () => {
	const alterarUsuario = useUsuario(state => state.alterarUsuario);

	const mutation = useMutation({mutationKey: ["usuario"], mutationFn: atualizarUsuario, 
		onSuccess: (data) => {
			alterarUsuario(data?.result);
			toast.success("Perfil atualizado com sucesso");
		},
		onError: (data) => {
			toast.error(data.message);
		}
	});

	return mutation; 
};