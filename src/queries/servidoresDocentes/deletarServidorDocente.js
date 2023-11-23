import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useServidoresDocentes } from "@/src/store/useServidoresDocentes";

const fetchDeletarServiudorDocente = async ({id}) => {
	const {data} = await api.delete(`/servidor/docente/${id}`);
	return data;
};

export const useDeletarServidorDocente = () => {
	const deletarServidorDocente = useServidoresDocentes(state => state.deletarServidorDocente);

	const mutation = useMutation({mutationKey: ["servidores-docentes"], mutationFn: fetchDeletarServiudorDocente,  
		onSuccess: (data) => {
			alert("Servidor Docente deletado com sucesso.");
			deletarServidorDocente(data?.result);
		}, onError: (err) => {
			// console.log(err.message);
			alert("Erro ao deletar servidor Docente");
		}});

	return mutation;
};