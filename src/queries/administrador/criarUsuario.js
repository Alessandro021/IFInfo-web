import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useAdministrador } from "@/src/store/useAdministrador";
import { toast } from "react-toastify";

const fetchCriarUsuario = async ({values}) => {
	const {data} = await api.post("/admin/usuario/cadastro", values);
	return data;
};

export const useCriarUsuario = () => {
	const adicionarUsuario = useAdministrador(state => state.adicionarUsuario);

	const mutation = useMutation({mutationKey: ["administrador"], mutationFn: fetchCriarUsuario, 
		onSuccess: (data) => {
			toast.success("Usuario criado com sucesso.");
			adicionarUsuario(data?.result);
		}, onError: (data) => {
			if(data.message === "Request failed with status code 401"){
				return toast.error("Usuário não autorizado ou token expirado.");
			}
			toast.error("Erro ao criar usuário.");
		}});

	return mutation;
};