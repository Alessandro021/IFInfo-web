import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useServidoresAdministrativos } from "@/src/store/useServidoresAdministrativos";
import { toast } from "react-toastify";

const fetchDeletarServidorAdministrativo = async ({id}) => {
	const {data} = await api.delete(`/servidor/administrativo/${id}`);
	return data;
};

export const useDeletarServidorAdministrativo = () => {
	const deletarServidorAdministrativo = useServidoresAdministrativos(state => state.deletarServidorAdministrativo);

	const mutation = useMutation({mutationKey: ["servidores-administrativos"], mutationFn: fetchDeletarServidorAdministrativo,  
		onSuccess: (data) => {
			toast.success("Servidor administrativo deletado com sucesso.");
			deletarServidorAdministrativo(data?.result);
		}, onError: (data) => {
			if(data.message === "Request failed with status code 401"){
				return toast.error("Usuário não autorizado ou token expirado.");
			}
			toast.error("Erro ao deletar servidores administrativos.");
		}});

	return mutation;
};