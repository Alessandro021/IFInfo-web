import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useServidoresAdministrativos } from "@/src/store/useServidoresAdministrativos";

const fetchDeletarServidorAdministrativo = async ({id}) => {
	const {data} = await api.delete(`/servidor/administrativo/${id}`);
	return data;
};

export const useDeletarServidorAdministrativo = () => {
	const deletarServidorAdministrativo = useServidoresAdministrativos(state => state.deletarServidorAdministrativo);

	const mutation = useMutation({mutationKey: ["servidores-administrativos"], mutationFn: fetchDeletarServidorAdministrativo,  
		onSuccess: (data) => {
			alert("Servidor administrativo deletado com sucesso.");
			deletarServidorAdministrativo(data?.result);
		}, onError: (err) => {
			// console.log(err.message);
			alert("Erro ao deletar servidor administrativo");
		}});

	return mutation;
};