import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useAdministrador } from "@/src/store/useAdministrador";

const fetchCriarUsuario = async ({values}) => {
	const {data} = await api.post("/admin/usuario/cadastro", values);
	return data;
};

export const useCriarUsuario = () => {
	const adicionarUsuario = useAdministrador(state => state.adicionarUsuario);

	const mutation = useMutation({mutationKey: ["administrador"], mutationFn: fetchCriarUsuario, 
		onSuccess: (data) => {
			alert("Usuario criado com sucesso.");
			adicionarUsuario(data?.result);
		}, onError: (err) => {

			alert("Erro ao criar usuario.");
		}});

	return mutation;
};