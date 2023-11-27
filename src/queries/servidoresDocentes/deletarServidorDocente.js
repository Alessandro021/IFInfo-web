import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useServidoresDocentes } from "@/src/store/useServidoresDocentes";
import { toast } from "react-toastify";

const fetchDeletarServiudorDocente = async ({id}) => {
	const {data} = await api.delete(`/servidor/docente/${id}`);
	return data;
};

export const useDeletarServidorDocente = () => {
	const deletarServidorDocente = useServidoresDocentes(state => state.deletarServidorDocente);

	const mutation = useMutation({mutationKey: ["servidores-docentes"], mutationFn: fetchDeletarServiudorDocente,  
		onSuccess: (data) => {
			toast.success("Servidor Docente deletado com sucesso.");
			deletarServidorDocente(data?.result);
		}, onError: (data) => {
			if(data.message === "Request failed with status code 401"){
				return toast.error("Usuário não autorizado ou token expirado.");
			}
			toast.error("Erro ao deletar servidor docente.");
		}});

	return mutation;
};